import { Container, SectionHeader } from '@/components/layout'
import { stackLayers, type StackLayer } from '@/data/stack'

function StackLayerCard({ layer }: { layer: StackLayer }) {
  return (
    <div
      className='rounded-2xl p-5 md:p-6 relative overflow-hidden'
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      <div
        className='absolute left-0 top-3 bottom-3 w-0.5 rounded-full'
        style={{
          background: 'linear-gradient(to bottom, ' + layer.accent + ', transparent)',
          boxShadow: '0 0 8px ' + layer.accent + '40',
        }}
      />

      <div className='flex items-center justify-between mb-4 pl-3'>
        <div>
          <h3 className='text-base md:text-lg font-bold font-heading' style={{ color: layer.accent }}>
            {layer.label}
          </h3>
          <p className='text-[10px] md:text-xs tracking-[0.1em] uppercase' style={{ color: layer.accent + '70' }}>
            {layer.tag}
          </p>
        </div>

        <div
          className='w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center'
          style={{
            background: layer.accent + '10',
            border: '1px solid ' + layer.accent + '25',
          }}
        >
          <div
            className='w-1.5 h-1.5 rounded-full'
            style={{
              background: layer.accent,
              boxShadow: '0 0 6px ' + layer.accent,
            }}
          />
        </div>
      </div>

      <div className='flex flex-wrap gap-2 pl-3'>
        {layer.items.map((item: string) => (
          <span
            key={item}
            className='inline-flex items-center px-2.5 py-1 rounded-md text-[10px] md:text-xs font-mono font-medium'
            style={{
              background: layer.accent + '08',
              border: '1px solid ' + layer.accent + '18',
              color: layer.accent + '90',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function StackSection() {
  return (
    <section
      id='stack'
      className='relative py-24 md:py-32 lg:py-44 overflow-hidden'
    >
      <div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black select-none pointer-events-none leading-none'
        style={{
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          WebkitTextStroke: '1px rgba(139, 232, 249, 0.03)',
          color: 'transparent',
        }}
      >
        STACK
      </div>

      <Container>
        <SectionHeader number='02' label='System Stack' />

        <div className='mb-10 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0'>
          <div className='flex items-center gap-3 min-w-max'>
            {stackLayers.map((layer: StackLayer, i: number) => (
              <div key={layer.label} className='flex items-center'>
                <div
                  className='flex items-center gap-2 px-4 py-2 rounded-xl'
                  style={{
                    background: layer.accent + '08',
                    border: '1px solid ' + layer.accent + '20',
                  }}
                >
                  <div
                    className='w-1.5 h-1.5 rounded-full'
                    style={{
                      background: layer.accent,
                      boxShadow: '0 0 4px ' + layer.accent,
                    }}
                  />
                  <span className='text-xs font-semibold font-mono whitespace-nowrap' style={{ color: layer.accent }}>
                    {layer.label}
                  </span>
                </div>
                {i < stackLayers.length - 1 && (
                  <svg
                    className='w-5 h-4 mx-1 flex-shrink-0'
                    viewBox='0 0 20 16'
                    fill='none'
                    style={{ color: 'rgba(139,149,167,0.2)' }}
                  >
                    <path
                      d='M0 8h16M12 4l4 4-4 4'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
          {stackLayers.map((layer: StackLayer) => (
            <StackLayerCard key={layer.label} layer={layer} />
          ))}
        </div>
      </Container>
    </section>
  )
}
