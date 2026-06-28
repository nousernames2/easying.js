function g(...t) {
  return () => Promise.all(t.map((n) => n()));
}
function F(...t) {
  return async (n) => {
    let s = 0;
    for (; s < t.length; )
      t[s](), await M(n), s++;
  };
}
function M(t) {
  return new Promise((n) => setTimeout(n, t * 1e3));
}
function I(...t) {
  return async () => {
    for (let n = 0; n < t.length; n++)
      await t[n]();
  };
}
function d(t) {
  return () => {
    let n = !1;
    const s = async (i) => {
      n || (await i(), s(i));
    };
    return s(t), {
      kill: () => n = !0
    };
  };
}
function y(t) {
  t.style = {};
}
const O = function(t, n, s, i) {
  return s * (t /= i) + n;
}, v = function(t, n, s, i) {
  return s * (t /= i) * t + n;
}, S = function(t, n, s, i) {
  return -s * (t /= i) * (t - 2) + n;
}, T = function(t, n, s, i) {
  return (t /= i / 2) < 1 ? s / 2 * t * t + n : -s / 2 * (--t * (t - 2) - 1) + n;
}, E = function(t, n, s, i) {
  return s * (t /= i) * t * t + n;
}, C = function(t, n, s, i) {
  return s * ((t = t / i - 1) * t * t + 1) + n;
}, R = function(t, n, s, i) {
  return (t /= i / 2) < 1 ? s / 2 * t * t * t + n : s / 2 * ((t -= 2) * t * t + 2) + n;
}, Q = function(t, n, s, i) {
  return s * (t /= i) * t * t * t + n;
}, $ = function(t, n, s, i) {
  return -s * ((t = t / i - 1) * t * t * t - 1) + n;
}, x = function(t, n, s, i) {
  return (t /= i / 2) < 1 ? s / 2 * t * t * t * t + n : -s / 2 * ((t -= 2) * t * t * t - 2) + n;
}, B = function(t, n, s, i) {
  return s * (t /= i) * t * t * t * t + n;
}, q = function(t, n, s, i) {
  return s * ((t = t / i - 1) * t * t * t * t + 1) + n;
}, D = function(t, n, s, i) {
  return (t /= i / 2) < 1 ? s / 2 * t * t * t * t * t + n : s / 2 * ((t -= 2) * t * t * t * t + 2) + n;
}, U = function(t, n, s, i) {
  return -s * Math.cos(t / i * (Math.PI / 2)) + s + n;
}, X = function(t, n, s, i) {
  return s * Math.sin(t / i * (Math.PI / 2)) + n;
}, Y = function(t, n, s, i) {
  return -s / 2 * (Math.cos(Math.PI * t / i) - 1) + n;
}, j = function(t, n, s, i) {
  return t == 0 ? n : s * Math.pow(2, 10 * (t / i - 1)) + n;
}, A = function(t, n, s, i) {
  return t == i ? n + s : s * (-Math.pow(2, -10 * t / i) + 1) + n;
}, L = function(t, n, s, i) {
  return t == 0 ? n : t == i ? n + s : (t /= i / 2) < 1 ? s / 2 * Math.pow(2, 10 * (t - 1)) + n : s / 2 * (-Math.pow(2, -10 * --t) + 2) + n;
}, z = function(t, n, s, i) {
  return -s * (Math.sqrt(1 - (t /= i) * t) - 1) + n;
}, G = function(t, n, s, i) {
  return s * Math.sqrt(1 - (t = t / i - 1) * t) + n;
}, H = function(t, n, s, i) {
  return (t /= i / 2) < 1 ? -s / 2 * (Math.sqrt(1 - t * t) - 1) + n : s / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n;
}, J = function(t, n, s, i) {
  var o = 1.70158, e = 0, r = s;
  if (t == 0) return n;
  if ((t /= i) == 1) return n + s;
  if (e || (e = i * 0.3), r < Math.abs(s)) {
    r = s;
    var o = e / 4;
  } else var o = e / (2 * Math.PI) * Math.asin(s / r);
  return -(r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - o) * (2 * Math.PI) / e)) + n;
}, N = function(t, n, s, i) {
  var o = 1.70158, e = 0, r = s;
  if (t == 0) return n;
  if ((t /= i) == 1) return n + s;
  if (e || (e = i * 0.3), r < Math.abs(s)) {
    r = s;
    var o = e / 4;
  } else var o = e / (2 * Math.PI) * Math.asin(s / r);
  return r * Math.pow(2, -10 * t) * Math.sin((t * i - o) * (2 * Math.PI) / e) + s + n;
}, V = function(t, n, s, i) {
  var o = 1.70158, e = 0, r = s;
  if (t == 0) return n;
  if ((t /= i / 2) == 2) return n + s;
  if (e || (e = i * (0.3 * 1.5)), r < Math.abs(s)) {
    r = s;
    var o = e / 4;
  } else var o = e / (2 * Math.PI) * Math.asin(s / r);
  return t < 1 ? -0.5 * (r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - o) * (2 * Math.PI) / e)) + n : r * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - o) * (2 * Math.PI) / e) * 0.5 + s + n;
}, W = function(t, n, s, i) {
  let e = 1.70158;
  return s * (t /= i) * t * ((e + 1) * t - e) + n;
}, Z = function(t, n, s, i) {
  let e = 1.70158;
  return s * ((t = t / i - 1) * t * ((e + 1) * t + e) + 1) + n;
}, _ = function(t, n, s, i) {
  let e = 1.70158;
  return (t /= i / 2) < 1 ? s / 2 * (t * t * (((e *= 1.525) + 1) * t - e)) + n : s / 2 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2) + n;
}, w = function(t, n, s, i) {
  return s - P(i - t, 0, s, i) + n;
}, P = function(t, n, s, i) {
  return (t /= i) < 1 / 2.75 ? s * (7.5625 * t * t) + n : t < 2 / 2.75 ? s * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + n : t < 2.5 / 2.75 ? s * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + n : s * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + n;
}, K = function(t, n, s, i) {
  return t < i / 2 ? w(t * 2, 0, s, i) * 0.5 + n : P(t * 2 - i, 0, s, i) * 0.5 + s * 0.5 + n;
};
class b {
  FPS = 60;
  curFrames = {};
  animations = {};
  receivers = {};
  currentPositions = [];
  elementRestingPositions = [];
  paused = !1;
  constructor() {
    document.addEventListener("visibilitychange", () => {
      this.paused = document.visibilityState !== "visible";
    });
  }
  // private async calcFps() {
  //   const SEC = 1000
  //   const then = performance.now()
  //   const now = await this.waitForFrame()
  //   const roughFps = SEC / (now - then)
  //   if (roughFps < 30) {
  //     this.FPS = 24
  //   } else if (roughFps < 60) {
  //     this.FPS = 30
  //   } else {
  //     this.FPS = 60
  //   }
  // }
  async waitForTimedFrame(n) {
    const r = (1e3 / this.FPS - n) / 1e3;
    r > 0 && await this.waitForTime(r);
  }
  async stutterDetection(n) {
    const i = 1e3 / this.FPS;
    n > i && (this.FPS >= 30 ? this.FPS = 24 : this.FPS -= 10);
  }
  async waitForFrame() {
    return new Promise((n) => requestAnimationFrame(n));
  }
  async waitForTime(n) {
    await new Promise((s) => setTimeout(s, n * 1e3));
  }
  async delay(n) {
    await this.waitForTime(n);
  }
  /**
   * @param element HTMLElement | Function
   * @param animation Object ease: easingFunction; seconds: number; delay?: number; parameters: Parameters; destroyOnComplete?: boolean
   * @param animation.parameters Object [targetCSS]: {start: number, end: number}
   */
  init(n, s, i) {
    const e = typeof n == "function";
    let r;
    return i ? r = i : r = window.crypto.randomUUID(), this.currentPositions.every(([o]) => o !== n) && this.currentPositions.push([e ? r : n, {}]), this.curFrames[r] = 0, this.animations[r] = s, this.receivers[r] = n, this.animate.bind(this, r);
  }
  initMany(n, s) {
    let i = [];
    for (let e = 0; e < n.length; e++) {
      const r = window.crypto.randomUUID();
      this.currentPositions.every(([o]) => o !== n[e]) && this.currentPositions.push([n[e], {}]), this.curFrames[r] = 0, this.animations[r] = s, this.receivers[r] = n[e], i.push(this.animate.bind(this, r));
    }
    return i;
  }
  async generateFrames(n, s) {
    const i = this.animations[s], e = i.seconds * this.FPS;
    for (await this.waitForTime(i.delay ?? 0); this.curFrames[s] <= e; )
      if (this.paused)
        await this.waitForFrame();
      else {
        const r = performance.now();
        this.calcFrame(n, s);
        const o = performance.now();
        this.stutterDetection(o - r), await this.waitForTimedFrame(o - r);
      }
  }
  calcFrame(n, s) {
    const i = this.animations[s], e = i.seconds * this.FPS, r = i.ease;
    Object.entries(i.parameters).forEach(([m, f]) => {
      if (!f) return;
      const { start: a } = f, { end: u } = f, c = u - a, h = r(this.curFrames[s], a, c, e), p = m;
      let l;
      typeof n == "function" ? l = this.getTuple(s, this.currentPositions) : l = this.getTuple(n, this.currentPositions), l && (l[1] = { ...l[1], [p]: h });
    }), this.drawFrame(n, s), this.curFrames[s]++;
  }
  drawFrame(n, s) {
    let i;
    if (typeof n == "function" ? i = this.getTuple(s, this.currentPositions) : i = this.getTuple(n, this.currentPositions), typeof n == "function") {
      i && n(i[1]);
      return;
    }
    if (!i) return;
    let e = [];
    e = Object.entries(i[1]);
    const r = [];
    let o = e.map(([a, u]) => {
      if (!u) return;
      const c = a;
      return c === "translateX" || c === "translateY" || c === "rotate" || c === "scale" ? { p: c, value: u } : (r.push({ p: c, value: u }), !1);
    }).filter(Boolean);
    const m = o.filter(
      (a) => a.p === "translateX" || a.p === "translateY"
    ), f = o.filter(
      (a) => a.p !== "translateX" && a.p !== "translateY"
    );
    o = [...m, ...f], o.forEach(({ p: a, value: u }, c) => {
      const h = a === "translateX" || a === "translateY" ? "px" : a === "rotate" ? "deg" : a === "scale" ? "" : "default", p = h === "px" ? Math.round(u) : u;
      c === 0 ? n.style.transform = `${a}(${p}${h})` : n.style.transform += ` ${a}(${p}${h})`;
    }), r.forEach(({ p: a, value: u }) => {
      a === "opacity" ? n.style[a] = `${u}` : n.style[a] = `${u}px`;
    });
  }
  /**
   * 
   * @description Call this function to start the element's tween. Combine in helper functions to create complex animations 
   */
  async animate(n) {
    const s = this.receivers[n];
    let i, e;
    return typeof s == "function" ? (i = this.getTuple(n, this.elementRestingPositions), e = this.getTuple(n, this.currentPositions)) : (i = this.getTuple(s, this.elementRestingPositions), e = this.getTuple(s, this.currentPositions)), e && i && (e[1] = { ...e[1], ...i[1] }), await this.generateFrames(s, n), typeof s == "function" ? this.updateRestingPositions(n) : this.updateRestingPositions(s), this.curFrames[n] = 0, this.animations[n].destroyOnComplete && this.destroy(n, s), this;
  }
  updateRestingPositions(n) {
    const s = this.getTuple(n, this.currentPositions);
    if (s && typeof n != "function") {
      let i = !1;
      this.elementRestingPositions = this.elementRestingPositions.map(
        (e) => {
          const [r, o] = e;
          return r === n ? (i = !0, [n, { ...o, ...s[1] }]) : e;
        }
      ), i || this.elementRestingPositions.push([n, s[1]]);
    }
  }
  // Using tuples in arrays because unique elements cannot be detected
  // with uuids alone. UUID is for unique animation not unique element.
  getTuple(n, s) {
    let i;
    return typeof n != "function" ? i = s.find(([e]) => e === n) : i = s.find(([e]) => e === n), i || null;
  }
  destroy(n, s) {
    typeof s == "function" ? (this.elementRestingPositions = this.elementRestingPositions.filter(
      ([i]) => i !== n
    ), this.currentPositions = this.currentPositions.filter(
      ([i]) => i !== n
    )) : (this.elementRestingPositions = this.elementRestingPositions.filter(
      ([i]) => i !== s
    ), this.currentPositions = this.currentPositions.filter(
      ([i]) => i !== s
    )), delete this.curFrames[n], delete this.animations[n], delete this.receivers[n];
  }
}
export {
  I as Consecutive,
  d as Loop,
  y as Reset,
  F as Staggered,
  g as Synchronised,
  b as default,
  W as easeInBack,
  w as easeInBounce,
  z as easeInCirc,
  E as easeInCubic,
  J as easeInElastic,
  j as easeInExpo,
  _ as easeInOutBack,
  K as easeInOutBounce,
  H as easeInOutCirc,
  R as easeInOutCubic,
  V as easeInOutElastic,
  L as easeInOutExpo,
  T as easeInOutQuad,
  x as easeInOutQuart,
  D as easeInOutQuint,
  Y as easeInOutSine,
  v as easeInQuad,
  Q as easeInQuart,
  B as easeInQuint,
  U as easeInSine,
  Z as easeOutBack,
  P as easeOutBounce,
  G as easeOutCirc,
  C as easeOutCubic,
  N as easeOutElastic,
  A as easeOutExpo,
  S as easeOutQuad,
  $ as easeOutQuart,
  q as easeOutQuint,
  X as easeOutSine,
  O as linear
};
