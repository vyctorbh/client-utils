import { IDisposable } from "./Disposable";
import { ObservableValue } from "./ObservableValue";
/**
 * Options object for tracing method calls
 */
export interface ITraceMethodOptions<T, K extends keyof T, TReturns, TArgs extends any[]> {
    /**
     * The context object. Can be an instance or a constructor for static methods
     */
    object: T;
    /**
     * The method reference that needs to be traced
     */
    method: (args: any) => TReturns;
    /**
     * Callback that will be called right before executing the method
     */
    onCalled?: (newValue: ITraceMethodCall<TArgs>) => void;
    /**
     * Callback that will be called right after the method returns
     */
    onFinished?: (newValue: ITraceMethodFinished<TReturns, TArgs>) => void;
    /**
     * Callback that will be called when a method throws an error
     */
    onError?: (newValue: ITraceMethodError<TArgs>) => void;
    /**
     * The method execution will be awaited if set
     */
    isAsync?: boolean;
}
/**
 * Defines a trace method call object
 */
export interface ITraceMethodCall<TArgs extends any[]> {
    /**
     * The timestamp when the event occured
     */
    startDateTime: Date;
    /**
     * The provided arguments for the call
     */
    arguments: TArgs;
}
/**
 * Defines a trace event when a method call has been finished
 */
export interface ITraceMethodFinished<TReturns, TArgs extends any[]> extends ITraceMethodCall<TArgs> {
    returned: TReturns;
    finishedDateTime: Date;
}
/**
 * Defines a trace event when an error was thrown during a method call
 */
export interface ITraceMethodError<TArgs extends any[]> extends ITraceMethodCall<TArgs> {
    error: any;
    errorDateTime: Date;
}
/**
 * Defines a method mapping object
 */
export interface IMethodMapping<TReturns, TArgs extends any[]> {
    /**
     * The original method instance
     */
    originalMethod: (args: any) => TReturns;
    /**
     * An observable for distributing the events
     */
    callObservable: ObservableValue<ITraceMethodCall<TArgs>>;
    finishedObservable: ObservableValue<ITraceMethodFinished<any, TArgs>>;
    errorObservable: ObservableValue<ITraceMethodError<TArgs>>;
}
/**
 * Defines an Object Trace mapping
 */
export interface IObjectTrace {
    /**
     * Map about the already wrapped methods
     */
    methodMappings: Map<string, IMethodMapping<any, any[]>>;
}
/**
 * Helper class that can be used to trace method calls programmatically
 *
 * Usage example:
 * ```ts
 * const methodTracer: IDisposable = Trace.method({
 *     object: myObjectInstance,           // You can define an object constructor for static methods as well
 *     method: myObjectInstance.method,    // The method to be tracked
 *     isAsync: true,                      // if you set to async, method finished will be *await*-ed
 *     onCalled: (traceData) => {
 *         console.log("Method called:", traceData)
 *     },
 *     onFinished: (traceData) => {
 *         console.log("Method call finished:", traceData)
 *     },
 *     onError: (traceData) => {
 *         console.log("Method throwed an error:", traceData)
 *     }
 * });
 * ```
 */
export declare class Trace {
    private static objectTraces;
    private static getMethodTrace;
    private static traceStart;
    private static traceFinished;
    private static traceError;
    private static callMethod;
    private static callMethodAsync;
    /**
     * Creates an observer that will be observe method calls, finishes and errors
     * @param options The options object for the trace
     */
    static method<T extends object, K extends keyof T, TReturns, TArgs extends any[]>(options: ITraceMethodOptions<T, K, TReturns, TArgs>): IDisposable;
}
