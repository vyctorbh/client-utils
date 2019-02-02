import { IDisposable } from "./Disposable";
import { ValueObserver } from "./ValueObserver";
/**
 * Callback type for observable value changes
 */
export declare type ValueChangeCallback<T> = (next: T) => void;
/**
 * Defines an ObservableValue value object.
 *
 * You can set and get its value with it's *setValue()* and *getValue()* methods and you can subscribe to value changes with *subscribe()*
 *
 * Usage example:
 * ```ts
 * const observableValue = new ObservableValue<number>(0);
 * const observer = observableValue.subscribe((newValue) => {
 *    console.log("Value changed:", newValue);
 * });
 * // To update the value
 * observableValue.setValue(Math.random());
 * // if you want to dispose a single observer
 * observer.dispose();
 * // if you want to dispose the whole observableValue with all of its observers:
 * observableValue.dispose();
 * ```
 *
 * @param T Generic argument to indicate the value type
 */
export declare class ObservableValue<T> implements IDisposable {
    /**
     * Disposes the ObservableValue object, removes all observers
     */
    dispose(): void;
    private observers;
    private currentValue;
    /**
     * Subscribes to a value changes
     * @param {ValueChangeCallback<T>} callback The callback method that will be called on each change
     * @param {boolean} getLast Will call the callback with the last known value right after subscription
     * @returns {ValueObserver<T>} The ValueObserver instance
     */
    subscribe(callback: ValueChangeCallback<T>, getLast?: boolean): ValueObserver<T>;
    /**
     * The observer will unsubscribe from the Observable
     * @param {ValueObserver<T>} observer The ValueObserver instance
     * @returns if unsubscribing was successfull
     */
    unsubscribe(observer: ValueObserver<T>): boolean;
    /**
     * Gets the current Value
     * @returns {T} The current value
     */
    getValue(): T;
    /**
     * Sets a new value and notifies the observers.
     * @param {T} newValue The new value to be set
     */
    setValue(newValue: T): void;
    /**
     * Gets the observers
     * @returns {ReadonlyArray<ValueObserver<T>>} The subscribed observers
     */
    getObservers(): ReadonlyArray<ValueObserver<T>>;
    /**
     * @constructs The ObservableValue object
     * @param {T} initialValue Optional initial value
     */
    constructor(initialValue?: T);
}
