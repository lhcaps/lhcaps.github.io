import assert from "node:assert/strict"
import test from "node:test"
import { horizontalOverflowSnapshot } from "../production-smoke.mjs"

function fakeElement({ left, right, parentElement = null, tagName = "DIV", id = "", className = "" }) {
  return {
    parentElement,
    tagName,
    id,
    className,
    getBoundingClientRect: () => ({ left, right, width: right - left }),
    contains(candidate) {
      let current = candidate
      while (current) {
        if (current === this) return true
        current = current.parentElement
      }
      return false
    },
  }
}

function withBrowserGlobals({ clientWidth, scrollWidth, elements, body, overflowByElement, positionByElement = new Map(), intentionalScroller = null }, procedure) {
  const previous = {
    document: globalThis.document,
    window: globalThis.window,
    getComputedStyle: globalThis.getComputedStyle,
  }
  globalThis.document = {
    body,
    documentElement: { clientWidth, scrollWidth },
    querySelector: (selector) => {
      assert.equal(selector, 'ol.lifecycle[aria-label="AI-assisted engineering lifecycle"]')
      return intentionalScroller
    },
    querySelectorAll: () => elements,
  }
  globalThis.window = { innerWidth: clientWidth }
  globalThis.getComputedStyle = (element) => ({
    overflowX: overflowByElement.get(element) ?? "visible",
    position: positionByElement.get(element) ?? "static",
  })
  try {
    return procedure()
  } finally {
    globalThis.document = previous.document
    globalThis.window = previous.window
    globalThis.getComputedStyle = previous.getComputedStyle
  }
}

test("horizontal overflow ignores children clipped by an intentional scroller", () => {
  const body = fakeElement({ left: 0, right: 390, tagName: "BODY" })
  const scroller = fakeElement({ left: 20, right: 370, parentElement: body, className: "lifecycle" })
  const clippedChild = fakeElement({ left: 380, right: 500, parentElement: scroller, tagName: "LI" })
  const visibleChild = fakeElement({ left: 20, right: 100, parentElement: body })

  const snapshot = withBrowserGlobals({
    clientWidth: 390,
    scrollWidth: 390,
    elements: [scroller, clippedChild, visibleChild],
    body,
    overflowByElement: new Map([[scroller, "auto"]]),
    intentionalScroller: scroller,
  }, horizontalOverflowSnapshot)

  assert.equal(snapshot.rootOverflow, false)
  assert.equal(snapshot.offenderCount, 0)
})

test("horizontal overflow still detects unclipped and root-level overflow", () => {
  const body = fakeElement({ left: 0, right: 390, tagName: "BODY" })
  const overflowing = fakeElement({ left: 380, right: 500, parentElement: body, id: "overflowing" })

  const snapshot = withBrowserGlobals({
    clientWidth: 390,
    scrollWidth: 500,
    elements: [overflowing],
    body,
    overflowByElement: new Map(),
  }, horizontalOverflowSnapshot)

  assert.equal(snapshot.rootOverflow, true)
  assert.equal(snapshot.offenderCount, 1)
  assert.equal(snapshot.offenders[0].id, "overflowing")
})

test("horizontal overflow detects positioned content and descendants that escape an overflow ancestor", () => {
  const body = fakeElement({ left: 0, right: 390, tagName: "BODY" })
  const scroller = fakeElement({ left: 20, right: 370, parentElement: body, className: "lifecycle" })
  for (const position of ["absolute", "fixed"]) {
    const escapingChild = fakeElement({ left: 380, right: 500, parentElement: scroller, id: `escaping-${position}` })
    const snapshot = withBrowserGlobals({
      clientWidth: 390,
      scrollWidth: 390,
      elements: [scroller, escapingChild],
      body,
      overflowByElement: new Map([[scroller, "auto"]]),
      positionByElement: new Map([[escapingChild, position]]),
      intentionalScroller: scroller,
    }, horizontalOverflowSnapshot)

    assert.equal(snapshot.rootOverflow, false)
    assert.equal(snapshot.offenderCount, 1)
    assert.equal(snapshot.offenders[0].id, `escaping-${position}`)
  }

  const positionedWrapper = fakeElement({ left: 380, right: 500, parentElement: scroller, id: "wrapper" })
  const nestedChild = fakeElement({ left: 390, right: 480, parentElement: positionedWrapper, id: "nested" })
  const nestedSnapshot = withBrowserGlobals({
    clientWidth: 390,
    scrollWidth: 390,
    elements: [scroller, positionedWrapper, nestedChild],
    body,
    overflowByElement: new Map([[scroller, "auto"]]),
    positionByElement: new Map([[positionedWrapper, "absolute"]]),
    intentionalScroller: scroller,
  }, horizontalOverflowSnapshot)
  assert.deepEqual(nestedSnapshot.offenders.map((offender) => offender.id), ["wrapper", "nested"])
})
