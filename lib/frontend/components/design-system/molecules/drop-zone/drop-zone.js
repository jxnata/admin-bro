"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DropZone = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _label = require("../../atoms/label");

var _box = require("../../atoms/box");

var _text = require("../../atoms/text");

var _messageBox = require("../message-box");

var _dropZoneItem = require("./drop-zone-item");

var _humanFileSize = require("../../utils/human-file-size");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const validateContentType = (mimeTypes, mimeType) => {
  if (!mimeTypes || !mimeTypes.length) {
    return true;
  }

  return mimeTypes.includes(mimeType);
};

const validateSize = (maxSize, size) => {
  if (!maxSize) {
    return true;
  }

  if (!size) {
    return true;
  }

  return +maxSize >= +size;
};

const inUnit = (size, unit) => {
  if (!size) {
    return '';
  }

  return (0, _humanFileSize.humanFileSize)(size, unit);
};
/**
 * @memberof DropZone
 * @alias FileSizeUnit
 */


const UploadInput = _styledComponents.default.input.withConfig({
  displayName: "drop-zone__UploadInput",
  componentId: "sc-1c5k64f-0"
})(["font-size:100px;position:absolute;left:0;top:0;opacity:0;bottom:0;cursor:pointer;width:100%;"]);

const StyledDropZone = (0, _styledComponents.default)(_box.Box).withConfig({
  displayName: "drop-zone__StyledDropZone",
  componentId: "sc-1c5k64f-1"
})(["border:1px dashed ", ";position:relative;text-align:center;& ", "{color:", ";font-size:", ";padding-right:4px;letter-spacing:1px;}"], ({
  theme
}) => theme.colors.grey80, _label.Label, ({
  theme
}) => theme.colors.grey60, ({
  theme
}) => theme.fontSizes.xs);

/**
 * DropZone which can be used for uploading files.
 *
 * General usage:
 * ```javascript
 * import { DropZone, DropZoneProps } from 'admin-bro'
 * ```
 *
 * how to use it in your custom component.tsx (TypesScript):
 * ```
 * import React, { useState } from 'react'
 * import { DropZone, Label, BasePropertyProps } from 'admin-bro'
 * import { unflatten } from 'flat'
 *
 * const UploadPhoto: React.FC<BasePropertyProps> = (props) => {
 *   const { property, record, onChange } = props
 *
 *   const onUpload = (files: FileList) => {
 *     const newRecord = {...record}
 *     const file = files.length && files[0]
 *
 *     onChange({
 *       ...newRecord,
 *       params: {
 *         ...newRecord.params,
 *         [property.name]: file,
 *       }
 *     })
 *     event.preventDefault()
 *   }
 *
 *   return (
 *     <Box>
 *       <Label>{property.label}</Label>
 *       <DropZone onChange={onUpload} />
 *     </Box>
 *   )
 * }
 * ```
 *
 * @component
 * @subcategory Molecules
 *
 * @example <caption>Single file with validation</caption>
 * const maxSize = 1024 * 100
 * const mimeTypes = ['application/pdf']
 * const onUpload = (files) => { alert(files,length ? files[0].name : 'no files' ) }
 * return (
 * <Box>
 *   <DropZone
 *     onChange={onUpload}
 *     validate= { { maxSize, mimeTypes } }
 *   />
 * </Box>
 * )
 *
 * @example <caption>Multi file of photos</caption>
 * const mimeTypes = ['image/png']
 * const onUpload = (files) => { alert(files.length ? files.length : 'no files' ) }
 * return (
 * <Box>
 *   <DropZone
 *     multiple
 *     onChange={onUpload}
 *     validate= { { mimeTypes } }
 *   />
 * </Box>
 * )
 */
