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
    querySelector: () => intentionalScroller,
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

test("horizontal overflow detects positioned content that escapes an overflow ancestor", () => {
  const body = fakeElement({ left: 0, right: 390, tagName: "BODY" })
  const scroller = fakeElement({ left: 20, right: 370, parentElement: body, className: "lifecycle" })
  const escapingChild = fakeElement({ left: 380, right: 500, parentElement: scroller, id: "escaping" })

  const snapshot = withBrowserGlobals({
    clientWidth: 390,
    scrollWidth: 390,
    elements: [scroller, escapingChild],
    body,
    overflowByElement: new Map([[scroller, "hidden"]]),
    positionByElement: new Map([[escapingChild, "absolute"]]),
    intentionalScroller: scroller,
  }, horizontalOverflowSnapshot)

  assert.equal(snapshot.rootOverflow, false)
  assert.equal(snapshot.offenderCount, 1)
  assert.equal(snapshot.offenders[0].id, "escaping")
})
