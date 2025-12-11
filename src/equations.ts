// t: current time, b: begInnIng value, c: change In value, d: duration
// Robert Penner https://robertpenner.com/easing/

export const linear = function (t: number, b: number, c: number, d: number) {
  return c * (t /= d) + b
}

export const easeInQuad = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return c * (t /= d) * t + b
}
export const easeOutQuad = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return -c * (t /= d) * (t - 2) + b
}
export const easeInOutQuad = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b
  return (-c / 2) * (--t * (t - 2) - 1) + b
}
export const easeInCubic = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return c * (t /= d) * t * t + b
}
export const easeOutCubic = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return c * ((t = t / d - 1) * t * t + 1) + b
}
export const easeInOutCubic = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b
  return (c / 2) * ((t -= 2) * t * t + 2) + b
}
export const easeInQuart = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return c * (t /= d) * t * t * t + b
}
export const easeOutQuart = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b
}
export const easeInOutQuart = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b
  return (-c / 2) * ((t -= 2) * t * t * t - 2) + b
}
export const easeInQuint = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return c * (t /= d) * t * t * t * t + b
}
export const easeOutQuint = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b
}
export const easeInOutQuint = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b
  return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b
}
export const easeInSine = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b
}
export const easeOutSine = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b
}
export const easeInOutSine = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b
}
export const easeInExpo = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
}
export const easeOutExpo = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b
}
export const easeInOutExpo = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  if (t == 0) return b
  if (t == d) return b + c
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b
  return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b
}
export const easeInCirc = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
}
export const easeOutCirc = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
}
export const easeInOutCirc = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b
  return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
}
export const easeInElastic = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  var s = 1.70158
  var p = 0
  var a = c
  if (t == 0) return b
  if ((t /= d) == 1) return b + c
  if (!p) p = d * 0.3
  if (a < Math.abs(c)) {
    a = c
    var s = p / 4
  } else var s = (p / (2 * Math.PI)) * Math.asin(c / a)
  return (
    -(
      a *
      Math.pow(2, 10 * (t -= 1)) *
      Math.sin(((t * d - s) * (2 * Math.PI)) / p)
    ) + b
  )
}
export const easeOutElastic = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  var s = 1.70158
  var p = 0
  var a = c
  if (t == 0) return b
  if ((t /= d) == 1) return b + c
  if (!p) p = d * 0.3
  if (a < Math.abs(c)) {
    a = c
    var s = p / 4
  } else var s = (p / (2 * Math.PI)) * Math.asin(c / a)
  return (
    a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
    c +
    b
  )
}
export const easeInOutElastic = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  var s = 1.70158
  var p = 0
  var a = c
  if (t == 0) return b
  if ((t /= d / 2) == 2) return b + c
  if (!p) p = d * (0.3 * 1.5)
  if (a < Math.abs(c)) {
    a = c
    var s = p / 4
  } else var s = (p / (2 * Math.PI)) * Math.asin(c / a)
  if (t < 1)
    return (
      -0.5 *
        (a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
      b
    )
  return (
    a *
      Math.pow(2, -10 * (t -= 1)) *
      Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
      0.5 +
    c +
    b
  )
}
export const easeInBack = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  let s = 1.70158
  return c * (t /= d) * t * ((s + 1) * t - s) + b
}
export const easeOutBack = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  let s = 1.70158
  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
}
export const easeInOutBack = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  let s = 1.70158
  if ((t /= d / 2) < 1)
    return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b
  return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
}
export const easeInBounce = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  return c - easeOutBounce(d - t, 0, c, d) + b
}
export const easeOutBounce = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  if ((t /= d) < 1 / 2.75) {
    return c * (7.5625 * t * t) + b
  } else if (t < 2 / 2.75) {
    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
  } else if (t < 2.5 / 2.75) {
    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
  } else {
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
  }
}

export const easeInOutBounce = function (
  t: number,
  b: number,
  c: number,
  d: number
) {
  if (t < d / 2) return easeInBounce(t * 2, 0, c, d) * 0.5 + b
  return easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
}

export type Equations = typeof easeInCirc
