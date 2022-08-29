"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SETTINGS_1 = __importDefault(require("../SETTINGS"));
var useEventListeners_1 = __importDefault(require("./useEventListeners"));
// Defines
var IS_TOUCHABLE = navigator.maxTouchPoints > 0;
var POINTER_EVENT = {
    down: IS_TOUCHABLE ? 'touchstart' : 'mousedown',
    up: IS_TOUCHABLE ? 'touchend' : 'mouseup',
    leave: IS_TOUCHABLE ? 'touchcancel' : 'mouseleave',
    move: IS_TOUCHABLE ? 'touchmove' : 'mousemove'
};
// Functions
var getPointerEventPageX = function (event) {
    if (IS_TOUCHABLE) {
        return event.touches[0].pageX;
    }
    return event.pageX;
};
// Main
function useTrackControl(trackCount) {
    var _a = (0, react_1.useState)(0), trackCurrentIndex = _a[0], setTrackCurrentIndex = _a[1];
    var _b = (0, react_1.useState)({ active: false, movement: 0, previousPageX: 0 }), mouseState = _b[0], setMouseState = _b[1];
    var trackBarRef = (0, react_1.useRef)(null);
    // Detect mouse state
    (0, useEventListeners_1.default)(trackBarRef, [POINTER_EVENT.up, POINTER_EVENT.down, POINTER_EVENT.leave, POINTER_EVENT.move], function (event) {
        switch (event.type) {
            // Cancel
            case POINTER_EVENT.up:
            case POINTER_EVENT.leave:
                if (mouseState.active)
                    setMouseState(__assign(__assign({}, mouseState), { active: false }));
                break;
            // Click
            case POINTER_EVENT.down:
                setMouseState({ active: true, movement: 0, previousPageX: getPointerEventPageX(event) });
                break;
            // Move
            case POINTER_EVENT.move:
                if (!mouseState.active)
                    return;
                var currentPageX = getPointerEventPageX(event);
                var currentMovement = mouseState.movement + currentPageX - mouseState.previousPageX;
                var trackSegmentLength = trackBarRef.current.offsetWidth / trackCount * SETTINGS_1.default.TRACK_SWIPE_SPEED;
                if (Math.abs(currentMovement) > trackSegmentLength) {
                    var sign = Math.sign(currentMovement);
                    currentMovement += -sign * trackSegmentLength;
                    setTrackCurrentIndex((((trackCurrentIndex + sign) % trackCount) + trackCount) % trackCount);
                }
                setMouseState(__assign(__assign({}, mouseState), { movement: currentMovement, previousPageX: currentPageX }));
                break;
            // Bypass
            default:
        }
    }, { passive: true });
    (0, useEventListeners_1.default)(trackBarRef, ['dragstart', 'drop'], function (event) {
        switch (event.type) {
            case 'dragstart':
            case 'drop':
                event.preventDefault();
                break;
            default:
        }
    });
    return [trackCurrentIndex, setTrackCurrentIndex, trackBarRef];
}
exports.default = useTrackControl;
//# sourceMappingURL=useTrackControl.js.map