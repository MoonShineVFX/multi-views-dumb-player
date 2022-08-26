"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useEventListeners(ref, eventNames, callback, options) {
    if (options === void 0) { options = {}; }
    var handleCallback = (0, react_1.useCallback)(callback, [callback]);
    var refElement = ref.current;
    (0, react_1.useEffect)(function () {
        eventNames.map(function (eventName) {
            if (!refElement)
                return null;
            return refElement.addEventListener(eventName, handleCallback, options);
        });
        return function () {
            eventNames.map(function (eventName) {
                if (!refElement)
                    return null;
                return refElement.removeEventListener(eventName, handleCallback);
            });
        };
    });
}
exports.default = useEventListeners;