const DropZone = props => {
  const {
    validate,
    onChange,
    multiple,
    files: filesFromProps,
    uploadLimitIn,
    ...other
  } = props;
  const [isDragging, setIsDragging] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  const [filesToUpload, setFilesToUpload] = (0, _react.useState)(filesFromProps !== null && filesFromProps !== void 0 ? filesFromProps : []);
  (0, _react.useEffect)(() => {
    if (filesFromProps) {
      setFilesToUpload(filesFromProps);
    }
  }, [filesFromProps]);

  const onDragEnter = () => setIsDragging(true);

  const onDragLeave = () => setIsDragging(false);

  const onDragOver = () => setIsDragging(true);

  const removeItem = (0, _react.useCallback)(index => {
    const newItems = [...filesToUpload];
    newItems.splice(index, 1);

    if (onChange) {
      onChange(newItems);
    }

    setFilesToUpload(newItems);
  }, [filesToUpload, setFilesToUpload, onChange]);
  const onDrop = (0, _react.useCallback)(event => {
    event.preventDefault();
    setIsDragging(false);
    const {
      files
    } = event.dataTransfer || event.target;
    const validatedFiles = [];

    for (let i = 0; i < files.length; i += 1) {
      const file = files.item(i);

      if (!file) {
        return;
      }

      if (validate && !validateSize(validate.maxSize, file && file.size)) {
        setError({
          message: `File: ${file.name} size is too big`,
          title: 'Wrong Size'
        });
        return;
      }

      if (validate && !validateContentType(validate.mimeTypes, file.type)) {
        setError({
          message: `File: ${file.name} has unsupported type: ${file.type}`,
          title: 'Wrong Type'
        });
        return;
      }

      validatedFiles.push(file);
      setError(null);
    }

    let newFiles;

    if (!multiple && validatedFiles.length) {
      newFiles = [validatedFiles[0]];
    } else {
      newFiles = [...filesToUpload, ...validatedFiles];
    }

    if (onChange) {
      onChange(newFiles);
    }

    setFilesToUpload(newFiles);
  }, [onChange, setFilesToUpload, setIsDragging]);
  const displayUploadLimit = (0, _react.useCallback)(() => {
    if (validate && validate.maxSize) {
      return inUnit(validate.maxSize, uploadLimitIn);
    }

    return '';
  }, [validate]);
  return _react.default.createElement(_box.Box, null, _react.default.createElement(StyledDropZone, _extends({
    onDragEnter: onDragEnter,
    onDragOver: onDragOver,
    onDragLeave: onDragLeave,
    onDrop: onDrop
  }, other, {
    p: "xl"
  }), _react.default.createElement(UploadInput, {
    type: "file",
    onChange: event => onDrop(event),
    multiple: multiple
  }), _react.default.createElement(_box.Box, null, _react.default.createElement(_text.Text, {
    fontSize: "sm"
  }, "Pick or Drop File here to upload it."), _react.default.createElement(_box.Box, null, validate && validate.maxSize ? _react.default.createElement(_text.Text, {
    variant: "xs",
    color: "grey60",
    lineHeight: "default",
    mt: "sm"
  }, _react.default.createElement(_label.Label, {
    inline: true,
    uppercase: true
  }, "Max size:"), displayUploadLimit()) : '', validate && validate.mimeTypes && validate.mimeTypes.length ? _react.default.createElement(_text.Text, {
    variant: "xs",
    color: "grey60",
    lineHeight: "default",
    mt: "sm"
  }, validate.mimeTypes.join(', ')) : ''))), error ? _react.default.createElement(_messageBox.MessageBox, {
    mt: "default",
    variant: "danger",
    size: "sm",
    icon: "Warning",
    message: error.title,
    onCloseClick: () => setError(null)
  }, error.message) : '', filesToUpload.map((file, index) => // eslint-disable-next-line react/no-array-index-key
  _react.default.createElement(_dropZoneItem.DropZoneItem, {
    file: file,
    key: index,
    onRemove: () => removeItem(index)
  })));
};

exports.DropZone = DropZone;
var _default = DropZone;
exports.default = _default;