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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
var MultiViewsDumbPlayer_1 = require("./MultiViewsDumbPlayer");
var root = client_1.default.createRoot(document.getElementById('root'));
var MultiViewsDumbPlayerSettings = {
    url: 'an-dance',
    columnCount: 4,
    rowCount: 4,
    core: MultiViewsDumbPlayer_1.MultiViewsDumbPlayerCore.MEDIA_SOURCE_EXTENSION,
    // host: 'https://mv.moonshine.tw/stream/'
    // styles: {
    //   playback: {borderRadius: '32px', margin: '16px'}
    // },
    // colors: {
    //   highlight: 'yellow',
    //   main: 'red',
    //   sub: 'blue',
    //   base: 'green'
    // }
};
root.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'mainframe' }, { children: [(0, jsx_runtime_1.jsx)("div", { className: 'top' }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'bottom' }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: 'content' }, { children: (0, jsx_runtime_1.jsx)(MultiViewsDumbPlayer_1.MultiViewsDumbPlayer, __assign({}, MultiViewsDumbPlayerSettings)) })), (0, jsx_runtime_1.jsx)("div", { className: 'chat' })] }))] })) }));
//# sourceMappingURL=index.js.map