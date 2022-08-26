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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var TrackControl_module_css_1 = __importDefault(require("./TrackControl.module.css"));
function TrackControl(props, ref) {
    var _a, _b;
    return (0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, className: TrackControl_module_css_1.default.control, draggable: 'false', style: __assign(__assign({}, props.style), { backgroundColor: (_a = props.colors) === null || _a === void 0 ? void 0 : _a.base, borderTop: '1px solid ' + ((_b = props.colors) === null || _b === void 0 ? void 0 : _b.sub) || 'darkgray' }) }, { children: new Array(props.trackCount).fill('').map(function (_, i) {
            return (0, jsx_runtime_1.jsx)(TrackIndicator, { trackNumber: i, isActive: i === props.trackCurrentIndex, onClick: props.onIndicatorClick, colors: props.colors }, i);
        }) }), void 0);
}
exports.default = react_1.default.forwardRef(TrackControl);
function TrackIndicator(props) {
    var _a, _b, _c;
    var _d = (0, react_1.useState)(false), isHover = _d[0], setIsHover = _d[1];
    var backgroundColor = props.isActive ? ((_a = props.colors) === null || _a === void 0 ? void 0 : _a.main) || 'white' : (_b = props.colors) === null || _b === void 0 ? void 0 : _b.sub;
    if (isHover)
        backgroundColor = ((_c = props.colors) === null || _c === void 0 ? void 0 : _c.highlight) || 'aquamarine';
    return (0, jsx_runtime_1.jsx)("div", { className: TrackControl_module_css_1.default.indicator, style: { backgroundColor: backgroundColor }, draggable: 'false', onPointerEnter: function () { return setIsHover(true); }, onPointerLeave: function () { return setIsHover(false); }, onClick: function (event) {
            event.preventDefault();
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
            props.onClick(props.trackNumber);
        } }, void 0);
}
