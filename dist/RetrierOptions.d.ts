/**
 * Options class for Retrier
 */
export declare class RetrierOptions {
    /**
     * The default value for retries
     */
    static readonly RETRIES_DEFAULT: number;
    private retries;
    /**
     * How many times should retry the operation
     */
    Retries: number;
    /**
     * The default interval between retries
     */
    static readonly RETRY_INTERVAL_MS_DEFAULT: number;
    private retryIntervalMs?;
    /**
     * The interval between tries in milliseconds
     */
    RetryIntervalMs: number;
    /**
     * The default timeout in millisecs
     */
    static readonly TIMEOUT_MS_DEFAULT: number;
    private timeoutMsValue?;
    /**
     * The Timeout interval in milliseconds
     */
    timeoutMs: number;
    /**
     * Optional callback, triggered right before each try
     */
    onTry?: () => void;
    /**
     * Optional callback, triggered on success
     */
    onSuccess?: () => void;
    /**
     * Optional callback, triggered on fail (timeout or too many retries)
     */
    onFail?: () => void;
}
