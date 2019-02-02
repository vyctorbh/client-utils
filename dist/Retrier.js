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
const RetrierOptions_1 = require("./RetrierOptions");
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
class Retrier {
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
        this.isRunning = false;
    }
    /**
     * Factory method for creating a Retrier
     * @param {()=>Promise<boolean>} callback The method that will be invoked on each try
     */
    static create(callback) {
        return new Retrier(callback, new RetrierOptions_1.RetrierOptions());
    }
    wait(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, ms);
            });
        });
    }
    /**
     * Method to override the default Retrier settings.
     * @param {Partial<RetrierOptions>} options The options to be overridden
     * @throws Error if the Retrier is running.
     * @returns the Retrier instance
     */
    setup(options) {
        if (this.isRunning) {
            throw Error("Retrier already started!");
        }
        Object.assign(this.options, options);
        return this;
    }
    /**
     * Public method that starts the Retrier
     * @throws Error if the Retrier is already started.
     * @returns {Promise<boolean>} A boolean value that indicates if the process has been succeeded.
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRunning) {
                throw Error("Retrier already started!");
            }
            let succeeded = false;
            let retries = 0;
            let timedOut = false;
            this.isRunning = true;
            setTimeout(() => {
                if (!succeeded) {
                    timedOut = true;
                }
            }, this.options.timeoutMs);
            while (!succeeded && !timedOut && (this.options.Retries > retries)) {
                retries++;
                if (this.options.onTry) {
                    this.options.onTry();
                }
                succeeded = yield this.callback();
                if (!succeeded) {
                    yield this.wait(this.options.RetryIntervalMs);
                }
            }
            if (succeeded) {
                if (!timedOut && this.options.onSuccess) {
                    this.options.onSuccess();
                }
            }
            else {
                if (this.options.onFail) {
                    this.options.onFail();
                }
            }
            return succeeded;
        });
    }
}
exports.Retrier = Retrier;
//# sourceMappingURL=Retrier.js.map