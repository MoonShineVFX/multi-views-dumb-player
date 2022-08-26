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
var useEventListeners_1 = __importDefault(require("./useEventListeners"));
function useVideoState() {
    var videoRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)({
        isPlaying: false,
        isLoading: true,
        currentTime: 0,
        duration: 0,
        volume: 0,
        muted: true
    }), videoState = _a[0], setVideoState = _a[1];
    (0, useEventListeners_1.default)(videoRef, [
        'pause', 'playing', 'waiting', 'canplay', 'seeking', 'seeked',
        'durationchange', 'timeupdate', 'volumechange'
    ], function (event) {
        switch (event.type) {
            // Initial
            case 'canplay':
                setVideoState(__assign(__assign({}, videoState), { isPlaying: !videoRef.current.paused, isLoading: false, currentTime: videoRef.current.currentTime, volume: videoRef.current.volume, muted: videoRef.current.muted, duration: videoRef.current.duration }));
                break;
            // Duration
            case 'durationchange':
                setVideoState(__assign(__assign({}, videoState), { duration: videoRef.current.duration }));
                break;
            // Current time
            case 'timeupdate':
                setVideoState(__assign(__assign({}, videoState), { currentTime: videoRef.current.currentTime }));
                break;
            // Play
            case 'seeked':
            case 'playing':
                setVideoState(__assign(__assign({}, videoState), { isPlaying: true, isLoading: false, currentTime: videoRef.current.currentTime }));
                break;
            // Pause
            case 'pause':
                setVideoState(__assign(__assign({}, videoState), { isPlaying: false }));
                break;
            // Waiting
            case 'waiting':
            case 'seeking':
                setVideoState(__assign(__assign({}, videoState), { isLoading: true }));
                break;
            // Volume
            case 'volumechange':
                setVideoState(__assign(__assign({}, videoState), { volume: videoRef.current.volume, muted: videoRef.current.muted }));
                break;
            // Bypass
            default:
                console.log(event.type);
        }
    });
    return [videoRef, videoState];
}
exports.default = useVideoState;
