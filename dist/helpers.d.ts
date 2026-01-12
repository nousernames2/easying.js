/**
 * @params animate functions "The response from easying.init"
 * @returns Completed / Failed state
 */
export declare function Synchronised(...tweens: Function[]): () => Promise<any[]>;
/**
 *
 * @description Higher Order function
 * @param tweens Array of animate functions from easying.init
 * @param seconds time in seconds to stagger each animation
 * @returns (delaySeconds: number) => void
 */
export declare function Staggered(...tweens: Function[]): (delaySeconds: number) => Promise<void>;
/**
 *
 * @param tweens Array of animate functions frome easying.init
 */
export declare function Consecutive(...tweens: Function[]): () => Promise<void>;
/**
 *
 * @param tween Array of animate functions from easying.init
 * @returns .kill() method to end the loop
 */
export declare function Loop(tween: Function): () => {
    kill: () => boolean;
};
/**
 * @param element HTMLElement
 * @description reset the style parameters on the element
 */
export declare function Reset(element: Element): void;
