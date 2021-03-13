export as namespace mergeLib;

export = merge;

declare function merge(target: object, source: object, options?: merge.IMergeOptions): object;

declare namespace merge {

    interface ArrayMergeCallback {
        (trgVal, srcVal: any): any[];
    }

    interface FilterCallback {
        (source: object, key: string): any;
    }

    export interface IMergeOptions {
        deep?: boolean;
        clone?: boolean;
        combine?: boolean;
        descriptor?: boolean;
        filter?: FilterCallback;
        arrayMerge?: boolean|ArrayMergeCallback;
    }

    export function all(object: Array<object>, options?: IMergeOptions): object;

    export function arrayCombine(target, source: Array<any>): Array<any>;

}
