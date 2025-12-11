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

type Keys = 'currentPositions' | 'elementRestingPositionss'

type UUID = `${string}-${string}-${string}-${string}-${string}`
