"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DatePicker = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _iconsReact = require("@carbon/icons-react");

var _datepicker = _interopRequireDefault(require("../utils/datepicker.styles"));

var _input = require("../atoms/input");

var _button = require("../atoms/button");

var _formGroup = require("./form-group");

var _cssClass = require("../utils/css-class");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const StyledDatePicker = (0, _styledComponents.default)(_formGroup.InputGroup).withConfig({
  displayName: "date-picker__StyledDatePicker",
  componentId: "sc-1vgx0t3-0"
})(["", ";position:relative;&.active ", ",&.active ", "{z-index:101;}& .react-datepicker{border-radius:0;border:1px solid ", ";padding:", ";font-family:", ";z-index:101;}& .react-datepicker__navigation--next{border-left-color:", ";}& .react-datepicker__navigation--next:hover{border-left-color:", ";}& .react-datepicker__navigation--previous{border-right-color:", ";}& .react-datepicker__navigation--previous:hover{border-right-color:", ";}& .react-datepicker__navigation{outline:none;top:16px;}& .react-datepicker__header{background:", ";font-size:", ";border:none;}& .react-datepicker__current-month{font-weight:normal;padding-bottom:", ";}& .react-datepicker__month{margin-top:0;}& .react-datepicker__day-name{color:", ";}& .react-datepicker__day--outside-month{color:", ";}& .react-datepicker__day--today{color:", ";}& .react-datepicker__day:hover,& .react-datepicker__day{border-radius:15px;}& .react-datepicker__day--selected{background:", ";border-radius:15px;color:", ";}"], _datepicker.default, _input.Input, _button.Button, ({
  theme
}) => theme.colors.primary100, ({
  theme
}) => theme.space.default, ({
  theme
}) => theme.font, ({
  theme
}) => theme.colors.primary60, ({
  theme
}) => theme.colors.primary100, ({
  theme
}) => theme.colors.primary60, ({
  theme
}) => theme.colors.primary100, ({
  theme
}) => theme.colors.white, ({
  theme
}) => theme.fontSizes.default, ({
  theme
}) => theme.space.lg, ({
  theme
}) => theme.colors.primary60, ({
  theme
}) => theme.colors.grey40, ({
  theme
}) => theme.colors.primary100, ({
  theme
}) => theme.colors.primary100, ({
  theme
}) => theme.colors.white);

const Overlay = _styledComponents.default.div.withConfig({
  displayName: "date-picker__Overlay",
  componentId: "sc-1vgx0t3-1"
})(["opacity:0;background:#ccc;position:fixed;top:0;left:0;bottom:0;right:0;z-index:100;&.hidden{display:none;}"]);

const DatePickerWrapper = _styledComponents.default.div.withConfig({
  displayName: "date-picker__DatePickerWrapper",
  componentId: "sc-1vgx0t3-2"
})(["position:absolute;right:0;top:", ";"], ({
  theme
}) => theme.space.xxl);
/**
 * Props for DatePicker
 * @memberof DatePicker
 * @alias DatePickerProps
 */


const pad = n => n < 10 ? `0${n.toString()}` : n.toString();

const format = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
/**
 * Component responsible for showing dates. It is a wrapper to
 * [react datepicker]{@link https://reactdatepicker.com/}.
 *
 * @component
 * @subcategory Molecules
 * @see https://reactdatepicker.com/
 *
 * @example
 * return (
 * <Box width={1/2} height="300px">
 *   <DatePicker onChange={(date) => console.log(date)}/>
 * </Box>
 * )
 */


const DatePicker = props => {
  const {
    value,
    onChange,
    ...other
  } = props;
  const [hidden, setHidden] = (0, _react.useState)(true);
  let dateValue;
  let stringValue = value && value.toString();

  if (value && value.constructor.name !== 'Date') {
    const dateNum = Date.parse(value) || undefined;

    if (dateNum) {
      dateValue = new Date(dateNum);
    }
  } else if (value && value.constructor.name === 'Date') {
    stringValue = format(value);
  }

  const onDatePickerChange = date => {
    onChange(format(date));
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(Overlay, {
    onClick: () => setHidden(true),
    className: hidden ? 'hidden' : 'visible'
  }), _react.default.createElement(StyledDatePicker, {
    className: (0, _cssClass.cssClass)('DatePicker', hidden ? 'normal' : 'active')
  }, _react.default.createElement(_input.Input, {
    value: stringValue || '',
    onChange: event => onChange(event.target.value),
    onFocus: () => setHidden(false)
  }), _react.default.createElement(_button.Button, {
    variant: "primary",
    type: "button",
    size: "icon",
    onClick: () => setHidden(!hidden)
  }, _react.default.createElement(_iconsReact.Calendar16, null)), !hidden ? _react.default.createElement(DatePickerWrapper, null, _react.default.createElement(_reactDatepicker.default, _extends({
    selected: dateValue,
    onChange: onDatePickerChange,
    inline: true
  }, other, {
    locale: "pt-BR",
    showYearDropdown: true,
    dropdownMode: "select"
  }))) : ''));
};

exports.DatePicker = DatePicker;
var _default = DatePicker;
exports.default = _default;