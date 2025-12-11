import {
  easeInBack,
  easeInBounce,
  easeInCubic,
  easeInElastic,
  easeInExpo,
  easeInOutBack,
  easeInOutBounce,
  easeInOutElastic,
  easeInOutExpo,
  easeInOutQuad,
  easeInOutQuart,
  easeInOutQuint,
  easeInOutSine,
  easeInQuad,
  easeInQuart,
  easeInQuint,
  easeInSine,
  easeOutBounce,
  easeOutQuad,
  easeOutQuart,
  easeOutQuint,
  easeOutSine,
  linear,
  Loop,
  Consecutive,
  Synchronised,
} from '../src/index'
import {
  Easying,
  easeInCirc,
  easeInOutCirc,
  easeInOutCubic,
  easeOutBack,
  easeOutCirc,
  easeOutCubic,
  easeOutElastic,
  easeOutExpo,
} from '../src/index'
import './display-animations'
import './style.css'

const animator = new Easying()

type Ease = (t: number, b: number, c: number, d: number) => number

function createCircleAnimation(
  item: string,
  ease: Ease,
  positions = { start: 0, end: 200 }
) {
  const circOutDiagram = document.getElementsByClassName(item)[0] as HTMLElement
  const easingDemo = animator.init(circOutDiagram, {
    parameters: {
      translateY: positions,
    },
    ease,
    seconds: 1,
  })
  const linearTime = animator.init(circOutDiagram, {
    parameters: {
      translateX: {
        start: 0,
        end: 200,
      },
    },
    ease: linear,
    seconds: 1,
  })

  const movement = Synchronised(easingDemo, linearTime)
  const withDelay = Consecutive(movement, () => animator.delay(2))

  return Loop(withDelay)
}

function createLineAnimation(
  canvas: string,
  ease: Ease,
  positions = { start: 0, end: 200 }
) {
  let timePassed = 0
  let lineLastVals = { x: 0, y: 0 }

  const easingDemoLine = animator.init(
    (val) => {
      const parent = document.getElementById(canvas)
      const linePart = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      )

      if (!Number.isNaN(val.translateY)) {
        linePart.setAttribute('x1', `${lineLastVals.x}`)
        linePart.setAttribute('y1', `${lineLastVals.y}`)

        linePart.setAttribute('x2', `${timePassed}`)
        linePart.setAttribute('y2', `${val.translateY}`)
        linePart.setAttribute("stroke", "white")
        linePart.setAttribute("stroke-width", "1")

        lineLastVals.x = timePassed
        lineLastVals.y = val.translateY
      }
      parent?.appendChild(linePart)
    },
    {
      parameters: {
        translateY: positions,
      },
      ease,
      seconds: 1,
    }
  )
  const linearTimeLine = animator.init(
    (val) => {
      timePassed = val.translateX
    },
    {
      parameters: {
        translateX: {
          start: 0,
          end: 200,
        },
      },
      ease: linear,
      seconds: 1,
    }
  )

  const line = Synchronised(easingDemoLine, linearTimeLine)

  const withDelayLine = Consecutive(
    line,
    () => animator.delay(2),
    () => {
      const svg = document.getElementById(canvas)
      if (svg) svg.innerHTML = ''
      lineLastVals.x = 0
      lineLastVals.y = 0
      timePassed = 0
    }
  )
  return Loop(withDelayLine)
}

