import { IDisposable } from "./Disposable";
import { ObservableValue, ValueChangeCallback } from "./ObservableValue";
/**
 * Defines a generic ValueObserver instance
 *
 * A ValueObserver is created whenever you subscribe for an *ObservableValue* changes.
 *
 * Usage example:
 * ```ts
 *
 * const observableValue = new ObservableValue<number>(0);
 * const observer = observableValue.subscribe((newValue) => {
 *     console.log("Value changed:", newValue);
 * });
 *
 * // To update the value
 * observableValue.setValue(Math.random());
 * // if you want to dispose a single observer
 * observer.dispose();
 * // if you want to dispose the whole observableValue with all of its observers:
 * observableValue.dispose();
 * ```
 *
 * @param T This type parameter is the value type to observe
 */
export declare class ValueObserver<T> implements IDisposable {
    private readonly observable;
    callback: ValueChangeCallback<T>;
    /**
     * Disposes the ValueObserver instance. Unsubscribes from the observable
     */
    dispose(): void;
    /**
     * @constructs ValueObserver<T> the ValueObserver instance
     */
    constructor(observable: ObservableValue<T>, callback: ValueChangeCallback<T>);
}
