"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("../../design-system");

var _referenceValue = _interopRequireDefault(require("./reference-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Show extends _react.default.PureComponent {
  render() {
    const {
      property,
      record
    } = this.props;
    return _react.default.createElement(_designSystem.FormGroup, null, _react.default.createElement(_designSystem.Label, null, property.label), _react.default.createElement(_referenceValue.default, {
      property: property,
      record: record
    }));
  }

}

exports.default = Show;