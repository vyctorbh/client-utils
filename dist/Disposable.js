"use strict";
/**
 *
 * You can implement *IDisposable* resources and use them with a *using()* or *usingAsync()* syntax.
 *
 * Usage example:
 *
 * ```ts
 * class Resource implements IDisposable{
 *       dispose(){
 *           // cleanup logics
 *      }
 * }
 *
 *
 * using(new Resource(), (resource)=>{
 *      // do something with the resource
 * })
 *
 * usingAsync(new Resource(), async (resource)=>{
 *      // do something with the resource, allows awaiting promises
 * })
 * ```
 */
/** */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Method that accepts an IDisposable resource that will be disposed after the callback
 * @param {IDisposable} resource The resource that is used in the callback and will be disposed afterwards
 * @param {function} callback The callback that will be executed synchrounously before the resource will be disposed
 */
exports.using = (resource, callback) => {
    try {
        return callback(resource);
    }
    finally {
        resource.dispose();
    }
};
/**
 * Method that accepts an IDisposable resource that will be disposed after the callback
 * @param {IDisposable} resource The resource that is used in the callback and will be disposed afterwards
 * @param {function} callback The callback that will be executed asynchrounously before the resource will be disposed
 */
exports.usingAsync = (resource, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
        return yield callback(resource);
    }
    finally {
        resource.dispose();
    }
});
//# sourceMappingURL=Disposable.js.map