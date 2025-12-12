import type { Equations } from './equations'

type Parameter =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'margin-top'
  | 'margin-right'
  | 'margin-bottom'
  | 'margin-left'
  | 'width'
  | 'height'
  | 'translateX'
  | 'translateY'
  | 'rotate'
  | 'scale'
  | 'opacity'
  | `custom-${string | number}`

type Parameters = {
  [key in Parameter]?: {
    start: number
    end: number
  }
}

type CurrentPositions = {
  [key in Parameter]?: number
}

type RestingPositions = {
  [key in Parameter]?: number
}

type CallbackValue = {
  [key in Parameter]: number
}

type Animation = {
  ease: Equations
  seconds: number
  parameters: Parameters
  delay?: number
  destroyOnComplete?: boolean
}

type Tuple<T> = [HTMLElement | Element | string | Function, T]

type UUID = `${string}-${string}-${string}-${string}-${string}`

export class Easying {
  private FPS: number
  private curFrames: Record<string, number> = {}
  private animations: Record<string, Animation> = {}
  private receivers: Record<
    string,
    Element | ((value: CallbackValue) => unknown)
  > = {}
  private currentPositions: Tuple<CurrentPositions>[] = []
  private elementRestingPositions: Tuple<RestingPositions>[] = []
  private paused = false

  constructor() {
    this.FPS = 60 // default FPS
    this.calcFps()

    document.addEventListener('visibilitychange', () => {
      this.paused = document.visibilityState !== 'visible'
    })
  }

  private async calcFps() {
    const SEC = 1000

    const then = performance.now()
    const now = await this.waitForFrame()
    const roughFps = SEC / (then - now)

    if (roughFps < 30) {
      this.FPS = 24
    } else if (roughFps < 60) {
      this.FPS = 30
    } else {
      this.FPS = 60
    }
  }

  private async waitForTimedFrame(calcTimeMs: number) {
    const SEC = 1000
    const frameMs = SEC / this.FPS
    const remainingMs = frameMs - calcTimeMs
    const remainingSecs = remainingMs / SEC
    if (remainingSecs > 0) {
      await this.waitForTime(remainingSecs)
    }
  }

  private async stutterDetection(ms: number) {
    const SEC = 1000
    const fpsFrameTime = SEC / this.FPS
    
    if (ms > fpsFrameTime) {
      if (this.FPS === 30) {
        this.FPS = 24
      } else {
        this.FPS-=10
      }
    }
  }

  private async waitForFrame(): Promise<number> {
    return new Promise((resolve) => requestAnimationFrame(resolve))
  }

  private async waitForTime(seconds: number) {
    await new Promise((res) => setTimeout(res, seconds * 1000))
  }

  public async delay(seconds: number) {
    await this.waitForTime(seconds)
  }

  /**
   * @param element HTMLElement | Function
   * @param animation Object ease: easingFunction; seconds: number; delay?: number; parameters: Parameters; destroyOnComplete?: boolean
   * @param animation.parameters Object [targetCSS]: {start: number, end: number}
   */
  public init(
    element: Element | ((val: CallbackValue) => unknown),
    animation: Animation,
    userKey?: string
  ) {
    const isCallback = typeof element === 'function'

    let key
    if (!userKey) {
      key = window.crypto.randomUUID()
    } else {
      key = userKey
    }

    // Only add if new element
    if (this.currentPositions.every(([el]) => el !== element)) {
      this.currentPositions.push([isCallback ? key : element, {}])
    }

    // add keys regardless
    this.curFrames[key] = 0
    this.animations[key] = animation
    this.receivers[key] = element

    return this.animate.bind(this, key as UUID)
  }

  public initMany(elements: Element[], animation: Animation) {
    let animators = []

    for (let i = 0; i < elements.length; i++) {
      const key = window.crypto.randomUUID()

      // Only add if new element
      if (this.currentPositions.every(([el]) => el !== elements[i])) {
        this.currentPositions.push([elements[i], {}])
      }

      // add keys regardless
      this.curFrames[key] = 0
      this.animations[key] = animation
      this.receivers[key] = elements[i]

      // This is clearly losing scope
      animators.push(this.animate.bind(this, key))
    }
    return animators
  }

  private async generateFrames(element: Element | Function, key: UUID) {
    const animation = this.animations[key]
    const frames = animation.seconds * this.FPS
    
    await this.waitForTime(animation.delay ?? 0)

    while (this.curFrames[key] <= frames) {
      if (this.paused) {
        await this.waitForFrame()
      } else {
        const then = performance.now()
        this.calcFrame(element, key)
        const now = performance.now()
        this.stutterDetection(now - then)
        await this.waitForTimedFrame(now - then)
      }
    }
  }

  private calcFrame(element: Element | Function, key: UUID) {
    const animation = this.animations[key]
    const frames = animation.seconds * this.FPS

    const ease = animation.ease

    const entries = Object.entries(animation.parameters)

    entries.forEach(([param, value]) => {
      if (!value) return
      const { start } = value
      const { end } = value
      const change = end - start
      const newPosition = ease(this.curFrames[key], start, change, frames)
      const parameter = param as Parameter
      let position
      if (typeof element === 'function') {
        position = this.getTuple(key, this.currentPositions)
      } else {
        position = this.getTuple(element, this.currentPositions)
      }
      if (position) position[1] = { ...position[1], [parameter]: newPosition }
    })
    this.drawFrame(element, key)

    this.curFrames[key]++
  }

