import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  require_prop_types
} from "./chunk-2WDQDCDP.js";
import {
  AsYouType,
  Metadata,
  formatIncompletePhoneNumber,
  getCountries,
  getCountryCallingCode,
  isPossiblePhoneNumber2 as isPossiblePhoneNumber,
  isSupportedCountry,
  isValidPhoneNumber,
  metadata_min_json_default,
  parseIncompletePhoneNumber,
  parsePhoneNumber,
  parsePhoneNumberCharacter
} from "./chunk-24B4F6AT.js";
import {
  __commonJS,
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports, module) {
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      function classNames5() {
        var classes = "";
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg) {
            classes = appendClass(classes, parseValue(arg));
          }
        }
        return classes;
      }
      function parseValue(arg) {
        if (typeof arg === "string" || typeof arg === "number") {
          return arg;
        }
        if (typeof arg !== "object") {
          return "";
        }
        if (Array.isArray(arg)) {
          return classNames5.apply(null, arg);
        }
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
          return arg.toString();
        }
        var classes = "";
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes = appendClass(classes, key);
          }
        }
        return classes;
      }
      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }
        if (value) {
          return value + " " + newClass;
        }
        return value + newClass;
      }
      if (typeof module !== "undefined" && module.exports) {
        classNames5.default = classNames5;
        module.exports = classNames5;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames5;
        });
      } else {
        window.classNames = classNames5;
      }
    })();
  }
});

// node_modules/react-phone-number-input/modules/PhoneInputWithCountry.js
var import_react12 = __toESM(require_react(), 1);
var import_prop_types9 = __toESM(require_prop_types(), 1);
var import_classnames4 = __toESM(require_classnames(), 1);

// node_modules/react-phone-number-input/modules/InputSmart.js
var import_react4 = __toESM(require_react(), 1);
var import_prop_types2 = __toESM(require_prop_types(), 1);

// node_modules/input-format/modules/react/Input.js
var import_react2 = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/input-format/modules/react/useInput.js
var import_react = __toESM(require_react(), 1);

// node_modules/input-format/modules/edit.js
function edit(value, caret, operation) {
  switch (operation) {
    case "Backspace":
      if (caret > 0) {
        value = value.slice(0, caret - 1) + value.slice(caret);
        caret--;
      }
      break;
    case "Delete":
      value = value.slice(0, caret) + value.slice(caret + 1);
      break;
  }
  return {
    value,
    caret
  };
}

// node_modules/input-format/modules/parse.js
function parse(text, caret_position, parse_character) {
  var context = {};
  var value = "";
  var focused_input_character_index = 0;
  var index = 0;
  while (index < text.length) {
    var character = parse_character(text[index], value, context);
    if (character !== void 0) {
      value += character;
      if (caret_position !== void 0) {
        if (caret_position === index) {
          focused_input_character_index = value.length - 1;
        } else if (caret_position > index) {
          focused_input_character_index = value.length;
        }
      }
    }
    index++;
  }
  if (caret_position === void 0) {
    focused_input_character_index = value.length;
  }
  var result = {
    value,
    caret: focused_input_character_index
  };
  return result;
}

// node_modules/input-format/modules/helpers.js
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function count_occurences(symbol, string) {
  var count = 0;
  for (var _iterator = _createForOfIteratorHelperLoose(string.split("")), _step; !(_step = _iterator()).done; ) {
    var character = _step.value;
    if (character === symbol) {
      count++;
    }
  }
  return count;
}

// node_modules/input-format/modules/closeBraces.js
function closeBraces(retained_template, template) {
  var placeholder = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "x";
  var empty_placeholder = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : " ";
  var cut_before = retained_template.length;
  var opening_braces = count_occurences("(", retained_template);
  var closing_braces = count_occurences(")", retained_template);
  var dangling_braces = opening_braces - closing_braces;
  while (dangling_braces > 0 && cut_before < template.length) {
    retained_template += template[cut_before].replace(placeholder, empty_placeholder);
    if (template[cut_before] === ")") {
      dangling_braces--;
    }
    cut_before++;
  }
  return retained_template;
}

