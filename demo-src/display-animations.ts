import { Loop, Consecutive, Reset, Staggered, Synchronised } from '../src'
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
} from '../src'

const balls = document.getElementsByClassName('ball')
const elasticPath = document.getElementById('elastic-path')

const easying = new Easying()

if (balls.length) {
  const ball = balls[0]

  const ball1Drop = easying.init(ball, {
    parameters: {
      translateY: {
        start: 0,
        end: 150,
      },
    },
    ease: easeInCirc,
    seconds: 0.5,
  })
  const ball1Bounce = easying.init(ball, {
    parameters: {
      translateY: {
        start: 150,
        end: 0,
      },
    },
    ease: easeOutCirc,
    seconds: 0.5,
  })

  const animation = Consecutive(ball1Drop, ball1Bounce)
  const loop = Loop(animation)

  loop()
}

const squares = document.getElementsByClassName('geometry-one')

if (squares.length) {
  let animations: Function[] = []

  for (let i = 0; i < squares.length; i++) {
    const isLower = i > 1
    const xMultiplier = i % 2 === 0 ? -1 : 1
    animations.push(
      Consecutive(
        easying.init(squares[i], {
          parameters: {
            rotate: {
              start: 0,
              end: 45,
            },
            translateX: {
              start: 0,
              end: xMultiplier * 20,
            },
            translateY: {
              start: 0,
              end: isLower ? 20 : -20,
            },
          },
          ease: easeInOutCirc,
          seconds: 0.75,
        }),
        easying.init(squares[i], {
          parameters: {
            translateX: {
              start: xMultiplier * 20,
              end: xMultiplier * 40,
            },
            translateY: {
              start: isLower ? 20 : -20,
              end: isLower ? 40 : -40,
            },
          },
          ease: easeInOutCirc,
          seconds: 1,
        }),
        easying.init(squares[i], {
          parameters: {
            rotate: {
              start: 45,
              end: 180,
            },
            translateX: {
              start: xMultiplier * 40,
              end: xMultiplier * 100,
            },
            translateY: {
              start: isLower ? 40 : -40,
              end: isLower ? 100 : -100,
            },
          },
          ease: easeInOutCirc,
          seconds: 2,
        }),
        easying.init(squares[i], {
          parameters: {
            rotate: {
              start: 180,
              end: 360,
            },
            translateX: {
              start: xMultiplier * 100,
              end: xMultiplier * 10,
            },
            translateY: {
              start: isLower ? 100 : -100,
              end: isLower ? 10 : -10,
            },
          },
          ease: easeOutExpo,
          seconds: 1.25,
        }),
        easying.init(squares[i], {
          parameters: {
            translateX: {
              start: xMultiplier * 10,
              end: 0,
            },
            translateY: {
              start: isLower ? 10 : -10,
              end: 0,
            },
          },
          ease: easeOutExpo,
          seconds: 1.25,
        })
      )
    )
  }

  const anim = Synchronised(...animations)
  const loop = Loop(anim)

   loop()   
}

const ball3 = balls[1]
const background = document.getElementsByClassName('back-ease-bg')
const bg = background[0]

if (ball3 && bg) {
  const backOut = easying.init(ball3, {
    parameters: {
      translateX: {
        start: 0,
        end: 150,
      },
    },
    ease: easeOutExpo,
    seconds: 1,
  })
  const backOutBg = easying.init(bg, {
    parameters: {
      translateX: {
        start: 20,
        end: -20,
      },
    },
    ease: easeOutBack,
    seconds: 1,
  })
  const backOut2 = easying.init(ball3, {
    parameters: {
      translateX: {
        start: 150,
        end: 0,
      },
    },
    ease: easeOutExpo,
    seconds: 1,
  })
  const backOutBg2 = easying.init(bg, {
    parameters: {
      translateX: {
        start: -20,
        end: 20,
      },
    },
    ease: easeOutBack,
    seconds: 1,
  })

  const element1 = Consecutive(backOut, backOut2)
  const element2 = Consecutive(backOutBg, backOutBg2)
  const animation = Synchronised(element1, element2)
  const loop = Loop(animation)

   loop()
}

const head = document.getElementById('anim-characters')
const text = head?.innerText
const characters = text?.split('')

if (characters?.length && head) {
  let spans = characters.map(() => document.createElement('span'))
  spans = spans?.map((span, i) => {
    span.classList = 'header-char'
    span.innerText = characters[i]
    return span
  })

  head.innerText = ''

  spans.forEach((span) => {
    head?.appendChild(span)
  })

  const titleSections = easying.initMany(spans, {
    parameters: {
      translateY: {
        start: -30,
        end: 0,
      },
      opacity: {
        start: 0,
        end: 1,
      },
    },
    ease: easeOutBack,
    seconds: 0.5,
  })

  const staggered = Staggered(...titleSections)
   easying.delay(0.5).then(() => staggered(0.1))
}

if (elasticPath) {
  const runPull = easying.init(
    (val) => {
      const path = `M100 10 C 100 10, ${val['custom-pullback']} 100, 100 190`
      elasticPath.setAttribute('d', path)
    },
    {
      parameters: {
        'custom-pullback': {
          start: 100,
          end: -50,
        },
      },
      ease: easeOutBack,
      seconds: 1.25,
    }
  )
  const fire = easying.init(
    (val) => {
      const path = `M100 10 C 100 10, ${val['custom-pullback']} 100, 100 190`
      elasticPath.setAttribute('d', path)
    },
    {
      parameters: {
        'custom-pullback': {
          start: -50,
          end: 100,
        },
      },
      ease: easeOutElastic,
      seconds: 0.6,
    }
  )

  const animation = Consecutive(runPull, fire, () => easying.delay(1.5))
  const loop = Loop(animation)

   loop()
}

const stagger = [...document.getElementsByClassName('staggered-ball')]

const staggeredBalls = easying.initMany(stagger, {
  parameters: {
    translateY: {
      start: 0,
      end: 180,
    },
  },
  ease: easeInOutCubic,
  seconds: 1,
})

const staggeredBallsBounce = easying.initMany(stagger, {
  parameters: {
    translateY: {
      start: 180,
      end: 0,
    },
  },
  ease: easeInOutCubic,
  seconds: 0.85,
})

const animations = []
for (let i = 0; i < staggeredBalls.length; i++) {
  const animation = Loop(
    Consecutive(staggeredBalls[i], staggeredBallsBounce[i])
  )
  animations.push(animation)
}

const staggeredLoop = Staggered(...animations)
staggeredLoop(0.25)

const bgRipple = document.getElementsByClassName('bg-ripple')[0]
const ripple = document.getElementsByClassName('ripple')[0]

const bgAnim = easying.init(bgRipple, {
  parameters: {
    scale: {
      start: 1,
      end: 1.5,
    },
  },
  ease: easeOutCubic,
  seconds: 1,
})

const bgFade = easying.init(bgRipple, {
  parameters: {
    opacity: {
      start: 1,
      end: 0,
    },
  },
  ease: easeOutCubic,
  seconds: 0.5,
  delay: 0.5,
})

const rippleAnimOne = easying.init(ripple, {
  parameters: {
    scale: {
      start: 1,
      end: 2,
    },
    opacity: {
      start: 1,
      end: 0,
    },
  },
  ease: easeOutCubic,
  seconds: 0.8,
  delay: 0.25,
})

const bgAnimation = Synchronised(bgAnim, bgFade)
const rippleAnim = Synchronised(bgAnimation, rippleAnimOne)
const anim = Consecutive(rippleAnim, () => {
  Reset(ripple)
  Reset(bgRipple)
})
const loop = Loop(anim)
 loop()
