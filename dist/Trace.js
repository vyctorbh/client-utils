"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ObservableValue_1 = require("./ObservableValue");
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
class Trace {
    static getMethodTrace(object, method) {
        const objectTrace = this.objectTraces.get(object);
        return objectTrace.methodMappings.get(method.name);
    }
    static traceStart(methodTrace, args) {
        const startDateTime = new Date();
        const traceValue = {
            arguments: args,
            startDateTime,
        };
        methodTrace.callObservable.setValue(traceValue);
        return traceValue;
    }
    static traceFinished(methodTrace, args, callTrace, returned) {
        const finishedTrace = {
            arguments: args,
            startDateTime: callTrace.startDateTime,
            finishedDateTime: new Date(),
            returned,
        };
        methodTrace.finishedObservable.setValue(finishedTrace);
    }
    static traceError(methodTrace, args, callTrace, error) {
        const errorTrace = {
            arguments: args,
            startDateTime: callTrace.startDateTime,
            errorDateTime: new Date(),
            error,
        };
        methodTrace.errorObservable.setValue(errorTrace);
        return errorTrace;
    }
    static callMethod(object, method, args) {
        const methodTrace = this.getMethodTrace(object, method);
        const start = this.traceStart(methodTrace, args);
        try {
            const returned = methodTrace.originalMethod.call(object, ...args);
            this.traceFinished(methodTrace, args, start, returned);
            return returned;
        }
        catch (error) {
            this.traceError(methodTrace, args, start, error);
            throw error;
        }
    }
    static callMethodAsync(object, method, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const methodTrace = this.getMethodTrace(object, method);
            const start = this.traceStart(methodTrace, args);
            try {
                const returned = yield methodTrace.originalMethod.call(object, ...args);
                this.traceFinished(methodTrace, args, start, returned);
                return returned;
            }
            catch (error) {
                this.traceError(methodTrace, args, start, error);
                throw error;
            }
        });
    }
    /**
     * Creates an observer that will be observe method calls, finishes and errors
     * @param options The options object for the trace
     */
    static method(options) {
        // add object mapping
        if (!this.objectTraces.has(options.object)) {
            this.objectTraces.set(options.object, {
                methodMappings: new Map(),
            });
        }
        // setup override if needed
        if (!options.object[options.method.name].isTraced) {
            const overriddenMethod = options.isAsync ?
                ((...args) => this.callMethodAsync(options.object, options.method, args)) :
                ((...args) => this.callMethod(options.object, options.method, args));
            Object.defineProperty(overriddenMethod, "name", { value: options.method.name });
            Object.defineProperty(overriddenMethod, "isTraced", { value: options.method.name });
            options.object[options.method.name] = overriddenMethod;
        }
        const objectTrace = this.objectTraces.get(options.object);
        // add method mapping if needed
        if (!objectTrace.methodMappings.has(options.method.name)) {
            objectTrace.methodMappings.set(options.method.name, {
                originalMethod: options.method,
                callObservable: new ObservableValue_1.ObservableValue(),
                finishedObservable: new ObservableValue_1.ObservableValue(),
                errorObservable: new ObservableValue_1.ObservableValue(),
            });
        }
        const methodTrace = objectTrace.methodMappings.get(options.method.name);
        const callbacks = [
            options.onCalled && methodTrace.callObservable.subscribe(options.onCalled),
            options.onFinished && methodTrace.finishedObservable.subscribe(options.onFinished),
            options.onError && methodTrace.errorObservable.subscribe(options.onError),
        ];
        // Subscribe and return the observer
        return {
            dispose: () => callbacks.forEach((c) => c && c.dispose()),
        };
    }
}
Trace.objectTraces = new Map();
exports.Trace = Trace;
//# sourceMappingURL=Trace.js.map