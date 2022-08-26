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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var icons_1 = require("../icons");
var PlaybackControl_module_css_1 = __importDefault(require("./PlaybackControl.module.css"));
var SETTINGS_1 = __importDefault(require("../SETTINGS"));
function PlaybackControl(props) {
    var _a, _b, _c, _d, _e, _f;
    // Defines
    var videoState = props.videoState, videoRef = props.videoRef;
    // Hooks
    var _g = (0, react_1.useState)(false), isVolumeHover = _g[0], setIsVolumeHover = _g[1];
    var timeBarRef = (0, react_1.useRef)(null);
    var volumeSliderRef = (0, react_1.useRef)(null);
    // Dynamic styles
    var dynamicStyle = {
        volumeSliderContainer: {
            display: isVolumeHover ? 'block' : 'none'
        },
        volumeSliderCore: {
            height: videoState.volume * 100 + '%',
            backgroundColor: videoState.muted ? ((_a = props.colors) === null || _a === void 0 ? void 0 : _a.sub) || 'darkgray' : ((_b = props.colors) === null || _b === void 0 ? void 0 : _b.main) || 'white'
        },
        timeBarCore: {
            width: videoState.currentTime / videoState.duration * 100 + '%',
            backgroundColor: (_c = props.colors) === null || _c === void 0 ? void 0 : _c.main
        }
    };
    // Play button
    var onPlayButtonClick = function () {
        if (videoState.isPlaying) {
            videoRef.current.pause();
            return;
        }
        videoRef.current.play();
    };
    // Volume slider
    var onVolumeSliderClick = function (event) {
        if (videoRef.current.muted)
            videoRef.current.muted = false;
        videoRef.current.volume = 1.0 - event.nativeEvent.offsetY / volumeSliderRef.current.offsetHeight;
    };
    // Volume icon
    var VolumeButton;
    if (videoState.muted) {
        VolumeButton = icons_1.IconVolumeOff;
    }
    else if (videoState.volume > 0.65) {
        VolumeButton = icons_1.IconVolumeUp;
    }
    else if (videoState.volume > 0.35) {
        VolumeButton = icons_1.IconVolumeDown;
    }
    else {
        VolumeButton = icons_1.IconVolumeMute;
    }
    // Time bar
    var onTimeBarClick = function (event) {
        var seekRatio = event.nativeEvent.offsetX / timeBarRef.current.offsetWidth;
        videoRef.current.currentTime = seekRatio * videoState.duration;
    };
    return (0, jsx_runtime_1.jsxs)("div", __assign({ className: PlaybackControl_module_css_1.default.playbackControl, style: __assign(__assign({}, props.style), { backgroundColor: (_d = props.colors) === null || _d === void 0 ? void 0 : _d.base }) }, { children: [(0, jsx_runtime_1.jsx)(PlayButton, { colors: props.colors, isPlaying: videoState.isPlaying, onClick: onPlayButtonClick }, void 0), !SETTINGS_1.default.IS_MOBILE() &&
                (0, jsx_runtime_1.jsxs)("div", __assign({ className: PlaybackControl_module_css_1.default.volumeContainer, onMouseEnter: function () { return setIsVolumeHover(true); }, onMouseLeave: function () { return setIsVolumeHover(false); } }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: PlaybackControl_module_css_1.default.volumeSliderContainer, style: dynamicStyle.volumeSliderContainer }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ ref: volumeSliderRef, className: PlaybackControl_module_css_1.default.volumeSlider, style: { backgroundColor: (_e = props.colors) === null || _e === void 0 ? void 0 : _e.base }, onClick: onVolumeSliderClick }, { children: (0, jsx_runtime_1.jsx)("div", { className: PlaybackControl_module_css_1.default.volumeSliderCore, style: dynamicStyle.volumeSliderCore }, void 0) }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(ThemeButton, { Button: VolumeButton, colors: props.colors, className: PlaybackControl_module_css_1.default.buttonIcon, onClick: function () { return videoRef.current.muted = !videoRef.current.muted; } }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(TimeStampText, { time: videoState.currentTime, colors: props.colors }, void 0), (0, jsx_runtime_1.jsx)("div", __assign({ ref: timeBarRef, className: PlaybackControl_module_css_1.default.timeBar, style: { backgroundColor: (_f = props.colors) === null || _f === void 0 ? void 0 : _f.sub }, onClick: onTimeBarClick }, { children: (0, jsx_runtime_1.jsx)("div", { className: PlaybackControl_module_css_1.default.timeBarCore, style: dynamicStyle.timeBarCore }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(TimeStampText, { time: videoState.duration - videoState.currentTime, colors: props.colors }, void 0)] }), void 0);
}
exports.default = PlaybackControl;
// ThemeButton
function ThemeButton(props) {
    var Button = props.Button, colors = props.colors, passProps = __rest(props, ["Button", "colors"]);
    var _a = (0, react_1.useState)(false), isHover = _a[0], setIsHover = _a[1];
    return (0, jsx_runtime_1.jsx)(Button, __assign({ onPointerEnter: function () { return setIsHover(true); }, onPointerLeave: function () { return setIsHover(false); }, style: { fill: isHover ? (colors === null || colors === void 0 ? void 0 : colors.highlight) || 'aquamarine' : (colors === null || colors === void 0 ? void 0 : colors.main) || 'white' } }, passProps), void 0);
}
// PlayButton
function PlayButton(props) {
    var CurrentButton = props.isPlaying ? icons_1.IconPause : icons_1.IconPlay;
    return (0, jsx_runtime_1.jsx)(ThemeButton, { Button: CurrentButton, colors: props.colors, className: PlaybackControl_module_css_1.default.buttonIcon, onClick: props.onClick }, void 0);
}
// TimeStampText
function TimeStampText(props) {
    var _a;
    var hours = Math.floor(props.time / 3600);
    var minutes = Math.floor((props.time - (hours * 3600)) / 60);
    var seconds = Math.round(props.time - (hours * 3600) - (minutes * 60));
    var hoursStr = hours < 10 ? '0' + hours : hours.toString();
    var minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
    var secondsStr = seconds < 10 ? '0' + seconds : seconds.toString();
    var resultStr = '';
    if (hours > 0) {
        resultStr += hoursStr + ':';
    }
    resultStr += "".concat(minutesStr, ":").concat(secondsStr);
    return (0, jsx_runtime_1.jsx)("p", __assign({ className: PlaybackControl_module_css_1.default.text, style: { color: (_a = props.colors) === null || _a === void 0 ? void 0 : _a.main } }, { children: resultStr }), void 0);
}