function easingDemos() {
  const linearAnim = createCircleAnimation('ease-linear', linear)
  const linearLineAnim = createLineAnimation('canvas-linear', linear)

  linearAnim()
  linearLineAnim()

  const circInOut = createCircleAnimation('ease-circ-in-out', easeInOutCirc)
  const circInOutLine = createLineAnimation('canvas-circ-in-out', easeInOutCirc)

  circInOut()
  circInOutLine()

  const circIn = createCircleAnimation('ease-circ-in', easeInCirc)
  const circInLine = createLineAnimation('canvas-circ-in', easeInCirc)

  circIn()
  circInLine()

  const circOut = createCircleAnimation('ease-circ-out', easeOutCirc)
  const circOutLine = createLineAnimation('canvas-circ-out', easeOutCirc)

  circOut()
  circOutLine()

  const cubicOut = createCircleAnimation('ease-cubic-out', easeOutCubic)
  const cubicOutLine = createLineAnimation('canvas-cubic-out', easeOutCubic)

  cubicOut()
  cubicOutLine()

  const cubicIn = createCircleAnimation('ease-cubic-in', easeInCubic)
  const cubicInLine = createLineAnimation('canvas-cubic-in', easeInCubic)

  cubicIn()
  cubicInLine()

  const cubicInOut = createCircleAnimation('ease-cubic-in-out', easeInOutCubic)
  const cubicInOutLine = createLineAnimation(
    'canvas-cubic-in-out',
    easeInOutCubic
  )

  cubicInOut()
  cubicInOutLine()

  const expoOut = createCircleAnimation('ease-expo-out', easeOutExpo)
  const expoOutLine = createLineAnimation('canvas-expo-out', easeOutExpo)

  expoOut()
  expoOutLine()

  const expoIn = createCircleAnimation('ease-expo-in', easeInExpo)
  const expoInLine = createLineAnimation('canvas-expo-in', easeInExpo)

  expoIn()
  expoInLine()

  const expoInOut = createCircleAnimation('ease-expo-in-out', easeInOutExpo)
  const expoInOutLine = createLineAnimation('canvas-expo-in-out', easeInOutExpo)

  expoInOut()
  expoInOutLine()

  const quadOut = createCircleAnimation('ease-quad-out', easeOutQuad)
  const quadOutLine = createLineAnimation('canvas-quad-out', easeOutQuad)

  quadOut()
  quadOutLine()

  const quadIn = createCircleAnimation('ease-quad-in', easeInQuad)
  const quadInLine = createLineAnimation('canvas-quad-in', easeInQuad)

  quadIn()
  quadInLine()

  const quadInOut = createCircleAnimation('ease-quad-in-out', easeInOutQuad)
  const quadInOutLine = createLineAnimation('canvas-quad-in-out', easeInOutQuad)

  quadInOut()
  quadInOutLine()

  const quartOut = createCircleAnimation('ease-quart-out', easeOutQuart)
  const quartOutLine = createLineAnimation('canvas-quart-out', easeOutQuart)

  quartOut()
  quartOutLine()

  const quartIn = createCircleAnimation('ease-quart-in', easeInQuart)
  const quartInLine = createLineAnimation('canvas-quart-in', easeInQuart)

  quartIn()
  quartInLine()

  const quartInOut = createCircleAnimation('ease-quart-in-out', easeInOutQuart)
  const quartInOutLine = createLineAnimation(
    'canvas-quart-in-out',
    easeInOutQuart
  )

  quartInOut()
  quartInOutLine()

  const sineOut = createCircleAnimation('ease-sine-out', easeOutSine)
  const sineOutLine = createLineAnimation('canvas-sine-out', easeOutSine)

  sineOut()
  sineOutLine()

  const sineIn = createCircleAnimation('ease-sine-in', easeInSine)
  const sineInLine = createLineAnimation('canvas-sine-in', easeInSine)

  sineIn()
  sineInLine()

  const sineInOut = createCircleAnimation('ease-sine-in-out', easeInOutSine)
  const sineInOutLine = createLineAnimation('canvas-sine-in-out', easeInOutSine)

  sineInOut()
  sineInOutLine()

  const quintOut = createCircleAnimation('ease-quint-out', easeOutQuint)
  const quintOutLine = createLineAnimation('canvas-quint-out', easeOutQuint)

  quintOut()
  quintOutLine()

  const quintIn = createCircleAnimation('ease-quint-in', easeInQuint)
  const quintInLine = createLineAnimation('canvas-quint-in', easeInQuint)

  quintIn()
  quintInLine()

  const quintInOut = createCircleAnimation('ease-quint-in-out', easeInOutQuint)
  const quintInOutLine = createLineAnimation(
    'canvas-quint-in-out',
    easeInOutQuint
  )

  quintInOut()
  quintInOutLine()

  const bounceOut = createCircleAnimation('ease-bounce-out', easeOutBounce)
  const bounceOutLine = createLineAnimation('canvas-bounce-out', easeOutBounce)

  bounceOut()
  bounceOutLine()

  const bounceIn = createCircleAnimation('ease-bounce-in', easeInBounce)
  const bounceInLine = createLineAnimation('canvas-bounce-in', easeInBounce)

  bounceIn()
  bounceInLine()

  const bounceInOut = createCircleAnimation(
    'ease-bounce-in-out',
    easeInOutBounce
  )
  const bounceInOutLine = createLineAnimation(
    'canvas-bounce-in-out',
    easeInOutBounce
  )

  bounceInOut()
  bounceInOutLine()

  const elasticOut = createCircleAnimation('ease-elastic-out', easeOutElastic, {
    start: 0,
    end: 140,
  })
  const elasticOutLine = createLineAnimation(
    'canvas-elastic-out',
    easeOutElastic,
    {
      start: 0,
      end: 140,
    }
  )

  elasticOut()
  elasticOutLine()

  const elasticIn = createCircleAnimation('ease-elastic-in', easeInElastic, {
    start: 60,
    end: 200,
  })
  const elasticInLine = createLineAnimation(
    'canvas-elastic-in',
    easeInElastic,
    {
      start: 60,
      end: 200,
    }
  )

  elasticIn()
  elasticInLine()

  const elasticInOut = createCircleAnimation(
    'ease-elastic-in-out',
    easeInOutElastic,
    { start: 30, end: 170 }
  )
  const elasticInOutLine = createLineAnimation(
    'canvas-elastic-in-out',
    easeInOutElastic,
    { start: 30, end: 170 }
  )

  elasticInOut()
  elasticInOutLine()

  const backOut = createCircleAnimation('ease-back-out', easeOutBack, {
    start: 0,
    end: 180,
  })
  const backOutLine = createLineAnimation('canvas-back-out', easeOutBack, {
    start: 0,
    end: 180,
  })

  backOut()
  backOutLine()

  const backIn = createCircleAnimation('ease-back-in', easeInBack, {
    start: 20,
    end: 200,
  })
  const backInLine = createLineAnimation('canvas-back-in', easeInBack, {
    start: 20,
    end: 200,
  })

  backIn()
  backInLine()

  const backInOut = createCircleAnimation('ease-back-in-out', easeInOutBack, {
    start: 20,
    end: 180,
  })
  const backInOutLine = createLineAnimation(
    'canvas-back-in-out',
    easeInOutBack,
    {
      start: 20,
      end: 180,
    }
  )

  backInOut()
  backInOutLine()
}

easingDemos()
