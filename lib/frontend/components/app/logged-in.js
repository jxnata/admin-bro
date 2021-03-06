"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("../design-system");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoggedIn = props => {
  const {
    session,
    paths
  } = props;
  const {
    translateButton
  } = (0, _hooks.useTranslation)();
  return _react.default.createElement(_designSystem.Box, {
    flexShrink: 0,
    py: "lg"
  }, _react.default.createElement(_designSystem.LoggedUser, {
    email: session.email,
    title: session.name,
    avatarUrl: session.image
  }, _react.default.createElement(_designSystem.DropDownItem, null, _react.default.createElement(_designSystem.Link, {
    href: paths.logoutPath
  }, translateButton('logout')))));
};

var _default = LoggedIn;
exports.default = _default;