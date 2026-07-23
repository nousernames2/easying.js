import { Equations } from './equations';
type Parameter = 'top' | 'right' | 'bottom' | 'left' | 'margin-top' | 'margin-right' | 'margin-bottom' | 'margin-left' | 'width' | 'height' | 'translateX' | 'translateY' | 'rotate' | 'scale' | 'opacity' | `custom-${string | number}`;
type Parameters = {
    [key in Parameter]?: {
        start: number;
        end: number;
    };
};
type CallbackValue = {
    [key in Parameter]: number;
};
type Animation = {
    ease: Equations;
    seconds: number;
    parameters: Parameters;
    delay?: number;
    destroyOnComplete?: boolean;
};
export default class Easying {
    private FPS;
    private curFrames;
    private animations;
    private receivers;
    private currentPositions;
    private elementRestingPositions;
    private paused;
    constructor();
    private waitForTimedFrame;
    private waitForFrame;
    private waitForTime;
    delay(seconds: number): Promise<void>;
    /**
     * @param element HTMLElement | Function
     * @param animation Object ease: easingFunction; seconds: number; delay?: number; parameters: Parameters; destroyOnComplete?: boolean
     * @param animation.parameters Object [targetCSS]: {start: number, end: number}
     */
    init(element: Element | ((val: CallbackValue) => unknown), animation: Animation, userKey?: string): () => Promise<this>;
    initMany(elements: Element[], animation: Animation): (() => Promise<this>)[];
    private generateFrames;
    private calcFrame;
    private drawFrame;
    /**
     *
     * @description Call this function to start the element's tween. Combine in helper functions to create complex animations
     */
    private animate;
    private updateRestingPositions;
    private getTuple;
    private destroy;
}
export {};
