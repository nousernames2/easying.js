# Easying.js

Easying.js uses the easing equations written by [Robert Penner](https://github.com/danro/jquery-easing/blob/master/jquery.easing.js) and provides features for working with these equations to generate complex animations.

## Initialising

- `init` or `initMany` is used to prepare an animation or tween.
- Calling the returned function will run tween until it is finished.

#### Example

```
const animator = new Easying()

const startAnimation = animator.init(htmlElement, {
    parameters: {
        translateX: {
            start: 0,
            end: 100
        }
    },
    ease: easeInCirc,
    seconds: 2
})

startAnimation()
```

- The returned function can be awaited or chained with `.then()`. This is useful for creating complex animations from the tweens returned from `init`

#### Helpers

There are four helper functions that can be used in combination to create complex animations.

```
Synchronised()
Consecutive()
Staggered()
Loop()
```

Using these allow complex animations while keeping the code simple.

#### Types

```
// first init() parameter
HTMLElement | (val: CallbackValue) => void

// second init() parameter
type Animation = {
  ease: Equations
  seconds: number
  parameters: Parameters
  delay?: number
  destroyOnComplete?: boolean
}

type Parameters = Record<'top'
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
  | `custom-${string | number}`, {
    start: number
    end: number
  }>
```
