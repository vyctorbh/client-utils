"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Options class for Retrier
 */
class RetrierOptions {
    constructor() {
        this.retries = RetrierOptions.RETRIES_DEFAULT;
    }
    /**
     * How many times should retry the operation
     */
    get Retries() {
        return this.retries;
    }
    set Retries(v) {
        this.retries = v;
    }
    /**
     * The interval between tries in milliseconds
     */
    get RetryIntervalMs() {
        return this.retryIntervalMs !== undefined ? this.retryIntervalMs : RetrierOptions.RETRY_INTERVAL_MS_DEFAULT;
    }
    set RetryIntervalMs(v) {
        this.retryIntervalMs = v;
    }
    /**
     * The Timeout interval in milliseconds
     */
    get timeoutMs() {
        return this.timeoutMsValue !== undefined ? this.timeoutMsValue : RetrierOptions.TIMEOUT_MS_DEFAULT;
    }
    set timeoutMs(v) {
        this.timeoutMsValue = v;
    }
}
/**
 * The default value for retries
 */
RetrierOptions.RETRIES_DEFAULT = 10;
/**
 * The default interval between retries
 */
RetrierOptions.RETRY_INTERVAL_MS_DEFAULT = 10;
/**
 * The default timeout in millisecs
 */
RetrierOptions.TIMEOUT_MS_DEFAULT = 1000;
exports.RetrierOptions = RetrierOptions;
//# sourceMappingURL=RetrierOptions.js.map