  private drawFrame(element: Element | Function, key: UUID) {
    let position

    if (typeof element === 'function') {
      position = this.getTuple(key, this.currentPositions)
    } else {
      position = this.getTuple(element, this.currentPositions)
    }

    if (typeof element === 'function') {
      if (position) element(position[1])
      return
    }

    if (!position) return

    let entries = []
    entries = Object.entries(position[1])
    type Value = { p: Parameter; value: number }

    const nonTransformItems: Value[] = []
    let transformItems = entries
      .map(([p, value]) => {
        if (!value) return
        const parameter = p as Parameter
        if (
          parameter === 'translateX' ||
          parameter === 'translateY' ||
          parameter === 'rotate' ||
          parameter === 'scale'
        ) {
          return { p: parameter, value }
        }
        nonTransformItems.push({ p: parameter, value })
        return false
      })
      .filter(Boolean) as Value[]

    // transform position first
    const translations = transformItems.filter(
      (item) => item.p === 'translateX' || item.p === 'translateY'
    )
    const rest = transformItems.filter(
      (item) => item.p !== 'translateX' && item.p !== 'translateY'
    )

    transformItems = [...translations, ...rest]

    transformItems.forEach(({ p, value }, idx) => {
      const unit =
        p === 'translateX' || p === 'translateY'
          ? 'px'
          : p === 'rotate'
          ? 'deg'
          : p === 'scale'
          ? ''
          : 'default'

      const v = unit === 'px' ? Math.round(value) : value

      if (idx === 0) {
        ;(element as HTMLElement).style.transform = `${p}(${v}${unit})`
      } else {
        ;(element as HTMLElement).style.transform += ` ${p}(${v}${unit})`
      }
    })
    nonTransformItems.forEach(({ p, value }) => {
      if (p === 'opacity') {
        ;(element as HTMLElement).style[p] = `${value}`
      } else {
        // @ts-ignore
        ;(element as HTMLElement).style[p] = `${value}px`
      }
    })
  }

  private async animate(key: UUID): Promise<this> {
    const element = this.receivers[key]

    let restingPos: Tuple<RestingPositions> | null
    let currentPos: Tuple<CurrentPositions> | null
    if (typeof element === 'function') {
      restingPos = this.getTuple(key, this.elementRestingPositions)
      currentPos = this.getTuple(key, this.currentPositions)
    } else {
      restingPos = this.getTuple(element, this.elementRestingPositions)
      currentPos = this.getTuple(element, this.currentPositions)
    }

    if (currentPos && restingPos) {
      currentPos[1] = { ...currentPos[1], ...restingPos[1] }
    }

    await this.generateFrames(element, key)

    if (typeof element === 'function') {
      this.updateRestingPositions(key)
    } else {
      this.updateRestingPositions(element)
    }
    this.curFrames[key] = 0

    if (this.animations[key].destroyOnComplete) {
      this.destroy(key, element)
    }

    return this
  }

  private updateRestingPositions(element: Element | UUID) {
    const currentPos = this.getTuple(element, this.currentPositions)
    if (!currentPos) return

    if (typeof element !== 'function') {
      let isInArray = false
      this.elementRestingPositions = this.elementRestingPositions.map(
        (item) => {
          const [el, pos] = item
          if (el === element) {
            isInArray = true
            return [element, { ...pos, ...currentPos[1] }]
          }
          return item
        }
      )
      if (!isInArray) {
        this.elementRestingPositions.push([element, currentPos[1]])
      }
    }
  }

  // Using tuples in arrays because unique elements cannot be detected
  // with uuids alone. UUID is for unique animation not unique element.
  private getTuple<T>(element: Element | UUID, store: Tuple<T>[]) {
    let tuple
    if (typeof element !== 'function') {
      tuple = store.find(([el]) => el === element)
    } else {
      tuple = store.find(([key]) => key === element)
    }
    if (!tuple) {
      return null
    }
    return tuple
  }

  private destroy(key: UUID, element: Element | Function) {
    if (typeof element === 'function') {
      this.elementRestingPositions = this.elementRestingPositions.filter(
        ([item]) => item !== key
      )
      this.currentPositions = this.currentPositions.filter(
        ([item]) => item !== key
      )
    } else {
      this.elementRestingPositions = this.elementRestingPositions.filter(
        ([item]) => item !== element
      )
      this.currentPositions = this.currentPositions.filter(
        ([item]) => item !== element
      )
    }
    delete this.curFrames[key]
    delete this.animations[key]
    delete this.receivers[key]
  }
}

/**
 * @params animate functions "The response from easying.init"
 * @returns Completed / Failed state
 */
export function Synchronised(...tweens: Function[]) {
  return () => {
    return Promise.all(tweens.map((tween) => tween()))
  }
}

/**
 *
 * @param tweens List of animate functions from easying.init
 * @param seconds time in seconds to stagger each animation
 * @returns
 */
export function Staggered(...tweens: Function[]) {
  return async (seconds: number) => {
    let count = 0

    while (count < tweens.length) {
      tweens[count]()
      await waitFor(seconds)
      count++
    }
  }
}

function waitFor(seconds: number) {
  return new Promise((res) => setTimeout(res, seconds * 1000))
}

/**
 *
 * @param tweens
 */
export function Consecutive(...tweens: Function[]) {
  return async () => {
    for (let i = 0; i < tweens.length; i++) {
      await tweens[i]()
    }
  }
}

export function Loop(tween: Function) {
  return () => {
    let killed = false

    const loop = async (func: Function) => {
      if (killed) return
      await func()

      loop(func)
    }

    loop(tween)

    return {
      kill: () => (killed = true),
    }
  }
}

export function Reset(element: Element) {
  // @ts-ignore
  ;(element as HTMLElement).style = {}
}
