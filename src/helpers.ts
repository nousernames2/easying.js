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
 * @description Higher Order function
 * @param tweens Array of animate functions from easying.init
 * @param seconds time in seconds to stagger each animation
 * @returns (delaySeconds: number) => void
 */
export function Staggered(...tweens: Function[]) {
  return async (delaySeconds: number) => {
    let count = 0

    while (count < tweens.length) {
      tweens[count]()
      await waitFor(delaySeconds)
      count++
    }
  }
}

function waitFor(seconds: number) {
  return new Promise((res) => setTimeout(res, seconds * 1000))
}

/**
 *
 * @param tweens Array of animate functions frome easying.init
 */
export function Consecutive(...tweens: Function[]) {
  return async () => {
    for (let i = 0; i < tweens.length; i++) {
      await tweens[i]()
    }
  }
}

/**
 * 
 * @param tween Array of animate functions from easying.init
 * @returns .kill() method to end the loop
 */
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

/**
 * @param element HTMLElement
 * @description reset the style parameters on the element
 */
export function Reset(element: Element) {
  // @ts-ignore
  ;(element as HTMLElement).style = {}
}