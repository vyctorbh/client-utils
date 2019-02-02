import { RetrierOptions } from "./RetrierOptions";
/**
 * Utility class for retrying operations.
 *
 * Usage example:
 * ```
 * const methodToRetry: () => Promise<boolean> = async () => {
 *     let hasSucceeded = false;
 *     // ...
 *     // custom logic
 *     // ...
 *     return hasSucceeded;
 * }
 * const retrierSuccess = await Retrier.create(methodToRetry)
 *     .setup({
 *         retries: 3,
 *         retryIntervalMs: 1,
 *         timeoutMs: 1000
 *     })
 *     .run();
 * ```
 */
export declare class Retrier {
    private callback;
    readonly options: RetrierOptions;
    private isRunning;
    /**
     * Factory method for creating a Retrier
     * @param {()=>Promise<boolean>} callback The method that will be invoked on each try
     */
    static create(callback: () => Promise<boolean>): Retrier;
    private constructor();
    private wait;
    /**
     * Method to override the default Retrier settings.
     * @param {Partial<RetrierOptions>} options The options to be overridden
     * @throws Error if the Retrier is running.
     * @returns the Retrier instance
     */
    setup(options: Partial<RetrierOptions>): this;
    /**
     * Public method that starts the Retrier
     * @throws Error if the Retrier is already started.
     * @returns {Promise<boolean>} A boolean value that indicates if the process has been succeeded.
     */
    run(): Promise<boolean>;
}