// node_modules/input-format/modules/templateFormatter.js
function _createForOfIteratorHelperLoose2(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray2(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray2(o, minLen);
}
function _arrayLikeToArray2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function templateFormatter_default(template) {
  var placeholder = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "x";
  var shouldCloseBraces = arguments.length > 2 ? arguments[2] : void 0;
  if (!template) {
    return function(value) {
      return {
        text: value
      };
    };
  }
  var placeholdersCountInTemplate = count_occurences(placeholder, template);
  return function(value) {
    if (!value) {
      return {
        text: "",
        template
      };
    }
    var characterIndexInValue = 0;
    var templateWithFilledInPlaceholders = "";
    for (var _iterator = _createForOfIteratorHelperLoose2(template.split("")), _step; !(_step = _iterator()).done; ) {
      var character = _step.value;
      if (character !== placeholder) {
        templateWithFilledInPlaceholders += character;
        continue;
      }
      templateWithFilledInPlaceholders += value[characterIndexInValue];
      characterIndexInValue++;
      if (characterIndexInValue === value.length) {
        if (value.length < placeholdersCountInTemplate) {
          break;
        }
      }
    }
    if (shouldCloseBraces) {
      templateWithFilledInPlaceholders = closeBraces(templateWithFilledInPlaceholders, template);
    }
    return {
      text: templateWithFilledInPlaceholders,
      template
    };
  };
}

// node_modules/input-format/modules/format.js
function format(value, caret, formatter) {
  if (typeof formatter === "string") {
    formatter = templateFormatter_default(formatter);
  }
  var _ref = formatter(value) || {}, text = _ref.text, template = _ref.template;
  if (text === void 0) {
    text = value;
  }
  if (template) {
    if (caret === void 0) {
      caret = text.length;
    } else {
      var index = 0;
      var found = false;
      var possibly_last_input_character_index = -1;
      while (index < text.length && index < template.length) {
        if (text[index] !== template[index]) {
          if (caret === 0) {
            found = true;
            caret = index;
            break;
          }
          possibly_last_input_character_index = index;
          caret--;
        }
        index++;
      }
      if (!found) {
        caret = possibly_last_input_character_index + 1;
      }
    }
  }
  return {
    text,
    caret
  };
}

// node_modules/input-format/modules/dom.js
function isReadOnly(element) {
  return element.hasAttribute("readonly");
}
function getSelection(element) {
  if (element.selectionStart === element.selectionEnd) {
    return;
  }
  return {
    start: element.selectionStart,
    end: element.selectionEnd
  };
}
var Keys = {
  Backspace: 8,
  Delete: 46
};
function getOperation(event) {
  switch (event.keyCode) {
    case Keys.Backspace:
      return "Backspace";
    case Keys.Delete:
      return "Delete";
  }
}
function getCaretPosition(element) {
  return element.selectionStart;
}
function setCaretPosition(element, caret_position) {
  if (caret_position === void 0) {
    return;
  }
  if (isAndroid()) {
    setTimeout(function() {
      return element.setSelectionRange(caret_position, caret_position);
    }, 0);
  } else {
    element.setSelectionRange(caret_position, caret_position);
  }
}
function isAndroid() {
  if (typeof navigator !== "undefined") {
    return ANDROID_USER_AGENT_REG_EXP.test(navigator.userAgent);
  }
}
var ANDROID_USER_AGENT_REG_EXP = /Android/i;

// node_modules/input-format/modules/inputControl.js
function onChange(event, input, _parse, _format, on_change) {
  formatInputText(input, _parse, _format, void 0, on_change);
}
function onKeyDown(event, input, _parse, _format, on_change) {
  if (isReadOnly(input)) {
    return;
  }
  var operation = getOperation(event);
  switch (operation) {
    case "Delete":
    case "Backspace":
      event.preventDefault();
      var selection = getSelection(input);
      if (selection) {
        eraseSelection(input, selection);
        return formatInputText(input, _parse, _format, void 0, on_change);
      }
      return formatInputText(input, _parse, _format, operation, on_change);
    default:
  }
}
function eraseSelection(input, selection) {
  var text = input.value;
  text = text.slice(0, selection.start) + text.slice(selection.end);
  input.value = text;
  setCaretPosition(input, selection.start);
}
function formatInputText(input, _parse, _format, operation, on_change) {
  var _parse2 = parse(input.value, getCaretPosition(input), _parse), value = _parse2.value, caret = _parse2.caret;
  if (operation) {
    var newValueAndCaret = edit(value, caret, operation);
    value = newValueAndCaret.value;
    caret = newValueAndCaret.caret;
  }
  var formatted = format(value, caret, _format);
  var text = formatted.text;
  caret = formatted.caret;
  input.value = text;
  setCaretPosition(input, caret);
  if (on_change) {
    on_change(value);
  }
}

// node_modules/input-format/modules/react/useInput.js
var _excluded = ["ref", "parse", "format", "value", "defaultValue", "controlled", "onChange", "onKeyDown"];
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function useInput(_ref) {
  var ref = _ref.ref, parse2 = _ref.parse, format3 = _ref.format, value = _ref.value, defaultValue = _ref.defaultValue, _ref$controlled = _ref.controlled, controlled = _ref$controlled === void 0 ? true : _ref$controlled, onChange2 = _ref.onChange, onKeyDown2 = _ref.onKeyDown, rest = _objectWithoutProperties(_ref, _excluded);
  var internalRef = (0, import_react.useRef)();
  var setRef = (0, import_react.useCallback)(function(instance) {
    internalRef.current = instance;
    if (ref) {
      if (typeof ref === "function") {
        ref(instance);
      } else {
        ref.current = instance;
      }
    }
  }, [ref]);
  var _onChange = (0, import_react.useCallback)(function(event) {
    return onChange(event, internalRef.current, parse2, format3, onChange2);
  }, [internalRef, parse2, format3, onChange2]);
  var _onKeyDown = (0, import_react.useCallback)(function(event) {
    if (onKeyDown2) {
      onKeyDown2(event);
    }
    if (event.defaultPrevented) {
      return;
    }
    return onKeyDown(event, internalRef.current, parse2, format3, onChange2);
  }, [internalRef, parse2, format3, onChange2, onKeyDown2]);
  var commonProps = _objectSpread(_objectSpread({}, rest), {}, {
    ref: setRef,
    onChange: _onChange,
    onKeyDown: _onKeyDown
  });
  if (controlled) {
    return _objectSpread(_objectSpread({}, commonProps), {}, {
      value: format3(isEmptyValue(value) ? "" : value).text
    });
  }
  return _objectSpread(_objectSpread({}, commonProps), {}, {
    defaultValue: format3(isEmptyValue(defaultValue) ? "" : defaultValue).text
  });
}
function isEmptyValue(value) {
  return value === void 0 || value === null;
}

// node_modules/input-format/modules/react/Input.js
var _excluded2 = ["inputComponent", "parse", "format", "value", "defaultValue", "onChange", "controlled", "onKeyDown", "type"];
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
      _defineProperty2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties2(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose2(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose2(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Input(_ref, ref) {
  var _ref$inputComponent = _ref.inputComponent, InputComponent = _ref$inputComponent === void 0 ? "input" : _ref$inputComponent, parse2 = _ref.parse, format3 = _ref.format, value = _ref.value, defaultValue = _ref.defaultValue, onChange2 = _ref.onChange, controlled = _ref.controlled, onKeyDown2 = _ref.onKeyDown, _ref$type = _ref.type, type = _ref$type === void 0 ? "text" : _ref$type, rest = _objectWithoutProperties2(_ref, _excluded2);
  var inputProps = useInput(_objectSpread2({
    ref,
    parse: parse2,
    format: format3,
    value,
    defaultValue,
    onChange: onChange2,
    controlled,
    onKeyDown: onKeyDown2,
    type
  }, rest));
  return import_react2.default.createElement(InputComponent, inputProps);
}
Input = import_react2.default.forwardRef(Input);
Input.propTypes = {
  // Parses a single characher of `<input/>` text.
  parse: import_prop_types.default.func.isRequired,
  // Formats `value` into `<input/>` text.
  format: import_prop_types.default.func.isRequired,
  // Renders `<input/>` by default.
  inputComponent: import_prop_types.default.elementType,
  // `<input/>` `type` attribute.
  type: import_prop_types.default.string,
  // Is parsed from <input/> text.
  value: import_prop_types.default.string,
  // An initial value for an "uncontrolled" <input/>.
  defaultValue: import_prop_types.default.string,
  // This handler is called each time `<input/>` text is changed.
  onChange: import_prop_types.default.func,
  // Whether this input should be "controlled" or "uncontrolled".
  // The default value is `true` meaning "uncontrolled".
  controlled: import_prop_types.default.bool,
  // Passthrough
  onKeyDown: import_prop_types.default.func,
  onCut: import_prop_types.default.func,
  onPaste: import_prop_types.default.func
};
var Input_default = Input;

// node_modules/react-phone-number-input/modules/helpers/inputValuePrefix.js
function getPrefixForFormattingValueAsPhoneNumber(_ref) {
  var inputFormat = _ref.inputFormat, country = _ref.country, metadata2 = _ref.metadata;
  return inputFormat === "NATIONAL_PART_OF_INTERNATIONAL" ? "+".concat(getCountryCallingCode(country, metadata2)) : "";
}
function removePrefixFromFormattedPhoneNumber(value, prefix) {
  if (prefix) {
    value = value.slice(prefix.length);
    if (value[0] === " ") {
      value = value.slice(1);
    }
  }
  return value;
}

// node_modules/react-phone-number-input/modules/helpers/parsePhoneNumberCharacter.js
function parsePhoneNumberCharacter_(character, prevParsedCharacters, context) {
  if (context && context.ignoreRest) {
    return;
  }
  var emitEvent = function emitEvent2(eventName) {
    if (context) {
      switch (eventName) {
        case "end":
          context.ignoreRest = true;
          break;
      }
    }
  };
  return parsePhoneNumberCharacter(character, prevParsedCharacters, emitEvent);
}

// node_modules/react-phone-number-input/modules/useInputKeyDownHandler.js
var import_react3 = __toESM(require_react(), 1);
function useInputKeyDownHandler(_ref) {
  var onKeyDown2 = _ref.onKeyDown, inputFormat = _ref.inputFormat;
  return (0, import_react3.useCallback)(function(event) {
    if (event.keyCode === BACKSPACE_KEY_CODE && inputFormat === "INTERNATIONAL") {
      if (event.target instanceof HTMLInputElement) {
        if (getCaretPosition2(event.target) === LEADING_PLUS.length) {
          event.preventDefault();
          return;
        }
      }
    }
    if (onKeyDown2) {
      onKeyDown2(event);
    }
  }, [onKeyDown2, inputFormat]);
}
function getCaretPosition2(element) {
  return element.selectionStart;
}
var BACKSPACE_KEY_CODE = 8;
var LEADING_PLUS = "+";

// node_modules/react-phone-number-input/modules/InputSmart.js
var _excluded3 = ["onKeyDown", "country", "inputFormat", "metadata", "international", "withCountryCallingCode"];
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutProperties3(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose3(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose3(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function createInput(defaultMetadata) {
  function InputSmart(_ref, ref) {
    var onKeyDown2 = _ref.onKeyDown, country = _ref.country, inputFormat = _ref.inputFormat, _ref$metadata = _ref.metadata, metadata2 = _ref$metadata === void 0 ? defaultMetadata : _ref$metadata, international = _ref.international, withCountryCallingCode = _ref.withCountryCallingCode, rest = _objectWithoutProperties3(_ref, _excluded3);
    var format3 = (0, import_react4.useCallback)(function(value) {
      var formatter = new AsYouType(country, metadata2);
      var prefix = getPrefixForFormattingValueAsPhoneNumber({
        inputFormat,
        country,
        metadata: metadata2
      });
      var text = formatter.input(prefix + value);
      var template = formatter.getTemplate();
      if (prefix) {
        text = removePrefixFromFormattedPhoneNumber(text, prefix);
        if (template) {
          template = removePrefixFromFormattedPhoneNumber(template, prefix);
        }
      }
      return {
        text,
        template
      };
    }, [country, metadata2]);
    var _onKeyDown = useInputKeyDownHandler({
      onKeyDown: onKeyDown2,
      inputFormat
    });
    return import_react4.default.createElement(Input_default, _extends({}, rest, {
      ref,
      parse: parsePhoneNumberCharacter_,
      format: format3,
      onKeyDown: _onKeyDown
    }));
  }
  InputSmart = import_react4.default.forwardRef(InputSmart);
  InputSmart.propTypes = {
    /**
     * The parsed phone number.
     * "Parsed" not in a sense of "E.164"
     * but rather in a sense of "having only
     * digits and possibly a leading plus character".
     * Examples: `""`, `"+"`, `"+123"`, `"123"`.
     */
    value: import_prop_types2.default.string.isRequired,
    /**
     * A function of `value: string`.
     * Updates the `value` property.
     */
    onChange: import_prop_types2.default.func.isRequired,
    /**
     * A function of `event: Event`.
     * Handles `keydown` events.
     */
    onKeyDown: import_prop_types2.default.func,
    /**
     * A two-letter country code for formatting `value`
     * as a national phone number (e.g. `(800) 555 35 35`).
     * E.g. "US", "RU", etc.
     * If no `country` is passed then `value`
     * is formatted as an international phone number.
     * (e.g. `+7 800 555 35 35`)
     * This property should've been called `defaultCountry`
     * because it only applies when the user inputs a phone number in a national format
     * and is completely ignored when the user inputs a phone number in an international format.
     */
    country: import_prop_types2.default.string,
    /**
     * The format that the input field value is being input/output in.
     */
    inputFormat: import_prop_types2.default.oneOf(["INTERNATIONAL", "NATIONAL_PART_OF_INTERNATIONAL", "NATIONAL", "INTERNATIONAL_OR_NATIONAL"]).isRequired,
    /**
     * `libphonenumber-js` metadata.
     */
    metadata: import_prop_types2.default.object
  };
  return InputSmart;
}
var InputSmart_default = createInput();

// node_modules/react-phone-number-input/modules/InputBasic.js
var import_react6 = __toESM(require_react(), 1);
var import_prop_types3 = __toESM(require_prop_types(), 1);
var _excluded4 = ["value", "onChange", "onKeyDown", "country", "inputFormat", "metadata", "inputComponent", "international", "withCountryCallingCode"];
function _extends2() {
  _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
function _objectWithoutProperties4(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose4(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose4(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function createInput2(defaultMetadata) {
  function InputBasic(_ref, ref) {
    var value = _ref.value, onChange2 = _ref.onChange, onKeyDown2 = _ref.onKeyDown, country = _ref.country, inputFormat = _ref.inputFormat, _ref$metadata = _ref.metadata, metadata2 = _ref$metadata === void 0 ? defaultMetadata : _ref$metadata, _ref$inputComponent = _ref.inputComponent, Input2 = _ref$inputComponent === void 0 ? "input" : _ref$inputComponent, international = _ref.international, withCountryCallingCode = _ref.withCountryCallingCode, rest = _objectWithoutProperties4(_ref, _excluded4);
    var prefix = getPrefixForFormattingValueAsPhoneNumber({
      inputFormat,
      country,
      metadata: metadata2
    });
    var _onChange = (0, import_react6.useCallback)(function(event) {
      var newValue = parseIncompletePhoneNumber(event.target.value);
      if (newValue === value) {
        var newValueFormatted = format2(prefix, newValue, country, metadata2);
        if (newValueFormatted.indexOf(event.target.value) === 0) {
          newValue = newValue.slice(0, -1);
        }
      }
      onChange2(newValue);
    }, [prefix, value, onChange2, country, metadata2]);
    var _onKeyDown = useInputKeyDownHandler({
      onKeyDown: onKeyDown2,
      inputFormat
    });
    return import_react6.default.createElement(Input2, _extends2({}, rest, {
      ref,
      value: format2(prefix, value, country, metadata2),
      onChange: _onChange,
      onKeyDown: _onKeyDown
    }));
  }
  InputBasic = import_react6.default.forwardRef(InputBasic);
  InputBasic.propTypes = {
    /**
     * The parsed phone number.
     * "Parsed" not in a sense of "E.164"
     * but rather in a sense of "having only
     * digits and possibly a leading plus character".
     * Examples: `""`, `"+"`, `"+123"`, `"123"`.
     */
    value: import_prop_types3.default.string.isRequired,
    /**
     * A function of `value: string`.
     * Updates the `value` property.
     */
    onChange: import_prop_types3.default.func.isRequired,
    /**
     * A function of `event: Event`.
     * Handles `keydown` events.
     */
    onKeyDown: import_prop_types3.default.func,
    /**
     * A two-letter country code for formatting `value`
     * as a national phone number (e.g. `(800) 555 35 35`).
     * E.g. "US", "RU", etc.
     * If no `country` is passed then `value`
     * is formatted as an international phone number.
     * (e.g. `+7 800 555 35 35`)
     * This property should've been called `defaultCountry`
     * because it only applies when the user inputs a phone number in a national format
     * and is completely ignored when the user inputs a phone number in an international format.
     */
    country: import_prop_types3.default.string,
    /**
     * The format that the input field value is being input/output in.
     */
    inputFormat: import_prop_types3.default.oneOf(["INTERNATIONAL", "NATIONAL_PART_OF_INTERNATIONAL", "NATIONAL", "INTERNATIONAL_OR_NATIONAL"]).isRequired,
    /**
     * `libphonenumber-js` metadata.
     */
    metadata: import_prop_types3.default.object,
    /**
     * The `<input/>` component.
     */
    inputComponent: import_prop_types3.default.elementType
  };
  return InputBasic;
}
var InputBasic_default = createInput2();
function format2(prefix, value, country, metadata2) {
  return removePrefixFromFormattedPhoneNumber(formatIncompletePhoneNumber(prefix + value, country, metadata2), prefix);
}

// node_modules/react-phone-number-input/modules/CountrySelect.js
var import_react7 = __toESM(require_react(), 1);
var import_prop_types4 = __toESM(require_prop_types(), 1);
var import_classnames = __toESM(require_classnames(), 1);

// node_modules/country-flag-icons/modules/unicode.js
function getCountryFlag(country) {
  return getRegionalIndicatorSymbol(country[0]) + getRegionalIndicatorSymbol(country[1]);
}
function getRegionalIndicatorSymbol(letter) {
  return String.fromCodePoint(127462 - 65 + letter.toUpperCase().charCodeAt(0));
}

// node_modules/react-phone-number-input/modules/CountrySelect.js
var _excluded5 = ["value", "onChange", "options", "disabled", "readOnly"];
var _excluded22 = ["value", "options", "className", "iconComponent", "getIconAspectRatio", "arrowComponent", "unicodeFlags"];
function _createForOfIteratorHelperLoose3(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray3(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray3(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray3(o, minLen);
}
function _arrayLikeToArray3(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _extends3() {
  _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends3.apply(this, arguments);
}
function _objectWithoutProperties5(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose5(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose5(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function CountrySelect(_ref) {
  var value = _ref.value, onChange2 = _ref.onChange, options = _ref.options, disabled = _ref.disabled, readOnly = _ref.readOnly, rest = _objectWithoutProperties5(_ref, _excluded5);
  var onChange_ = (0, import_react7.useCallback)(function(event) {
    var value2 = event.target.value;
    onChange2(value2 === "ZZ" ? void 0 : value2);
  }, [onChange2]);
  var selectedOption = (0, import_react7.useMemo)(function() {
    return getSelectedOption(options, value);
  }, [options, value]);
  return import_react7.default.createElement("select", _extends3({}, rest, {
    disabled: disabled || readOnly,
    readOnly,
    value: value || "ZZ",
    onChange: onChange_
  }), options.map(function(_ref2) {
    var value2 = _ref2.value, label = _ref2.label, divider = _ref2.divider;
    return import_react7.default.createElement("option", {
      key: divider ? "|" : value2 || "ZZ",
      value: divider ? "|" : value2 || "ZZ",
      disabled: divider ? true : false,
      style: divider ? DIVIDER_STYLE : void 0
    }, label);
  }));
}
CountrySelect.propTypes = {
  /**
   * A two-letter country code.
   * Example: "US", "RU", etc.
   */
  value: import_prop_types4.default.string,
  /**
   * A function of `value: string`.
   * Updates the `value` property.
   */
  onChange: import_prop_types4.default.func.isRequired,
  // `<select/>` options.
  options: import_prop_types4.default.arrayOf(import_prop_types4.default.shape({
    value: import_prop_types4.default.string,
    label: import_prop_types4.default.string,
    divider: import_prop_types4.default.bool
  })).isRequired,
  // `readonly` attribute doesn't work on a `<select/>`.
  // https://github.com/catamphetamine/react-phone-number-input/issues/419#issuecomment-1764384480
  // https://www.delftstack.com/howto/html/html-select-readonly/
  // To work around that, if `readOnly: true` property is passed
  // to this component, it behaves analogous to `disabled: true`.
  disabled: import_prop_types4.default.bool,
  readOnly: import_prop_types4.default.bool
};
var DIVIDER_STYLE = {
  fontSize: "1px",
  backgroundColor: "currentColor",
  color: "inherit"
};
function CountrySelectWithIcon(_ref3) {
  var value = _ref3.value, options = _ref3.options, className = _ref3.className, Icon = _ref3.iconComponent, getIconAspectRatio = _ref3.getIconAspectRatio, _ref3$arrowComponent = _ref3.arrowComponent, Arrow = _ref3$arrowComponent === void 0 ? DefaultArrowComponent : _ref3$arrowComponent, unicodeFlags = _ref3.unicodeFlags, rest = _objectWithoutProperties5(_ref3, _excluded22);
  var selectedOption = (0, import_react7.useMemo)(function() {
    return getSelectedOption(options, value);
  }, [options, value]);
  return import_react7.default.createElement("div", {
    className: "PhoneInputCountry"
  }, import_react7.default.createElement(CountrySelect, _extends3({}, rest, {
    value,
    options,
    className: (0, import_classnames.default)("PhoneInputCountrySelect", className)
  })), selectedOption && (unicodeFlags && value ? import_react7.default.createElement("div", {
    className: "PhoneInputCountryIconUnicode"
  }, getCountryFlag(value)) : import_react7.default.createElement(Icon, {
    "aria-hidden": true,
    country: value,
    label: selectedOption.label,
    aspectRatio: unicodeFlags ? 1 : void 0
  })), import_react7.default.createElement(Arrow, null));
}
CountrySelectWithIcon.propTypes = {
  // Country flag component.
  iconComponent: import_prop_types4.default.elementType,
  // Select arrow component.
  arrowComponent: import_prop_types4.default.elementType,
  // Set to `true` to render Unicode flag icons instead of SVG images.
  unicodeFlags: import_prop_types4.default.bool
};
function DefaultArrowComponent() {
  return import_react7.default.createElement("div", {
    className: "PhoneInputCountrySelectArrow"
  });
}
function getSelectedOption(options, value) {
  for (var _iterator = _createForOfIteratorHelperLoose3(options), _step; !(_step = _iterator()).done; ) {
    var option = _step.value;
    if (!option.divider) {
      if (isSameOptionValue(option.value, value)) {
        return option;
      }
    }
  }
}
function isSameOptionValue(value1, value2) {
  if (value1 === void 0 || value1 === null) {
    return value2 === void 0 || value2 === null;
  }
  return value1 === value2;
}

// node_modules/react-phone-number-input/modules/Flag.js
var import_react8 = __toESM(require_react(), 1);
var import_prop_types5 = __toESM(require_prop_types(), 1);
var import_classnames2 = __toESM(require_classnames(), 1);
var _excluded6 = ["country", "countryName", "flags", "flagUrl"];
function _extends4() {
  _extends4 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends4.apply(this, arguments);
}
function _objectWithoutProperties6(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose6(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose6(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function FlagComponent(_ref) {
  var country = _ref.country, countryName = _ref.countryName, flags = _ref.flags, flagUrl = _ref.flagUrl, rest = _objectWithoutProperties6(_ref, _excluded6);
  if (flags && flags[country]) {
    return flags[country]({
      title: countryName
    });
  }
  return import_react8.default.createElement("img", _extends4({}, rest, {
    alt: countryName,
    role: countryName ? void 0 : "presentation",
    src: flagUrl.replace("{XX}", country).replace("{xx}", country.toLowerCase())
  }));
}
FlagComponent.propTypes = {
  // The country to be selected by default.
  // Two-letter country code ("ISO 3166-1 alpha-2").
  country: import_prop_types5.default.string.isRequired,
  // Will be HTML `title` attribute of the `<img/>`.
  countryName: import_prop_types5.default.string.isRequired,
  // Country flag icon components.
  // By default flag icons are inserted as `<img/>`s
  // with their `src` pointed to `country-flag-icons` gitlab pages website.
  // There might be cases (e.g. an offline application)
  // where having a large (3 megabyte) `<svg/>` flags
  // bundle is more appropriate.
  // `import flags from 'react-phone-number-input/flags'`.
  flags: import_prop_types5.default.objectOf(import_prop_types5.default.elementType),
  // A URL for a country flag icon.
  // By default it points to `country-flag-icons` gitlab pages website.
  flagUrl: import_prop_types5.default.string.isRequired
};

// node_modules/react-phone-number-input/modules/InternationalIcon.js
var import_react9 = __toESM(require_react(), 1);
var import_prop_types6 = __toESM(require_prop_types(), 1);
var _excluded7 = ["aspectRatio"];
var _excluded23 = ["title"];
var _excluded32 = ["title"];
function _extends5() {
  _extends5 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends5.apply(this, arguments);
}
function _objectWithoutProperties7(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose7(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose7(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function InternationalIcon(_ref) {
  var aspectRatio = _ref.aspectRatio, rest = _objectWithoutProperties7(_ref, _excluded7);
  if (aspectRatio === 1) {
    return import_react9.default.createElement(InternationalIcon1x1, rest);
  } else {
    return import_react9.default.createElement(InternationalIcon3x2, rest);
  }
}
InternationalIcon.propTypes = {
  title: import_prop_types6.default.string.isRequired,
  aspectRatio: import_prop_types6.default.number
};
function InternationalIcon3x2(_ref2) {
  var title = _ref2.title, rest = _objectWithoutProperties7(_ref2, _excluded23);
  return import_react9.default.createElement("svg", _extends5({}, rest, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 75 50"
  }), import_react9.default.createElement("title", null, title), import_react9.default.createElement("g", {
    className: "PhoneInputInternationalIconGlobe",
    stroke: "currentColor",
    fill: "none",
    strokeWidth: "2",
    strokeMiterlimit: "10"
  }, import_react9.default.createElement("path", {
    strokeLinecap: "round",
    d: "M47.2,36.1C48.1,36,49,36,50,36c7.4,0,14,1.7,18.5,4.3"
  }), import_react9.default.createElement("path", {
    d: "M68.6,9.6C64.2,12.3,57.5,14,50,14c-7.4,0-14-1.7-18.5-4.3"
  }), import_react9.default.createElement("line", {
    x1: "26",
    y1: "25",
    x2: "74",
    y2: "25"
  }), import_react9.default.createElement("line", {
    x1: "50",
    y1: "1",
    x2: "50",
    y2: "49"
  }), import_react9.default.createElement("path", {
    strokeLinecap: "round",
    d: "M46.3,48.7c1.2,0.2,2.5,0.3,3.7,0.3c13.3,0,24-10.7,24-24S63.3,1,50,1S26,11.7,26,25c0,2,0.3,3.9,0.7,5.8"
  }), import_react9.default.createElement("path", {
    strokeLinecap: "round",
    d: "M46.8,48.2c1,0.6,2.1,0.8,3.2,0.8c6.6,0,12-10.7,12-24S56.6,1,50,1S38,11.7,38,25c0,1.4,0.1,2.7,0.2,4c0,0.1,0,0.2,0,0.2"
  })), import_react9.default.createElement("path", {
    className: "PhoneInputInternationalIconPhone",
    stroke: "none",
    fill: "currentColor",
    d: "M12.4,17.9c2.9-2.9,5.4-4.8,0.3-11.2S4.1,5.2,1.3,8.1C-2,11.4,1.1,23.5,13.1,35.6s24.3,15.2,27.5,11.9c2.8-2.8,7.8-6.3,1.4-11.5s-8.3-2.6-11.2,0.3c-2,2-7.2-2.2-11.7-6.7S10.4,19.9,12.4,17.9z"
  }));
}
InternationalIcon3x2.propTypes = {
  title: import_prop_types6.default.string.isRequired
};
function InternationalIcon1x1(_ref3) {
  var title = _ref3.title, rest = _objectWithoutProperties7(_ref3, _excluded32);
  return import_react9.default.createElement("svg", _extends5({}, rest, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 50 50"
  }), import_react9.default.createElement("title", null, title), import_react9.default.createElement("g", {
    className: "PhoneInputInternationalIconGlobe",
    stroke: "currentColor",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, import_react9.default.createElement("path", {
    d: "M8.45,13A21.44,21.44,0,1,1,37.08,41.56"
  }), import_react9.default.createElement("path", {
    d: "M19.36,35.47a36.9,36.9,0,0,1-2.28-13.24C17.08,10.39,21.88.85,27.8.85s10.72,9.54,10.72,21.38c0,6.48-1.44,12.28-3.71,16.21"
  }), import_react9.default.createElement("path", {
    d: "M17.41,33.4A39,39,0,0,1,27.8,32.06c6.62,0,12.55,1.5,16.48,3.86"
  }), import_react9.default.createElement("path", {
    d: "M44.29,8.53c-3.93,2.37-9.86,3.88-16.49,3.88S15.25,10.9,11.31,8.54"
  }), import_react9.default.createElement("line", {
    x1: "27.8",
    y1: "0.85",
    x2: "27.8",
    y2: "34.61"
  }), import_react9.default.createElement("line", {
    x1: "15.2",
    y1: "22.23",
    x2: "49.15",
    y2: "22.23"
  })), import_react9.default.createElement("path", {
    className: "PhoneInputInternationalIconPhone",
    stroke: "transparent",
    fill: "currentColor",
    d: "M9.42,26.64c2.22-2.22,4.15-3.59.22-8.49S3.08,17,.93,19.17c-2.49,2.48-.13,11.74,9,20.89s18.41,11.5,20.89,9c2.15-2.15,5.91-4.77,1-8.71s-6.27-2-8.49.22c-1.55,1.55-5.48-1.69-8.86-5.08S7.87,28.19,9.42,26.64Z"
  }));
}
InternationalIcon1x1.propTypes = {
  title: import_prop_types6.default.string.isRequired
};

// node_modules/react-phone-number-input/modules/helpers/isE164Number.js
function isE164Number(value) {
  if (value.length < 2) {
    return false;
  }
  if (value[0] !== "+") {
    return false;
  }
  var i = 1;
  while (i < value.length) {
    var character = value.charCodeAt(i);
    if (character >= 48 && character <= 57) {
    } else {
      return false;
    }
    i++;
  }
  return true;
}
function validateE164Number(value) {
  if (!isE164Number(value)) {
    console.error("[react-phone-number-input] Expected the initial `value` to be a E.164 phone number. Got", value);
  }
}

// node_modules/react-phone-number-input/modules/helpers/countries.js
function _createForOfIteratorHelperLoose4(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray4(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray4(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray4(o, minLen);
}
function _arrayLikeToArray4(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function sortCountryOptions(options, order) {
  if (!order) {
    return options;
  }
  var optionsOnTop = [];
  var optionsOnBottom = [];
  var appendTo = optionsOnTop;
  var _loop = function _loop2() {
    var element = _step.value;
    if (element === "|") {
      appendTo.push({
        divider: true
      });
    } else if (element === "..." || element === "…") {
      appendTo = optionsOnBottom;
    } else {
      var countryCode;
      if (element === "🌐") {
        countryCode = void 0;
      } else {
        countryCode = element;
      }
      var index = options.indexOf(options.filter(function(option2) {
        return option2.value === countryCode;
      })[0]);
      var option = options[index];
      options.splice(index, 1);
      appendTo.push(option);
    }
  };
  for (var _iterator = _createForOfIteratorHelperLoose4(order), _step; !(_step = _iterator()).done; ) {
    _loop();
  }
  return optionsOnTop.concat(options).concat(optionsOnBottom);
}
function getSupportedCountryOptions(countryOptions, metadata2) {
  if (countryOptions) {
    countryOptions = countryOptions.filter(function(option) {
      switch (option) {
        case "🌐":
        case "|":
        case "...":
        case "…":
          return true;
        default:
          return isCountrySupportedWithError(option, metadata2);
      }
    });
    if (countryOptions.length > 0) {
      return countryOptions;
    }
  }
}
function isCountrySupportedWithError(country, metadata2) {
  if (isSupportedCountry(country, metadata2)) {
    return true;
  } else {
    console.error("Country not found: ".concat(country));
    return false;
  }
}
function getSupportedCountries(countries, metadata2) {
  if (countries) {
    countries = countries.filter(function(country) {
      return isCountrySupportedWithError(country, metadata2);
    });
    if (countries.length === 0) {
      countries = void 0;
    }
  }
  return countries;
}

// node_modules/react-phone-number-input/modules/CountryIcon.js
var import_react10 = __toESM(require_react(), 1);
var import_prop_types7 = __toESM(require_prop_types(), 1);
var import_classnames3 = __toESM(require_classnames(), 1);
var _excluded8 = ["country", "label", "aspectRatio"];
function _extends6() {
  _extends6 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends6.apply(this, arguments);
}
function _objectWithoutProperties8(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose8(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose8(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function createCountryIconComponent(_ref) {
  var flags = _ref.flags, flagUrl = _ref.flagUrl, FlagComponent2 = _ref.flagComponent, InternationalIcon2 = _ref.internationalIcon;
  function CountryIcon(_ref2) {
    var country = _ref2.country, label = _ref2.label, aspectRatio = _ref2.aspectRatio, rest = _objectWithoutProperties8(_ref2, _excluded8);
    var _aspectRatio = InternationalIcon2 === InternationalIcon ? aspectRatio : void 0;
    return import_react10.default.createElement("div", _extends6({}, rest, {
      className: (0, import_classnames3.default)("PhoneInputCountryIcon", {
        "PhoneInputCountryIcon--square": _aspectRatio === 1,
        "PhoneInputCountryIcon--border": country
      })
    }), country ? import_react10.default.createElement(FlagComponent2, {
      country,
      countryName: label,
      flags,
      flagUrl,
      className: "PhoneInputCountryIconImg"
    }) : import_react10.default.createElement(InternationalIcon2, {
      title: label,
      aspectRatio: _aspectRatio,
      className: "PhoneInputCountryIconImg"
    }));
  }
  CountryIcon.propTypes = {
    country: import_prop_types7.default.string,
    label: import_prop_types7.default.string.isRequired,
    aspectRatio: import_prop_types7.default.number
  };
  return CountryIcon;
}
var CountryIcon_default = createCountryIconComponent({
  // Must be equal to `defaultProps.flagUrl` in `./PhoneInputWithCountry.js`.
  flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/{XX}.svg",
  flagComponent: FlagComponent,
  internationalIcon: InternationalIcon
});

// node_modules/react-phone-number-input/modules/useExternalRef.js
var import_react11 = __toESM(require_react(), 1);
function _createForOfIteratorHelperLoose5(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray5(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray5(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray5(o, minLen);
}
function _arrayLikeToArray5(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function setRefsValue(refs, value) {
  for (var _iterator = _createForOfIteratorHelperLoose5(refs), _step; !(_step = _iterator()).done; ) {
    var ref = _step.value;
    if (ref) {
      setRefValue(ref, value);
    }
  }
}
function setRefValue(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else {
    ref.current = value;
  }
}

// node_modules/react-phone-number-input/modules/PropTypes.js
var import_prop_types8 = __toESM(require_prop_types(), 1);
var metadata = import_prop_types8.default.shape({
  country_calling_codes: import_prop_types8.default.object.isRequired,
  countries: import_prop_types8.default.object.isRequired
});
var labels = import_prop_types8.default.objectOf(import_prop_types8.default.string);

// node_modules/react-phone-number-input/modules/helpers/getInternationalPhoneNumberPrefix.js
function getInternationalPhoneNumberPrefix(country, metadata2) {
  var prefix = "+" + getCountryCallingCode(country, metadata2);
  return prefix;
}

// node_modules/react-phone-number-input/modules/helpers/phoneInputHelpers.js
function getPreSelectedCountry(_ref) {
  var value = _ref.value, phoneNumber = _ref.phoneNumber, defaultCountry = _ref.defaultCountry, getAnyCountry = _ref.getAnyCountry, countries = _ref.countries, required = _ref.required, metadata2 = _ref.metadata;
  var country;
  if (phoneNumber && phoneNumber.country) {
    country = phoneNumber.country;
  } else if (defaultCountry) {
    if (!value || couldNumberBelongToCountry(value, defaultCountry, metadata2)) {
      country = defaultCountry;
    }
  }
  if (countries && countries.indexOf(country) < 0) {
    country = void 0;
  }
  if (!country && required && countries && countries.length > 0) {
    country = getAnyCountry();
  }
  return country;
}
function getCountrySelectOptions(_ref2) {
  var countries = _ref2.countries, countryNames = _ref2.countryNames, addInternationalOption = _ref2.addInternationalOption, compareStringsLocales = _ref2.compareStringsLocales, _compareStrings = _ref2.compareStrings;
  if (!_compareStrings) {
    _compareStrings = compareStrings;
  }
  var countrySelectOptions = countries.map(function(country) {
    return {
      value: country,
      // All `locale` country names included in this library
      // include all countries (this is checked at build time).
      // The only case when a country name might be missing
      // is when a developer supplies their own `labels` property.
      // To guard against such cases, a missing country name
      // is substituted by country code.
      label: countryNames[country] || country
    };
  });
  countrySelectOptions.sort(function(a, b) {
    return _compareStrings(a.label, b.label, compareStringsLocales);
  });
  if (addInternationalOption) {
    countrySelectOptions.unshift({
      label: countryNames.ZZ
    });
  }
  return countrySelectOptions;
}
function parsePhoneNumber2(value, metadata2) {
  return parsePhoneNumber(value || "", metadata2);
}
function generateNationalNumberDigits(phoneNumber) {
  return phoneNumber.formatNational().replace(/\D/g, "");
}
function getPhoneDigitsForNewCountry(phoneDigits, _ref3) {
  var prevCountry = _ref3.prevCountry, newCountry = _ref3.newCountry, metadata2 = _ref3.metadata, useNationalFormat = _ref3.useNationalFormat;
  if (prevCountry === newCountry) {
    return phoneDigits;
  }
  if (!phoneDigits) {
    if (useNationalFormat) {
      return "";
    } else {
      if (newCountry) {
        return getInternationalPhoneNumberPrefix(newCountry, metadata2);
      }
      return "";
    }
  }
  if (newCountry) {
    if (phoneDigits[0] === "+") {
      if (useNationalFormat) {
        if (phoneDigits.indexOf("+" + getCountryCallingCode(newCountry, metadata2)) === 0) {
          return stripCountryCallingCode(phoneDigits, newCountry, metadata2);
        }
        return "";
      }
      if (prevCountry) {
        var newCountryPrefix = getInternationalPhoneNumberPrefix(newCountry, metadata2);
        if (phoneDigits.indexOf(newCountryPrefix) === 0) {
          return phoneDigits;
        } else {
          return newCountryPrefix;
        }
      } else {
        var defaultValue = getInternationalPhoneNumberPrefix(newCountry, metadata2);
        if (phoneDigits.indexOf(defaultValue) === 0) {
          return phoneDigits;
        }
        return defaultValue;
      }
    }
  } else {
    if (phoneDigits[0] !== "+") {
      return e164(phoneDigits, prevCountry, metadata2) || "";
    }
  }
  return phoneDigits;
}
function e164(number, country, metadata2) {
  if (!number) {
    return;
  }
  if (number[0] === "+") {
    if (number === "+") {
      return;
    }
    var asYouType = new AsYouType(country, metadata2);
    asYouType.input(number);
    return asYouType.getNumberValue();
  }
  if (!country) {
    return;
  }
  var partial_national_significant_number = getNationalSignificantNumberDigits(number, country, metadata2);
  return "+".concat(getCountryCallingCode(country, metadata2)).concat(partial_national_significant_number || "");
}
function trimNumber(number, country, metadata2) {
  var nationalSignificantNumberPart = getNationalSignificantNumberDigits(number, country, metadata2);
  if (nationalSignificantNumberPart) {
    var overflowDigitsCount = nationalSignificantNumberPart.length - getMaxNumberLength(country, metadata2);
    if (overflowDigitsCount > 0) {
      return number.slice(0, number.length - overflowDigitsCount);
    }
  }
  return number;
}
function getMaxNumberLength(country, metadata2) {
  metadata2 = new Metadata(metadata2);
  metadata2.selectNumberingPlan(country);
  return metadata2.numberingPlan.possibleLengths()[metadata2.numberingPlan.possibleLengths().length - 1];
}
function getCountryForPartialE164Number(partialE164Number, _ref4) {
  var country = _ref4.country, countries = _ref4.countries, defaultCountry = _ref4.defaultCountry, latestCountrySelectedByUser = _ref4.latestCountrySelectedByUser, required = _ref4.required, metadata2 = _ref4.metadata;
  if (partialE164Number === "+") {
    return country;
  }
  var derived_country = getCountryFromPossiblyIncompleteInternationalPhoneNumber(partialE164Number, metadata2);
  if (derived_country) {
    if (!countries || countries.indexOf(derived_country) >= 0) {
      return derived_country;
    } else {
      return void 0;
    }
  } else if (country) {
    if (couldNumberBelongToCountry(partialE164Number, country, metadata2)) {
      if (latestCountrySelectedByUser && couldNumberBelongToCountry(partialE164Number, latestCountrySelectedByUser, metadata2)) {
        return latestCountrySelectedByUser;
      } else if (defaultCountry && couldNumberBelongToCountry(partialE164Number, defaultCountry, metadata2)) {
        return defaultCountry;
      } else {
        if (!required) {
          return void 0;
        }
      }
    } else {
      if (!required) {
        return void 0;
      }
    }
  }
  return country;
}
function onPhoneDigitsChange(phoneDigits, _ref5) {
  var prevPhoneDigits = _ref5.prevPhoneDigits, country = _ref5.country, defaultCountry = _ref5.defaultCountry, latestCountrySelectedByUser = _ref5.latestCountrySelectedByUser, countryRequired = _ref5.countryRequired, getAnyCountry = _ref5.getAnyCountry, countries = _ref5.countries, international = _ref5.international, limitMaxLength = _ref5.limitMaxLength, countryCallingCodeEditable = _ref5.countryCallingCodeEditable, metadata2 = _ref5.metadata;
  if (international && countryCallingCodeEditable === false) {
    if (country) {
      var prefix = getInternationalPhoneNumberPrefix(country, metadata2);
      if (phoneDigits.indexOf(prefix) !== 0) {
        var _value;
        var hasStartedTypingInNationalNumberDigitsHavingInputValueSelected = phoneDigits && phoneDigits[0] !== "+";
        if (hasStartedTypingInNationalNumberDigitsHavingInputValueSelected) {
          phoneDigits = prefix + phoneDigits;
          _value = e164(phoneDigits, country, metadata2);
        } else {
          phoneDigits = prefix;
        }
        return {
          phoneDigits,
          value: _value,
          country
        };
      }
    }
  }
  if (international === false && country && phoneDigits && phoneDigits[0] === "+") {
    phoneDigits = convertInternationalPhoneDigitsToNational(phoneDigits, country, metadata2);
  }
  if (phoneDigits && country && limitMaxLength) {
    phoneDigits = trimNumber(phoneDigits, country, metadata2);
  }
  if (phoneDigits && phoneDigits[0] !== "+" && (!country || international)) {
    phoneDigits = "+" + phoneDigits;
  }
  if (!phoneDigits && prevPhoneDigits && prevPhoneDigits[0] === "+") {
    if (international) {
      country = void 0;
    } else {
      country = defaultCountry;
    }
  }
  if (phoneDigits === "+" && prevPhoneDigits && prevPhoneDigits[0] === "+" && prevPhoneDigits.length > "+".length) {
    country = void 0;
  }
  var value;
  if (phoneDigits) {
    if (phoneDigits[0] === "+") {
      if (phoneDigits === "+") {
        value = void 0;
      } else if (country && getInternationalPhoneNumberPrefix(country, metadata2).indexOf(phoneDigits) === 0) {
        value = void 0;
      } else {
        value = e164(phoneDigits, country, metadata2);
      }
    } else {
      value = e164(phoneDigits, country, metadata2);
    }
  }
  if (value) {
    country = getCountryForPartialE164Number(value, {
      country,
      countries,
      defaultCountry,
      latestCountrySelectedByUser,
      // `countryRequired` flag is not passed here.
      // Instead, it's explicitly checked a bit later in the code.
      required: false,
      metadata: metadata2
    });
    if (international === false && country && phoneDigits && phoneDigits[0] === "+") {
      phoneDigits = convertInternationalPhoneDigitsToNational(phoneDigits, country, metadata2);
      value = e164(phoneDigits, country, metadata2);
    }
  }
  if (!country && countryRequired) {
    country = defaultCountry || getAnyCountry();
  }
  return {
    // `phoneDigits` returned here are a "normalized" version of the original `phoneDigits`.
    // The returned `phoneDigits` shouldn't be used anywhere except for passing it as
    // `prevPhoneDigits` parameter to this same function on next input change event.
    phoneDigits,
    country,
    value
  };
}
function convertInternationalPhoneDigitsToNational(input, country, metadata2) {
  if (input.indexOf(getInternationalPhoneNumberPrefix(country, metadata2)) === 0) {
    var formatter = new AsYouType(country, metadata2);
    formatter.input(input);
    var phoneNumber = formatter.getNumber();
    if (phoneNumber) {
      return phoneNumber.formatNational().replace(/\D/g, "");
    } else {
      return "";
    }
  } else {
    return input.replace(/\D/g, "");
  }
}
function getCountryFromPossiblyIncompleteInternationalPhoneNumber(number, metadata2) {
  var formatter = new AsYouType(null, metadata2);
  formatter.input(number);
  return formatter.getCountry();
}
function compareStrings(a, b, locales) {
  if (String.prototype.localeCompare) {
    return a.localeCompare(b, locales);
  }
  return a < b ? -1 : a > b ? 1 : 0;
}
function stripCountryCallingCode(number, country, metadata2) {
  if (country) {
    var countryCallingCodePrefix = "+" + getCountryCallingCode(country, metadata2);
    if (number.length < countryCallingCodePrefix.length) {
      if (countryCallingCodePrefix.indexOf(number) === 0) {
        return "";
      }
    } else {
      if (number.indexOf(countryCallingCodePrefix) === 0) {
        return number.slice(countryCallingCodePrefix.length);
      }
    }
  }
  for (var _i = 0, _Object$keys = Object.keys(metadata2.country_calling_codes); _i < _Object$keys.length; _i++) {
    var country_calling_code = _Object$keys[_i];
    if (number.indexOf(country_calling_code) === "+".length) {
      return number.slice("+".length + country_calling_code.length);
    }
  }
  return "";
}
function getNationalSignificantNumberDigits(number, country, metadata2) {
  var formatter = new AsYouType(country, metadata2);
  formatter.input(number);
  var phoneNumber = formatter.getNumber();
  return phoneNumber && phoneNumber.nationalNumber;
}
function couldNumberBelongToCountry(number, country, metadata2) {
  var intlPhoneNumberPrefix = getInternationalPhoneNumberPrefix(country, metadata2);
  var i = 0;
  while (i < number.length && i < intlPhoneNumberPrefix.length) {
    if (number[i] !== intlPhoneNumberPrefix[i]) {
      return false;
    }
    i++;
  }
  return true;
}
function getInitialPhoneDigits(_ref6) {
  var value = _ref6.value, phoneNumber = _ref6.phoneNumber, defaultCountry = _ref6.defaultCountry, international = _ref6.international, useNationalFormat = _ref6.useNationalFormat, metadata2 = _ref6.metadata;
  if ((international === false || useNationalFormat) && phoneNumber && phoneNumber.country) {
    return generateNationalNumberDigits(phoneNumber);
  }
  if (!value && international && defaultCountry) {
    return getInternationalPhoneNumberPrefix(defaultCountry, metadata2);
  }
  return value;
}

// node_modules/react-phone-number-input/modules/helpers/getPhoneInputWithCountryStateUpdateFromNewProps.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys3(Object(t), true).forEach(function(r2) {
      _defineProperty3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty3(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getPhoneInputWithCountryStateUpdateFromNewProps(props, prevProps, state) {
  var metadata2 = props.metadata, countries = props.countries, newDefaultCountry = props.defaultCountry, newValue = props.value, newReset = props.reset, international = props.international, displayInitialValueAsLocalNumber = props.displayInitialValueAsLocalNumber, initialValueFormat = props.initialValueFormat;
  var prevDefaultCountry = prevProps.defaultCountry, prevValue = prevProps.value, prevReset = prevProps.reset;
  var country = state.country, value = state.value, hasUserSelectedACountry = state.hasUserSelectedACountry, latestCountrySelectedByUser = state.latestCountrySelectedByUser;
  var _getInitialPhoneDigits = function _getInitialPhoneDigits2(parameters) {
    return getInitialPhoneDigits(_objectSpread3(_objectSpread3({}, parameters), {}, {
      international,
      useNationalFormat: displayInitialValueAsLocalNumber || initialValueFormat === "national",
      metadata: metadata2
    }));
  };
  if (newReset !== prevReset) {
    return {
      phoneDigits: _getInitialPhoneDigits({
        value: void 0,
        defaultCountry: newDefaultCountry
      }),
      value: void 0,
      country: newDefaultCountry,
      latestCountrySelectedByUser: void 0,
      hasUserSelectedACountry: void 0
    };
  }
  if (newDefaultCountry !== prevDefaultCountry) {
    var isNewDefaultCountrySupported = !newDefaultCountry || isCountrySupportedWithError(newDefaultCountry, metadata2);
    var noValueHasBeenEnteredByTheUser = (
      // By default, "no value has been entered" means `value` is `undefined`.
      !value || // When `international` is `true`, and some country has been pre-selected,
      // then the `<input/>` contains a pre-filled value of `+${countryCallingCode}${leadingDigits}`,
      // so in case of `international` being `true`, "the user hasn't entered anything" situation
      // doesn't just mean `value` is `undefined`, but could also mean `value` is `+${countryCallingCode}`.
      international && value === _getInitialPhoneDigits({
        value: void 0,
        defaultCountry: prevDefaultCountry
      })
    );
    var noValueHasBeenEntered = !newValue && noValueHasBeenEnteredByTheUser;
    if (!hasUserSelectedACountry && isNewDefaultCountrySupported && noValueHasBeenEntered) {
      return {
        country: newDefaultCountry,
        // If `phoneDigits` is empty, then automatically select the new `country`
        // and set `phoneDigits` to `+{getCountryCallingCode(newCountry)}`.
        // The code assumes that "no phone number has been entered by the user",
        // and no `value` property has been passed, so the `phoneNumber` parameter
        // of `_getInitialPhoneDigits({ value, phoneNumber, ... })` is `undefined`.
        phoneDigits: _getInitialPhoneDigits({
          value: void 0,
          defaultCountry: newDefaultCountry
        }),
        // `value` is `undefined` and it stays so.
        value: void 0
      };
    }
  }
  if (!valuesAreEqual(newValue, prevValue) && !valuesAreEqual(newValue, value)) {
    var phoneNumber;
    var parsedCountry;
    if (newValue) {
      if (newValue) {
        validateE164Number(newValue);
      }
      phoneNumber = parsePhoneNumber2(newValue, metadata2);
      var supportedCountries = getSupportedCountries(countries, metadata2);
      if (phoneNumber && phoneNumber.country) {
        if (!supportedCountries || supportedCountries.indexOf(phoneNumber.country) >= 0) {
          parsedCountry = phoneNumber.country;
        }
      } else {
        parsedCountry = getCountryForPartialE164Number(newValue, {
          country: void 0,
          countries: supportedCountries,
          metadata: metadata2
        });
        if (!parsedCountry) {
          if (newDefaultCountry) {
            if (newValue.indexOf(getInternationalPhoneNumberPrefix(newDefaultCountry, metadata2)) === 0) {
              parsedCountry = newDefaultCountry;
            }
          }
        }
      }
    }
    var userCountrySelectionHistoryStateUpdate;
    if (newValue) {
      if (latestCountrySelectedByUser) {
        var couldNewValueCorrespondToLatestCountrySelectedByUser = parsedCountry ? latestCountrySelectedByUser === parsedCountry : couldNumberBelongToCountry(newValue, latestCountrySelectedByUser, metadata2);
        if (couldNewValueCorrespondToLatestCountrySelectedByUser) {
          if (!parsedCountry) {
            parsedCountry = latestCountrySelectedByUser;
          }
        } else {
          userCountrySelectionHistoryStateUpdate = {
            latestCountrySelectedByUser: void 0
          };
        }
      }
    } else {
      userCountrySelectionHistoryStateUpdate = {
        latestCountrySelectedByUser: void 0,
        hasUserSelectedACountry: void 0
      };
    }
    return _objectSpread3(_objectSpread3({}, userCountrySelectionHistoryStateUpdate), {}, {
      phoneDigits: _getInitialPhoneDigits({
        phoneNumber,
        value: newValue,
        defaultCountry: newDefaultCountry
      }),
      value: newValue,
      country: newValue ? parsedCountry : newDefaultCountry
    });
  }
}
function valuesAreEqual(value1, value2) {
  if (value1 === null) {
    value1 = void 0;
  }
  if (value2 === null) {
    value2 = void 0;
  }
  return value1 === value2;
}

// node_modules/react-phone-number-input/modules/PhoneInputWithCountry.js
var _excluded9 = ["name", "disabled", "readOnly", "autoComplete", "style", "className", "inputRef", "inputComponent", "numberInputProps", "smartCaret", "countrySelectComponent", "countrySelectProps", "containerComponent", "containerComponentProps", "defaultCountry", "countries", "countryOptionsOrder", "labels", "flags", "flagComponent", "flagUrl", "addInternationalOption", "internationalIcon", "displayInitialValueAsLocalNumber", "initialValueFormat", "onCountryChange", "limitMaxLength", "countryCallingCodeEditable", "focusInputOnCountrySelection", "reset", "metadata", "international", "locales"];
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
function ownKeys4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys4(Object(t), true).forEach(function(r2) {
      _defineProperty4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _extends7() {
  _extends7 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends7.apply(this, arguments);
}
function _objectWithoutProperties9(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose9(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose9(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call2) {
  if (call2 && (_typeof2(call2) === "object" || typeof call2 === "function")) {
    return call2;
  } else if (call2 !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty4(obj, key, value) {
  key = _toPropertyKey2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey2(t) {
  var i = _toPrimitive2(t, "string");
  return "symbol" == _typeof2(i) ? i : i + "";
}
function _toPrimitive2(t, r) {
  if ("object" != _typeof2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var PhoneNumberInput_ = function(_React$PureComponent) {
  function PhoneNumberInput_2(props) {
    var _this;
    _classCallCheck(this, PhoneNumberInput_2);
    _this = _callSuper(this, PhoneNumberInput_2, [props]);
    _defineProperty4(_this, "setInputRef", function(instance) {
      setRefsValue([_this.props.inputRef, _this.inputRef], instance);
    });
    _defineProperty4(_this, "isCountrySupportedWithError", function(country) {
      var metadata2 = _this.props.metadata;
      return isCountrySupportedWithError(country, metadata2);
    });
    _defineProperty4(_this, "onCountryChange", function(newCountry) {
      var _this$props = _this.props, international = _this$props.international, metadata2 = _this$props.metadata, onChange2 = _this$props.onChange, focusInputOnCountrySelection = _this$props.focusInputOnCountrySelection;
      var _this$state = _this.state, prevPhoneDigits = _this$state.phoneDigits, prevCountry = _this$state.country;
      var newPhoneDigits = getPhoneDigitsForNewCountry(prevPhoneDigits, {
        prevCountry,
        newCountry,
        metadata: metadata2,
        // Convert the phone number to "national" format
        // when the user changes the selected country by hand.
        useNationalFormat: !international
      });
      var newValue = e164(newPhoneDigits, newCountry, metadata2);
      if (focusInputOnCountrySelection) {
        _this.inputRef.current.focus();
      }
      _this.setState({
        country: newCountry,
        latestCountrySelectedByUser: newCountry,
        hasUserSelectedACountry: true,
        phoneDigits: newPhoneDigits,
        value: newValue
      }, function() {
        onChange2(newValue);
      });
    });
    _defineProperty4(_this, "onChange", function(_phoneDigits) {
      var _this$props2 = _this.props, defaultCountry = _this$props2.defaultCountry, onChange2 = _this$props2.onChange, addInternationalOption = _this$props2.addInternationalOption, international = _this$props2.international, limitMaxLength = _this$props2.limitMaxLength, countryCallingCodeEditable = _this$props2.countryCallingCodeEditable, metadata2 = _this$props2.metadata;
      var _this$state2 = _this.state, countries = _this$state2.countries, prevPhoneDigits = _this$state2.phoneDigits, currentlySelectedCountry = _this$state2.country, latestCountrySelectedByUser = _this$state2.latestCountrySelectedByUser;
      var _onPhoneDigitsChange = onPhoneDigitsChange(_phoneDigits, {
        prevPhoneDigits,
        country: currentlySelectedCountry,
        countryRequired: !addInternationalOption,
        defaultCountry,
        latestCountrySelectedByUser,
        getAnyCountry: function getAnyCountry() {
          return _this.getFirstSupportedCountry({
            countries
          });
        },
        countries,
        international,
        limitMaxLength,
        countryCallingCodeEditable,
        metadata: metadata2
      }), phoneDigits = _onPhoneDigitsChange.phoneDigits, country = _onPhoneDigitsChange.country, value = _onPhoneDigitsChange.value;
      var stateUpdate = {
        phoneDigits,
        value,
        country
      };
      if (latestCountrySelectedByUser && value && !couldNumberBelongToCountry(value, latestCountrySelectedByUser, metadata2)) {
        stateUpdate.latestCountrySelectedByUser = void 0;
      }
      if (countryCallingCodeEditable === false) {
        if (!value && phoneDigits === _this.state.phoneDigits) {
          stateUpdate.forceRerender = {};
        }
      }
      _this.setState(
        stateUpdate,
        // Update the new `value` property.
        // Doing it after the `state` has been updated
        // because `onChange()` will trigger `getDerivedStateFromProps()`
        // with the new `value` which will be compared to `state.value` there.
        function() {
          return onChange2(value);
        }
      );
    });
    _defineProperty4(_this, "_onFocus", function() {
      return _this.setState({
        isFocused: true
      });
    });
    _defineProperty4(_this, "_onBlur", function() {
      return _this.setState({
        isFocused: false
      });
    });
    _defineProperty4(_this, "onFocus", function(event) {
      _this._onFocus();
      var onFocus = _this.props.onFocus;
      if (onFocus) {
        onFocus(event);
      }
    });
    _defineProperty4(_this, "onBlur", function(event) {
      var onBlur = _this.props.onBlur;
      _this._onBlur();
      if (onBlur) {
        onBlur(event);
      }
    });
    _defineProperty4(_this, "onCountryFocus", function(event) {
      _this._onFocus();
      var countrySelectProps = _this.props.countrySelectProps;
      if (countrySelectProps) {
        var onFocus = countrySelectProps.onFocus;
        if (onFocus) {
          onFocus(event);
        }
      }
    });
    _defineProperty4(_this, "onCountryBlur", function(event) {
      _this._onBlur();
      var countrySelectProps = _this.props.countrySelectProps;
      if (countrySelectProps) {
        var onBlur = countrySelectProps.onBlur;
        if (onBlur) {
          onBlur(event);
        }
      }
    });
    _this.inputRef = import_react12.default.createRef();
    var _this$props3 = _this.props, _value = _this$props3.value, labels2 = _this$props3.labels, _international = _this$props3.international, _addInternationalOption = _this$props3.addInternationalOption, displayInitialValueAsLocalNumber = _this$props3.displayInitialValueAsLocalNumber, initialValueFormat = _this$props3.initialValueFormat, _metadata = _this$props3.metadata;
    var _this$props4 = _this.props, _defaultCountry = _this$props4.defaultCountry, _countries = _this$props4.countries;
    if (_defaultCountry) {
      if (!_this.isCountrySupportedWithError(_defaultCountry)) {
        _defaultCountry = void 0;
      }
    }
    if (_value) {
      validateE164Number(_value);
    }
    _countries = getSupportedCountries(_countries, _metadata);
    var phoneNumber = parsePhoneNumber2(_value, _metadata);
    _this.CountryIcon = createCountryIconComponent(_this.props);
    var preSelectedCountry = getPreSelectedCountry({
      value: _value,
      phoneNumber,
      defaultCountry: _defaultCountry,
      required: !_addInternationalOption,
      countries: _countries || getCountries(_metadata),
      getAnyCountry: function getAnyCountry() {
        return _this.getFirstSupportedCountry({
          countries: _countries
        });
      },
      metadata: _metadata
    });
    _this.state = {
      // Workaround for `this.props` inside `getDerivedStateFromProps()`.
      props: _this.props,
      // The country selected.
      country: preSelectedCountry,
      // `countries` are stored in `this.state` because they're filtered.
      // For example, a developer might theoretically pass some unsupported
      // countries as part of the `countries` property, and because of that
      // the component uses `this.state.countries` (which are filtered)
      // instead of `this.props.countries`
      // (which could potentially contain unsupported countries).
      countries: _countries,
      // `phoneDigits` state property holds non-formatted user's input.
      // The reason is that there's no way of finding out
      // in which form should `value` be displayed: international or national.
      // E.g. if `value` is `+78005553535` then it could be input
      // by a user both as `8 (800) 555-35-35` and `+7 800 555 35 35`.
      // Hence storing just `value` is not sufficient for correct formatting.
      // E.g. if a user entered `8 (800) 555-35-35`
      // then value is `+78005553535` and `phoneDigits` are `88005553535`
      // and if a user entered `+7 800 555 35 35`
      // then value is `+78005553535` and `phoneDigits` are `+78005553535`.
      phoneDigits: getInitialPhoneDigits({
        value: _value,
        phoneNumber,
        defaultCountry: _defaultCountry,
        international: _international,
        useNationalFormat: displayInitialValueAsLocalNumber || initialValueFormat === "national",
        metadata: _metadata
      }),
      // `value` property is duplicated in state.
      // The reason is that `getDerivedStateFromProps()`
      // needs this `value` to compare to the new `value` property
      // to find out if `phoneDigits` needs updating:
      // If the `value` property was changed externally
      // then it won't be equal to `state.value`
      // in which case `phoneDigits` and `country` should be updated.
      value: _value
    };
    return _this;
  }
  _inherits(PhoneNumberInput_2, _React$PureComponent);
  return _createClass(PhoneNumberInput_2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var onCountryChange = this.props.onCountryChange;
      var defaultCountry = this.props.defaultCountry;
      var selectedCountry = this.state.country;
      if (onCountryChange) {
        if (defaultCountry) {
          if (!this.isCountrySupportedWithError(defaultCountry)) {
            defaultCountry = void 0;
          }
        }
        if (selectedCountry !== defaultCountry) {
          onCountryChange(selectedCountry);
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var onCountryChange = this.props.onCountryChange;
      var country = this.state.country;
      if (onCountryChange && country !== prevState.country) {
        onCountryChange(country);
      }
    }
  }, {
    key: "getCountrySelectOptions",
    value: function getCountrySelectOptions2(_ref) {
      var countries = _ref.countries;
      var _this$props5 = this.props, international = _this$props5.international, countryCallingCodeEditable = _this$props5.countryCallingCodeEditable, countryOptionsOrder = _this$props5.countryOptionsOrder, addInternationalOption = _this$props5.addInternationalOption, labels2 = _this$props5.labels, locales = _this$props5.locales, metadata2 = _this$props5.metadata;
      return this.useMemoCountrySelectOptions(function() {
        return sortCountryOptions(getCountrySelectOptions({
          countries: countries || getCountries(metadata2),
          countryNames: labels2,
          addInternationalOption: international && countryCallingCodeEditable === false ? false : addInternationalOption,
          compareStringsLocales: locales
          // compareStrings
        }), getSupportedCountryOptions(countryOptionsOrder, metadata2));
      }, [countries, countryOptionsOrder, addInternationalOption, labels2, metadata2]);
    }
  }, {
    key: "useMemoCountrySelectOptions",
    value: function useMemoCountrySelectOptions(generator, dependencies) {
      if (!this.countrySelectOptionsMemoDependencies || !areEqualArrays(dependencies, this.countrySelectOptionsMemoDependencies)) {
        this.countrySelectOptionsMemo = generator();
        this.countrySelectOptionsMemoDependencies = dependencies;
      }
      return this.countrySelectOptionsMemo;
    }
  }, {
    key: "getFirstSupportedCountry",
    value: function getFirstSupportedCountry(_ref2) {
      var countries = _ref2.countries;
      var countryOptions = this.getCountrySelectOptions({
        countries
      });
      return countryOptions[0].value;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props, name = _this$props6.name, disabled = _this$props6.disabled, readOnly = _this$props6.readOnly, autoComplete = _this$props6.autoComplete, style = _this$props6.style, className = _this$props6.className, inputRef = _this$props6.inputRef, inputComponent = _this$props6.inputComponent, numberInputProps = _this$props6.numberInputProps, smartCaret = _this$props6.smartCaret, CountrySelectComponent = _this$props6.countrySelectComponent, countrySelectProps = _this$props6.countrySelectProps, ContainerComponent = _this$props6.containerComponent, containerComponentProps = _this$props6.containerComponentProps, defaultCountry = _this$props6.defaultCountry, countriesProperty = _this$props6.countries, countryOptionsOrder = _this$props6.countryOptionsOrder, labels2 = _this$props6.labels, flags = _this$props6.flags, flagComponent = _this$props6.flagComponent, flagUrl = _this$props6.flagUrl, addInternationalOption = _this$props6.addInternationalOption, internationalIcon = _this$props6.internationalIcon, displayInitialValueAsLocalNumber = _this$props6.displayInitialValueAsLocalNumber, initialValueFormat = _this$props6.initialValueFormat, onCountryChange = _this$props6.onCountryChange, limitMaxLength = _this$props6.limitMaxLength, countryCallingCodeEditable = _this$props6.countryCallingCodeEditable, focusInputOnCountrySelection = _this$props6.focusInputOnCountrySelection, reset = _this$props6.reset, metadata2 = _this$props6.metadata, international = _this$props6.international, locales = _this$props6.locales, rest = _objectWithoutProperties9(_this$props6, _excluded9);
      var _this$state3 = this.state, country = _this$state3.country, countries = _this$state3.countries, phoneDigits = _this$state3.phoneDigits, isFocused = _this$state3.isFocused;
      var InputComponent = smartCaret ? InputSmart_default : InputBasic_default;
      var countrySelectOptions = this.getCountrySelectOptions({
        countries
      });
      return import_react12.default.createElement(ContainerComponent, _extends7({
        style,
        className: (0, import_classnames4.default)(className, "PhoneInput", {
          "PhoneInput--focus": isFocused,
          "PhoneInput--disabled": disabled,
          "PhoneInput--readOnly": readOnly
        })
      }, containerComponentProps), import_react12.default.createElement(CountrySelectComponent, _extends7({
        name: name ? "".concat(name, "Country") : void 0,
        "aria-label": labels2.country
      }, countrySelectProps, {
        value: country,
        options: countrySelectOptions,
        onChange: this.onCountryChange,
        onFocus: this.onCountryFocus,
        onBlur: this.onCountryBlur,
        disabled: disabled || countrySelectProps && countrySelectProps.disabled,
        readOnly: readOnly || countrySelectProps && countrySelectProps.readOnly,
        iconComponent: this.CountryIcon
      })), import_react12.default.createElement(InputComponent, _extends7({
        ref: this.setInputRef,
        type: "tel",
        autoComplete
      }, numberInputProps, rest, {
        inputFormat: international === true ? "INTERNATIONAL" : international === false ? "NATIONAL" : "INTERNATIONAL_OR_NATIONAL",
        international: international ? true : void 0,
        withCountryCallingCode: international ? true : void 0,
        name,
        metadata: metadata2,
        country,
        value: phoneDigits || "",
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        disabled,
        readOnly,
        inputComponent,
        className: (0, import_classnames4.default)("PhoneInputInput", numberInputProps && numberInputProps.className, rest.className)
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: (
      // `state` holds previous props as `props`, and also:
      // * `country` — The currently selected country, e.g. `"RU"`.
      // * `value` — The currently entered phone number (E.164), e.g. `+78005553535`.
      // * `phoneDigits` — The parsed `<input/>` value, e.g. `8005553535`.
      // (and a couple of other less significant properties)
      function getDerivedStateFromProps(props, state) {
        return _objectSpread4({
          // Emulate `prevProps` via `state.props`.
          props
        }, getPhoneInputWithCountryStateUpdateFromNewProps(props, state.props, state));
      }
    )
  }]);
}(import_react12.default.PureComponent);
var PhoneNumberInput = import_react12.default.forwardRef(function(props, ref) {
  return import_react12.default.createElement(PhoneNumberInput_, _extends7({}, withDefaultProps(props), {
    inputRef: ref
  }));
});
PhoneNumberInput.propTypes = {
  /**
   * Phone number in `E.164` format.
   *
   * Example:
   *
   * `"+12223333333"`
   *
   * Any "falsy" value like `undefined`, `null` or an empty string `""` is treated like "empty".
   */
  value: import_prop_types9.default.string,
  /**
   * A function of `value: string?`.
   *
   * Updates the `value` property as the user inputs a phone number.
   *
   * If the user erases the input value, the argument is `undefined`.
   */
  onChange: import_prop_types9.default.func.isRequired,
  /**
   * Toggles the `--focus` CSS class.
   * @ignore
   */
  onFocus: import_prop_types9.default.func,
  /**
   * `onBlur` is usually passed by `redux-form`.
   * @ignore
   */
  onBlur: import_prop_types9.default.func,
  /**
   * Set to `true` to mark both the phone number `<input/>`
   * and the country `<select/>` as `disabled`.
   */
  disabled: import_prop_types9.default.bool,
  /**
   * Set to `true` to mark both the phone number `<input/>`
   * and the country `<select/>` as `readonly`.
   */
  readOnly: import_prop_types9.default.bool,
  /**
   * Sets `autoComplete` property for phone number `<input/>`.
   *
   * Web browser's "autocomplete" feature
   * remembers the phone number being input
   * and can also autofill the `<input/>`
   * with previously remembered phone numbers.
   *
   * https://developers.google.com
   * /web/updates/2015/06/checkout-faster-with-autofill
   *
   * For example, can be used to turn it off:
   *
   * "So when should you use `autocomplete="off"`?
   *  One example is when you've implemented your own version
   *  of autocomplete for search. Another example is any form field
   *  where users will input and submit different kinds of information
   *  where it would not be useful to have the browser remember
   *  what was submitted previously".
   */
  // (is `"tel"` by default)
  autoComplete: import_prop_types9.default.string,
  /**
   * Set to `"national"` to show the initial `value` in
   * "national" format rather than "international".
   *
   * For example, if `initialValueFormat` is `"national"`
   * and the initial `value="+12133734253"` is passed
   * then the `<input/>` value will be `"(213) 373-4253"`.
   *
   * By default, `initialValueFormat` is `undefined`,
   * meaning that if the initial `value="+12133734253"` is passed
   * then the `<input/>` value will be `"+1 213 373 4253"`.
   *
   * The reason for such default behaviour is that
   * the newer generation grows up when there are no stationary phones
   * and therefore everyone inputs phone numbers in international format
   * in their smartphones so people gradually get more accustomed to
   * writing phone numbers in international format rather than in local format.
   * Future people won't be using "national" format, only "international".
   */
  // (is `undefined` by default)
  initialValueFormat: import_prop_types9.default.oneOf(["national"]),
  // `displayInitialValueAsLocalNumber` property has been
  // superceded by `initialValueFormat` property.
  displayInitialValueAsLocalNumber: import_prop_types9.default.bool,
  /**
   * The country to be selected by default.
   * For example, can be set after a GeoIP lookup.
   *
   * Example: `"US"`.
   */
  // A two-letter country code ("ISO 3166-1 alpha-2").
  defaultCountry: import_prop_types9.default.string,
  /**
   * If specified, only these countries will be available for selection.
   *
   * Example:
   *
   * `["RU", "UA", "KZ"]`
   */
  countries: import_prop_types9.default.arrayOf(import_prop_types9.default.string),
  /**
   * Custom country `<select/>` option names.
   * Also some labels like "ext" and country `<select/>` `aria-label`.
   *
   * Example:
   *
   * `{ "ZZ": "Международный", RU: "Россия", US: "США", ... }`
   *
   * See the `locales` directory for examples.
   */
  labels,
  /**
   * Country `<select/>` options are sorted by their labels.
   * The default sorting function uses `a.localeCompare(b, locales)`,
   * and, if that's not available, falls back to simple `a > b` / `a < b`.
   * Some languages, like Chinese, support multiple sorting variants
   * (called "collations"), and the user might prefer one or another.
   * Also, sometimes the Operating System language is not always
   * the preferred language for a person using a website or an application,
   * so there should be a way to specify custom locale.
   * This `locales` property mimicks the `locales` argument of `Intl` constructors,
   * and can be either a Unicode BCP 47 locale identifier or an array of such locale identifiers.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
   */
  locales: import_prop_types9.default.oneOfType([import_prop_types9.default.string, import_prop_types9.default.arrayOf(import_prop_types9.default.string)]),
  /*
   * Custom country `<select/>` options sorting function.
   * The default one uses `a.localeCompare(b)`, and,
   * if that's not available, falls back to simple `a > b`/`a < b`.
   * There have been requests to add custom sorter for cases
   * like Chinese language and "pinyin" (non-default) sorting order.
   * https://stackoverflow.com/questions/22907288/chinese-sorting-by-pinyin-in-javascript-with-localecompare
  compareStrings: PropTypes.func,
   */
  /**
   * A URL template of a country flag, where
   * "{XX}" is a two-letter country code in upper case,
   * or where "{xx}" is a two-letter country code in lower case.
   * By default it points to `country-flag-icons` gitlab pages website.
   * I imagine someone might want to download those country flag icons
   * and host them on their own servers instead
   * (all flags are available in the `country-flag-icons` library).
   * There's a catch though: new countries may be added in future,
   * so when hosting country flag icons on your own server
   * one should check the `CHANGELOG.md` every time before updating this library,
   * otherwise there's a possibility that some new country flag would be missing.
   */
  flagUrl: import_prop_types9.default.string,
  /**
   * Custom country flag icon components.
   * These flags will be used instead of the default ones.
   * The the "Flags" section of the readme for more info.
   *
   * The shape is an object where keys are country codes
   * and values are flag icon components.
   * Flag icon components receive the same properties
   * as `flagComponent` (see below).
   *
   * Example:
   *
   * `{ "RU": (props) => <img src="..."/> }`
   *
   * Example:
   *
   * `import flags from 'country-flag-icons/react/3x2'`
   *
   * `import PhoneInput from 'react-phone-number-input'`
   *
   * `<PhoneInput flags={flags} .../>`
   */
  flags: import_prop_types9.default.objectOf(import_prop_types9.default.elementType),
  /**
   * Country flag icon component.
   *
   * Takes properties:
   *
   * * `country: string` — The country code.
   * * `countryName: string` — The country name.
   * * `flagUrl: string` — The `flagUrl` property (see above).
   * * `flags: object` — The `flags` property (see above).
   */
  flagComponent: import_prop_types9.default.elementType,
  /**
   * Set to `false` to remove the "International" option from country `<select/>`.
   */
  addInternationalOption: import_prop_types9.default.bool,
  /**
   * "International" icon component.
   * Should have the same aspect ratio.
   *
   * Receives properties:
   *
   * * `title: string` — "International" country option label.
   */
  internationalIcon: import_prop_types9.default.elementType,
  /**
   * Can be used to place some countries on top of the list of country `<select/>` options.
   *
   * * `"XX"` — inserts an option for "XX" country.
   * * `"🌐"` — inserts "International" option.
   * * `"|"` — inserts a separator.
   * * `"..."` — inserts options for the rest of the countries (can be omitted, in which case it will be automatically added at the end).
   *
   * Example:
   *
   * `["US", "CA", "AU", "|", "..."]`
   */
  countryOptionsOrder: import_prop_types9.default.arrayOf(import_prop_types9.default.string),
  /**
   * `<Phone/>` component CSS style object.
   */
  style: import_prop_types9.default.object,
  /**
   * `<Phone/>` component CSS class.
   */
  className: import_prop_types9.default.string,
  /**
   * Country `<select/>` component.
   *
   * Receives properties:
   *
   * * `name: string?` — HTML `name` attribute.
   * * `value: string?` — The currently selected country code.
   * * `onChange(value: string?)` — Updates the `value`.
   * * `onFocus()` — Is used to toggle the `--focus` CSS class.
   * * `onBlur()` — Is used to toggle the `--focus` CSS class.
   * * `options: object[]` — The list of all selectable countries (including "International") each being an object of shape `{ value: string?, label: string }`.
   * * `iconComponent: PropTypes.elementType` — React component that renders a country icon: `<Icon country={value}/>`. If `country` is `undefined` then it renders an "International" icon.
   * * `disabled: boolean?` — HTML `disabled` attribute.
   * * `readOnly: boolean?` — HTML `readOnly` attribute.
   * * `tabIndex: (number|string)?` — HTML `tabIndex` attribute.
   * * `className: string` — CSS class name.
   */
  countrySelectComponent: import_prop_types9.default.elementType,
  /**
   * Country `<select/>` component props.
   * Along with the usual DOM properties such as `aria-label` and `tabIndex`,
   * some custom properties are supported, such as `arrowComponent` and `unicodeFlags`.
   */
  countrySelectProps: import_prop_types9.default.object,
  /**
   * Phone number `<input/>` component.
   *
   * Receives properties:
   *
   * * `value: string` — The formatted `value`.
   * * `onChange(event: Event)` — Updates the formatted `value` from `event.target.value`.
   * * `onFocus()` — Is used to toggle the `--focus` CSS class.
   * * `onBlur()` — Is used to toggle the `--focus` CSS class.
   * * Other properties like `type="tel"` or `autoComplete="tel"` that should be passed through to the DOM `<input/>`.
   *
   * Must also either use `React.forwardRef()` to "forward" `ref` to the `<input/>` or implement `.focus()` method.
   */
  inputComponent: import_prop_types9.default.elementType,
  /**
   * Phone number `<input/>` component props.
   */
  numberInputProps: import_prop_types9.default.object,
  /**
   * Wrapping `<div/>` component.
   *
   * Receives properties:
   *
   * * `style: object` — A component CSS style object.
   * * `className: string` — Classes to attach to the component, typically changes when component focuses or blurs.
   */
  containerComponent: import_prop_types9.default.elementType,
  /**
   * Wrapping `<div/>` component props.
   */
  containerComponentProps: import_prop_types9.default.object,
  /**
   * When the user attempts to insert a digit somewhere in the middle of a phone number,
   * the caret position is moved right before the next available digit skipping
   * any punctuation in between. This is called "smart" caret positioning.
   * Another case would be the phone number format changing as a result of
   * the user inserting the digit somewhere in the middle, which would require
   * re-positioning the caret because all digit positions have changed.
   * This "smart" caret positioning feature can be turned off by passing
   * `smartCaret={false}` property: use it in case of any possible issues
   * with caret position during phone number input.
   */
  // Is `true` by default.
  smartCaret: import_prop_types9.default.bool,
  /**
   * Set to `true` to force "international" phone number format.
   * Set to `false` to force "national" phone number format.
   * By default it's `undefined` meaning that it doesn't enforce any phone number format:
   * the user can input their phone number in either "national" or "international" format.
   */
  international: import_prop_types9.default.bool,
  /**
   * If set to `true`, the phone number input will get trimmed
   * if it exceeds the maximum length for the country.
   */
  limitMaxLength: import_prop_types9.default.bool,
  /**
   * If set to `false`, and `international` is `true`, then
   * users won't be able to erase the "country calling part"
   * of a phone number in the `<input/>`.
   */
  countryCallingCodeEditable: import_prop_types9.default.bool,
  /**
   * `libphonenumber-js` metadata.
   *
   * Can be used to pass custom `libphonenumber-js` metadata
   * to reduce the overall bundle size for those who compile "custom" metadata.
   */
  metadata,
  /**
   * Is called every time the selected country changes:
   * either programmatically or when user selects it manually from the list.
   */
  // People have been asking for a way to get the selected country.
  // @see  https://github.com/catamphetamine/react-phone-number-input/issues/128
  // For some it's just a "business requirement".
  // I guess it's about gathering as much info on the user as a website can
  // without introducing any addional fields that would complicate the form
  // therefore reducing "conversion" (that's a marketing term).
  // Assuming that the phone number's country is the user's country
  // is not 100% correct but in most cases I guess it's valid.
  onCountryChange: import_prop_types9.default.func,
  /**
   * If set to `false`, will not focus the `<input/>` component
   * when the user selects a country from the list of countries.
   * This can be used to conform to the Web Content Accessibility Guidelines (WCAG).
   * Quote:
   * "On input: Changing the setting of any user interface component
   *  does not automatically cause a change of context unless the user
   *  has been advised of the behaviour before using the component."
   */
  focusInputOnCountrySelection: import_prop_types9.default.bool
};
var defaultProps = {
  /**
   * Remember (and autofill) the value as a phone number.
   */
  autoComplete: "tel",
  /**
   * Country `<select/>` component.
   */
  countrySelectComponent: CountrySelectWithIcon,
  /**
   * Flag icon component.
   */
  flagComponent: FlagComponent,
  /**
   * By default, uses icons from `country-flag-icons` gitlab pages website.
   */
  // Must be equal to `flagUrl` in `./CountryIcon.js`.
  flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/{XX}.svg",
  /**
   * Default "International" country `<select/>` option icon.
   */
  internationalIcon: InternationalIcon,
  /**
   * Phone number `<input/>` component.
   */
  inputComponent: "input",
  /**
   * Wrapping `<div/>` component.
   */
  containerComponent: "div",
  /**
   * Some users requested a way to reset the component:
   * both number `<input/>` and country `<select/>`.
   * Whenever `reset` property changes both number `<input/>`
   * and country `<select/>` are reset.
   * It's not implemented as some instance `.reset()` method
   * because `ref` is forwarded to `<input/>`.
   * It's also not replaced with just resetting `country` on
   * external `value` reset, because a user could select a country
   * and then not input any `value`, and so the selected country
   * would be "stuck", if not using this `reset` property.
   */
  // https://github.com/catamphetamine/react-phone-number-input/issues/300
  reset: import_prop_types9.default.any,
  /**
   *
   */
  /**
   * Set to `false` to use "basic" caret instead of the "smart" one.
   */
  smartCaret: true,
  /**
   * Whether to add the "International" option
   * to the list of countries.
   */
  addInternationalOption: true,
  /**
   * If set to `false`, and `international` is `true`, then
   * users won't be able to erase the "country calling part"
   * of a phone number in the `<input/>`.
   */
  countryCallingCodeEditable: true,
  /**
   * If set to `false`, will not focus the `<input/>` component
   * when the user selects a country from the list of countries.
   * This can be used to conform to the Web Content Accessibility Guidelines (WCAG).
   * Quote:
   * "On input: Changing the setting of any user interface component
   *  does not automatically cause a change of context unless the user
   *  has been advised of the behaviour before using the component."
   */
  focusInputOnCountrySelection: true
};
function withDefaultProps(props) {
  props = _objectSpread4({}, props);
  for (var key in defaultProps) {
    if (props[key] === void 0) {
      props[key] = defaultProps[key];
    }
  }
  return props;
}
var PhoneInputWithCountry_default = PhoneNumberInput;
function areEqualArrays(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  var i = 0;
  while (i < a.length) {
    if (a[i] !== b[i]) {
      return false;
    }
    i++;
  }
  return true;
}

// node_modules/react-phone-number-input/modules/libphonenumber/formatPhoneNumber.js
function _typeof3(o) {
  "@babel/helpers - typeof";
  return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof3(o);
}
function formatPhoneNumber(value, format3, metadata2) {
  if (!metadata2) {
    if (_typeof3(format3) === "object") {
      metadata2 = format3;
      format3 = "NATIONAL";
    }
  }
  if (!value) {
    return "";
  }
  var phoneNumber = parsePhoneNumber(value, metadata2);
  if (!phoneNumber) {
    return "";
  }
  switch (format3) {
    case "National":
      format3 = "NATIONAL";
      break;
    case "International":
      format3 = "INTERNATIONAL";
      break;
  }
  return phoneNumber.format(format3);
}
function formatPhoneNumberIntl(value, metadata2) {
  return formatPhoneNumber(value, "INTERNATIONAL", metadata2);
}

// node_modules/react-phone-number-input/modules/PhoneInputWithCountryDefault.js
var import_react13 = __toESM(require_react(), 1);
var import_prop_types10 = __toESM(require_prop_types(), 1);

// node_modules/react-phone-number-input/locale/en.json.js
var en_json_default = {
  "ext": "ext.",
  "country": "Phone number country",
  "phone": "Phone",
  "AB": "Abkhazia",
  "AC": "Ascension Island",
  "AD": "Andorra",
  "AE": "United Arab Emirates",
  "AF": "Afghanistan",
  "AG": "Antigua and Barbuda",
  "AI": "Anguilla",
  "AL": "Albania",
  "AM": "Armenia",
  "AO": "Angola",
  "AQ": "Antarctica",
  "AR": "Argentina",
  "AS": "American Samoa",
  "AT": "Austria",
  "AU": "Australia",
  "AW": "Aruba",
  "AX": "Åland Islands",
  "AZ": "Azerbaijan",
  "BA": "Bosnia and Herzegovina",
  "BB": "Barbados",
  "BD": "Bangladesh",
  "BE": "Belgium",
  "BF": "Burkina Faso",
  "BG": "Bulgaria",
  "BH": "Bahrain",
  "BI": "Burundi",
  "BJ": "Benin",
  "BL": "Saint Barthélemy",
  "BM": "Bermuda",
  "BN": "Brunei Darussalam",
  "BO": "Bolivia",
  "BQ": "Bonaire, Sint Eustatius and Saba",
  "BR": "Brazil",
  "BS": "Bahamas",
  "BT": "Bhutan",
  "BV": "Bouvet Island",
  "BW": "Botswana",
  "BY": "Belarus",
  "BZ": "Belize",
  "CA": "Canada",
  "CC": "Cocos (Keeling) Islands",
  "CD": "Congo, Democratic Republic of the",
  "CF": "Central African Republic",
  "CG": "Congo",
  "CH": "Switzerland",
  "CI": "Cote d'Ivoire",
  "CK": "Cook Islands",
  "CL": "Chile",
  "CM": "Cameroon",
  "CN": "China",
  "CO": "Colombia",
  "CR": "Costa Rica",
  "CU": "Cuba",
  "CV": "Cape Verde",
  "CW": "Curaçao",
  "CX": "Christmas Island",
  "CY": "Cyprus",
  "CZ": "Czech Republic",
  "DE": "Germany",
  "DJ": "Djibouti",
  "DK": "Denmark",
  "DM": "Dominica",
  "DO": "Dominican Republic",
  "DZ": "Algeria",
  "EC": "Ecuador",
  "EE": "Estonia",
  "EG": "Egypt",
  "EH": "Western Sahara",
  "ER": "Eritrea",
  "ES": "Spain",
  "ET": "Ethiopia",
  "FI": "Finland",
  "FJ": "Fiji",
  "FK": "Falkland Islands",
  "FM": "Federated States of Micronesia",
  "FO": "Faroe Islands",
  "FR": "France",
  "GA": "Gabon",
  "GB": "United Kingdom",
  "GD": "Grenada",
  "GE": "Georgia",
  "GF": "French Guiana",
  "GG": "Guernsey",
  "GH": "Ghana",
  "GI": "Gibraltar",
  "GL": "Greenland",
  "GM": "Gambia",
  "GN": "Guinea",
  "GP": "Guadeloupe",
  "GQ": "Equatorial Guinea",
  "GR": "Greece",
  "GS": "South Georgia and the South Sandwich Islands",
  "GT": "Guatemala",
  "GU": "Guam",
  "GW": "Guinea-Bissau",
  "GY": "Guyana",
  "HK": "Hong Kong",
  "HM": "Heard Island and McDonald Islands",
  "HN": "Honduras",
  "HR": "Croatia",
  "HT": "Haiti",
  "HU": "Hungary",
  "ID": "Indonesia",
  "IE": "Ireland",
  "IL": "Israel",
  "IM": "Isle of Man",
  "IN": "India",
  "IO": "British Indian Ocean Territory",
  "IQ": "Iraq",
  "IR": "Iran",
  "IS": "Iceland",
  "IT": "Italy",
  "JE": "Jersey",
  "JM": "Jamaica",
  "JO": "Jordan",
  "JP": "Japan",
  "KE": "Kenya",
  "KG": "Kyrgyzstan",
  "KH": "Cambodia",
  "KI": "Kiribati",
  "KM": "Comoros",
  "KN": "Saint Kitts and Nevis",
  "KP": "North Korea",
  "KR": "South Korea",
  "KW": "Kuwait",
  "KY": "Cayman Islands",
  "KZ": "Kazakhstan",
  "LA": "Laos",
  "LB": "Lebanon",
  "LC": "Saint Lucia",
  "LI": "Liechtenstein",
  "LK": "Sri Lanka",
  "LR": "Liberia",
  "LS": "Lesotho",
  "LT": "Lithuania",
  "LU": "Luxembourg",
  "LV": "Latvia",
  "LY": "Libya",
  "MA": "Morocco",
  "MC": "Monaco",
  "MD": "Moldova",
  "ME": "Montenegro",
  "MF": "Saint Martin (French Part)",
  "MG": "Madagascar",
  "MH": "Marshall Islands",
  "MK": "North Macedonia",
  "ML": "Mali",
  "MM": "Myanmar",
  "MN": "Mongolia",
  "MO": "Macao",
  "MP": "Northern Mariana Islands",
  "MQ": "Martinique",
  "MR": "Mauritania",
  "MS": "Montserrat",
  "MT": "Malta",
  "MU": "Mauritius",
  "MV": "Maldives",
  "MW": "Malawi",
  "MX": "Mexico",
  "MY": "Malaysia",
  "MZ": "Mozambique",
  "NA": "Namibia",
  "NC": "New Caledonia",
  "NE": "Niger",
  "NF": "Norfolk Island",
  "NG": "Nigeria",
  "NI": "Nicaragua",
  "NL": "Netherlands",
  "NO": "Norway",
  "NP": "Nepal",
  "NR": "Nauru",
  "NU": "Niue",
  "NZ": "New Zealand",
  "OM": "Oman",
  "OS": "South Ossetia",
  "PA": "Panama",
  "PE": "Peru",
  "PF": "French Polynesia",
  "PG": "Papua New Guinea",
  "PH": "Philippines",
  "PK": "Pakistan",
  "PL": "Poland",
  "PM": "Saint Pierre and Miquelon",
  "PN": "Pitcairn",
  "PR": "Puerto Rico",
  "PS": "Palestine",
  "PT": "Portugal",
  "PW": "Palau",
  "PY": "Paraguay",
  "QA": "Qatar",
  "RE": "Reunion",
  "RO": "Romania",
  "RS": "Serbia",
  "RU": "Russia",
  "RW": "Rwanda",
  "SA": "Saudi Arabia",
  "SB": "Solomon Islands",
  "SC": "Seychelles",
  "SD": "Sudan",
  "SE": "Sweden",
  "SG": "Singapore",
  "SH": "Saint Helena",
  "SI": "Slovenia",
  "SJ": "Svalbard and Jan Mayen",
  "SK": "Slovakia",
  "SL": "Sierra Leone",
  "SM": "San Marino",
  "SN": "Senegal",
  "SO": "Somalia",
  "SR": "Suriname",
  "SS": "South Sudan",
  "ST": "Sao Tome and Principe",
  "SV": "El Salvador",
  "SX": "Sint Maarten",
  "SY": "Syria",
  "SZ": "Swaziland",
  "TA": "Tristan da Cunha",
  "TC": "Turks and Caicos Islands",
  "TD": "Chad",
  "TF": "French Southern Territories",
  "TG": "Togo",
  "TH": "Thailand",
  "TJ": "Tajikistan",
  "TK": "Tokelau",
  "TL": "Timor-Leste",
  "TM": "Turkmenistan",
  "TN": "Tunisia",
  "TO": "Tonga",
  "TR": "Turkey",
  "TT": "Trinidad and Tobago",
  "TV": "Tuvalu",
  "TW": "Taiwan",
  "TZ": "Tanzania",
  "UA": "Ukraine",
  "UG": "Uganda",
  "UM": "United States Minor Outlying Islands",
  "US": "United States",
  "UY": "Uruguay",
  "UZ": "Uzbekistan",
  "VA": "Holy See (Vatican City State)",
  "VC": "Saint Vincent and the Grenadines",
  "VE": "Venezuela",
  "VG": "Virgin Islands, British",
  "VI": "Virgin Islands, U.S.",
  "VN": "Vietnam",
  "VU": "Vanuatu",
  "WF": "Wallis and Futuna",
  "WS": "Samoa",
  "XK": "Kosovo",
  "YE": "Yemen",
  "YT": "Mayotte",
  "ZA": "South Africa",
  "ZM": "Zambia",
  "ZW": "Zimbabwe",
  "ZZ": "International"
};

// node_modules/react-phone-number-input/modules/PhoneInputWithCountryDefault.js
var _excluded10 = ["metadata", "labels"];
function _extends8() {
  _extends8 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends8.apply(this, arguments);
}
function _objectWithoutProperties10(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose10(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose10(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function createPhoneInput(defaultMetadata) {
  var PhoneInputDefault = import_react13.default.forwardRef(function(_ref, ref) {
    var _ref$metadata = _ref.metadata, metadata2 = _ref$metadata === void 0 ? defaultMetadata : _ref$metadata, _ref$labels = _ref.labels, labels2 = _ref$labels === void 0 ? en_json_default : _ref$labels, rest = _objectWithoutProperties10(_ref, _excluded10);
    return import_react13.default.createElement(PhoneInputWithCountry_default, _extends8({}, rest, {
      ref,
      metadata: metadata2,
      labels: labels2
    }));
  });
  PhoneInputDefault.propTypes = {
    metadata,
    labels
  };
  return PhoneInputDefault;
}
var PhoneInputWithCountryDefault_default = createPhoneInput();

// node_modules/react-phone-number-input/min/index.js
function call(func, _arguments) {
  var args = Array.prototype.slice.call(_arguments);
  args.push(metadata_min_json_default);
  return func.apply(this, args);
}
var min_default = createPhoneInput(metadata_min_json_default);
function parsePhoneNumber3() {
  return call(parsePhoneNumber, arguments);
}
function formatPhoneNumber2() {
  return call(formatPhoneNumber, arguments);
}
function formatPhoneNumberIntl2() {
  return call(formatPhoneNumberIntl, arguments);
}
function isValidPhoneNumber2() {
  return call(isValidPhoneNumber, arguments);
}
function isPossiblePhoneNumber2() {
  return call(isPossiblePhoneNumber, arguments);
}
function getCountries2() {
  return call(getCountries, arguments);
}
function getCountryCallingCode2() {
  return call(getCountryCallingCode, arguments);
}
function isSupportedCountry2() {
  return call(isSupportedCountry, arguments);
}
export {
  min_default as default,
  formatPhoneNumber2 as formatPhoneNumber,
  formatPhoneNumberIntl2 as formatPhoneNumberIntl,
  getCountries2 as getCountries,
  getCountryCallingCode2 as getCountryCallingCode,
  isPossiblePhoneNumber2 as isPossiblePhoneNumber,
  isSupportedCountry2 as isSupportedCountry,
  isValidPhoneNumber2 as isValidPhoneNumber,
  parsePhoneNumber3 as parsePhoneNumber
};
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)
*/
//# sourceMappingURL=react-phone-number-input.js.map
