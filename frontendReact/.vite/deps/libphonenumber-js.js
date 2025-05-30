import {
  AsYouType,
  DIGITS,
  DIGIT_PLACEHOLDER,
  Metadata,
  ParseError,
  PhoneNumber,
  PhoneNumberMatcher,
  VALID_PHONE_NUMBER_WITH_EXTENSION,
  VALID_PUNCTUATION,
  WHITESPACE,
  createExtensionPattern,
  findNumbers,
  findPhoneNumbersInText,
  formatIncompletePhoneNumber,
  formatNumber,
  formatRFC3966,
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
  getExtPrefix,
  getNumberType,
  isObject,
  isPossiblePhoneNumber,
  isPossiblePhoneNumber2,
  isSupportedCountry,
  isValidCandidate,
  isValidNumber,
  isValidPhoneNumber,
  isValidPreCandidate,
  isViablePhoneNumber,
  metadata_min_json_default,
  normalizeArguments,
  parse,
  parseDigits,
  parseIncompletePhoneNumber,
  parsePhoneNumber,
  parsePhoneNumberCharacter,
  parsePhoneNumberWithError,
  parsePreCandidate,
  parseRFC3966,
  searchNumbers,
  searchPhoneNumbersInText,
  validatePhoneNumberLength
} from "./chunk-24B4F6AT.js";
import "./chunk-DC5AMYBS.js";

// node_modules/libphonenumber-js/min/exports/withMetadataArgument.js
function withMetadataArgument(func, _arguments) {
  var args = Array.prototype.slice.call(_arguments);
  args.push(metadata_min_json_default);
  return func.apply(this, args);
}

// node_modules/libphonenumber-js/min/exports/parsePhoneNumberWithError.js
function parsePhoneNumberWithError2() {
  return withMetadataArgument(parsePhoneNumberWithError, arguments);
}

// node_modules/libphonenumber-js/min/exports/parsePhoneNumber.js
function parsePhoneNumber2() {
  return withMetadataArgument(parsePhoneNumber, arguments);
}

// node_modules/libphonenumber-js/min/exports/isValidPhoneNumber.js
function isValidPhoneNumber2() {
  return withMetadataArgument(isValidPhoneNumber, arguments);
}

// node_modules/libphonenumber-js/min/exports/isPossiblePhoneNumber.js
function isPossiblePhoneNumber3() {
  return withMetadataArgument(isPossiblePhoneNumber2, arguments);
}

// node_modules/libphonenumber-js/min/exports/validatePhoneNumberLength.js
function validatePhoneNumberLength2() {
  return withMetadataArgument(validatePhoneNumberLength, arguments);
}

// node_modules/libphonenumber-js/min/exports/findNumbers.js
function findNumbers2() {
  return withMetadataArgument(findNumbers, arguments);
}

// node_modules/libphonenumber-js/min/exports/searchNumbers.js
function searchNumbers2() {
  return withMetadataArgument(searchNumbers, arguments);
}

// node_modules/libphonenumber-js/min/exports/findPhoneNumbersInText.js
function findPhoneNumbersInText2() {
  return withMetadataArgument(findPhoneNumbersInText, arguments);
}

// node_modules/libphonenumber-js/min/exports/searchPhoneNumbersInText.js
function searchPhoneNumbersInText2() {
  return withMetadataArgument(searchPhoneNumbersInText, arguments);
}

// node_modules/libphonenumber-js/min/exports/PhoneNumberMatcher.js
function PhoneNumberMatcher2(text, options) {
  return PhoneNumberMatcher.call(this, text, options, metadata_min_json_default);
}
PhoneNumberMatcher2.prototype = Object.create(PhoneNumberMatcher.prototype, {});
PhoneNumberMatcher2.prototype.constructor = PhoneNumberMatcher2;

// node_modules/libphonenumber-js/min/exports/AsYouType.js
function AsYouType2(country) {
  return AsYouType.call(this, country, metadata_min_json_default);
}
AsYouType2.prototype = Object.create(AsYouType.prototype, {});
AsYouType2.prototype.constructor = AsYouType2;

// node_modules/libphonenumber-js/min/exports/isSupportedCountry.js
function isSupportedCountry2() {
  return withMetadataArgument(isSupportedCountry, arguments);
}

// node_modules/libphonenumber-js/min/exports/getCountries.js
function getCountries2() {
  return withMetadataArgument(getCountries, arguments);
}

// node_modules/libphonenumber-js/min/exports/getCountryCallingCode.js
function getCountryCallingCode2() {
  return withMetadataArgument(getCountryCallingCode, arguments);
}

// node_modules/libphonenumber-js/min/exports/getExtPrefix.js
function getExtPrefix2() {
  return withMetadataArgument(getExtPrefix, arguments);
}

// node_modules/libphonenumber-js/min/exports/Metadata.js
function Metadata2() {
  return Metadata.call(this, metadata_min_json_default);
}
Metadata2.prototype = Object.create(Metadata.prototype, {});
Metadata2.prototype.constructor = Metadata2;

// node_modules/libphonenumber-js/min/exports/getExampleNumber.js
function getExampleNumber2() {
  return withMetadataArgument(getExampleNumber, arguments);
}

// node_modules/libphonenumber-js/min/exports/formatIncompletePhoneNumber.js
function formatIncompletePhoneNumber2() {
  return withMetadataArgument(formatIncompletePhoneNumber, arguments);
}

// node_modules/libphonenumber-js/min/exports/PhoneNumber.js
function PhoneNumber2(number) {
  return PhoneNumber.call(this, number, metadata_min_json_default);
}
PhoneNumber2.prototype = Object.create(PhoneNumber.prototype, {});
PhoneNumber2.prototype.constructor = PhoneNumber2;

// node_modules/libphonenumber-js/es6/legacy/parse.js
function parseNumber() {
  var _normalizeArguments = normalizeArguments(arguments), text = _normalizeArguments.text, options = _normalizeArguments.options, metadata = _normalizeArguments.metadata;
  return parse(text, options, metadata);
}

// node_modules/libphonenumber-js/index.es6.exports/parse.js
function parse2() {
  return withMetadataArgument(parseNumber, arguments);
}

// node_modules/libphonenumber-js/es6/legacy/format.js
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function formatNumber2() {
  var _normalizeArguments = normalizeArguments2(arguments), input = _normalizeArguments.input, format2 = _normalizeArguments.format, options = _normalizeArguments.options, metadata = _normalizeArguments.metadata;
  return formatNumber(input, format2, options, metadata);
}
function normalizeArguments2(args) {
  var _Array$prototype$slic = Array.prototype.slice.call(args), _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 5), arg_1 = _Array$prototype$slic2[0], arg_2 = _Array$prototype$slic2[1], arg_3 = _Array$prototype$slic2[2], arg_4 = _Array$prototype$slic2[3], arg_5 = _Array$prototype$slic2[4];
  var input;
  var format2;
  var options;
  var metadata;
  if (typeof arg_1 === "string") {
    if (typeof arg_3 === "string") {
      format2 = arg_3;
      if (arg_5) {
        options = arg_4;
        metadata = arg_5;
      } else {
        metadata = arg_4;
      }
      input = parse(arg_1, {
        defaultCountry: arg_2,
        extended: true
      }, metadata);
    } else {
      if (typeof arg_2 !== "string") {
        throw new Error("`format` argument not passed to `formatNumber(number, format)`");
      }
      format2 = arg_2;
      if (arg_4) {
        options = arg_3;
        metadata = arg_4;
      } else {
        metadata = arg_3;
      }
      input = parse(arg_1, {
        extended: true
      }, metadata);
    }
  } else if (isObject(arg_1)) {
    input = arg_1;
    format2 = arg_2;
    if (arg_4) {
      options = arg_3;
      metadata = arg_4;
    } else {
      metadata = arg_3;
    }
  } else throw new TypeError("A phone number must either be a string or an object of shape { phone, [country] }.");
  if (format2 === "International") {
    format2 = "INTERNATIONAL";
  } else if (format2 === "National") {
    format2 = "NATIONAL";
  }
  return {
    input,
    format: format2,
    options,
    metadata
  };
}

// node_modules/libphonenumber-js/index.es6.exports/format.js
function format() {
  return withMetadataArgument(formatNumber2, arguments);
}

// node_modules/libphonenumber-js/es6/legacy/getNumberType.js
function _slicedToArray2(arr, i) {
  return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _iterableToArrayLimit2(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles2(arr) {
  if (Array.isArray(arr)) return arr;
}
function getNumberType2() {
  var _normalizeArguments = normalizeArguments3(arguments), input = _normalizeArguments.input, options = _normalizeArguments.options, metadata = _normalizeArguments.metadata;
  if (!input.phone) {
    return;
  }
  return getNumberType(input, options, metadata);
}
function normalizeArguments3(args) {
  var _Array$prototype$slic = Array.prototype.slice.call(args), _Array$prototype$slic2 = _slicedToArray2(_Array$prototype$slic, 4), arg_1 = _Array$prototype$slic2[0], arg_2 = _Array$prototype$slic2[1], arg_3 = _Array$prototype$slic2[2], arg_4 = _Array$prototype$slic2[3];
  var input;
  var options = {};
  var metadata;
  if (typeof arg_1 === "string") {
    if (!isObject(arg_2)) {
      if (arg_4) {
        options = arg_3;
        metadata = arg_4;
      } else {
        metadata = arg_3;
      }
      if (isViablePhoneNumber(arg_1)) {
        input = parse(arg_1, {
          defaultCountry: arg_2
        }, metadata);
      } else {
        input = {};
      }
    } else {
      if (arg_3) {
        options = arg_2;
        metadata = arg_3;
      } else {
        metadata = arg_2;
      }
      if (isViablePhoneNumber(arg_1)) {
        input = parse(arg_1, void 0, metadata);
      } else {
        input = {};
      }
    }
  } else if (isObject(arg_1)) {
    input = arg_1;
    if (arg_3) {
      options = arg_2;
      metadata = arg_3;
    } else {
      metadata = arg_2;
    }
  } else throw new TypeError("A phone number must either be a string or an object of shape { phone, [country] }.");
  return {
    input,
    options,
    metadata
  };
}

// node_modules/libphonenumber-js/index.es6.exports/getNumberType.js
function getNumberType3() {
  return withMetadataArgument(getNumberType2, arguments);
}

// node_modules/libphonenumber-js/es6/legacy/isPossibleNumber.js
function isPossibleNumber() {
  var _normalizeArguments = normalizeArguments3(arguments), input = _normalizeArguments.input, options = _normalizeArguments.options, metadata = _normalizeArguments.metadata;
  if (!input.phone && !(options && options.v2)) {
    return false;
  }
  return isPossiblePhoneNumber(input, options, metadata);
}

// node_modules/libphonenumber-js/index.es6.exports/isPossibleNumber.js
function isPossibleNumber2() {
  return withMetadataArgument(isPossibleNumber, arguments);
}

// node_modules/libphonenumber-js/es6/legacy/isValidNumber.js
function isValidNumber2() {
  var _normalizeArguments = normalizeArguments3(arguments), input = _normalizeArguments.input, options = _normalizeArguments.options, metadata = _normalizeArguments.metadata;
  if (!input.phone) {
    return false;
  }
  return isValidNumber(input, options, metadata);
}

// node_modules/libphonenumber-js/index.es6.exports/isValidNumber.js
function isValidNumber3() {
  return withMetadataArgument(isValidNumber2, arguments);
}

// node_modules/libphonenumber-js/es6/legacy/isValidNumberForRegion_.js
function isValidNumberForRegion(input, country, options, metadata) {
  options = options || {};
  return input.country === country && isValidNumber(input, options, metadata);
}

// node_modules/libphonenumber-js/es6/legacy/isValidNumberForRegion.js
function isValidNumberForRegion2(number, country, metadata) {
  if (typeof number !== "string") {
    throw new TypeError("number must be a string");
  }
  if (typeof country !== "string") {
    throw new TypeError("country must be a string");
  }
  var input;
  if (isViablePhoneNumber(number)) {
    input = parse(number, {
      defaultCountry: country
    }, metadata);
  } else {
    input = {};
  }
  return isValidNumberForRegion(input, country, void 0, metadata);
}

// node_modules/libphonenumber-js/index.es6.exports/isValidNumberForRegion.js
function isValidNumberForRegion3() {
  return withMetadataArgument(isValidNumberForRegion2, arguments);
}

// node_modules/libphonenumber-js/es6/legacy/findPhoneNumbersInitialImplementation.js
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
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var EXTN_PATTERNS_FOR_PARSING = createExtensionPattern("parsing");
var WHITESPACE_IN_THE_BEGINNING_PATTERN = new RegExp("^[" + WHITESPACE + "]+");
var PUNCTUATION_IN_THE_END_PATTERN = new RegExp("[" + VALID_PUNCTUATION + "]+$");
function findPhoneNumbers(text, options, metadata) {
  if (options === void 0) {
    options = {};
  }
  var search = new PhoneNumberSearch(text, options, metadata);
  var phones = [];
  while (search.hasNext()) {
    phones.push(search.next());
  }
  return phones;
}
function searchPhoneNumbers(text, options, metadata) {
  if (options === void 0) {
    options = {};
  }
  var search = new PhoneNumberSearch(text, options, metadata);
  return _defineProperty({}, Symbol.iterator, function() {
    return {
      next: function next() {
        if (search.hasNext()) {
          return {
            done: false,
            value: search.next()
          };
        }
        return {
          done: true
        };
      }
    };
  });
}
var PhoneNumberSearch = function() {
  function PhoneNumberSearch3(text, options, metadata) {
    _classCallCheck(this, PhoneNumberSearch3);
    this.text = text;
    this.options = options || {};
    this.metadata = metadata;
    this.state = "NOT_READY";
    this.regexp = new RegExp(VALID_PHONE_NUMBER_WITH_EXTENSION, "ig");
  }
  _createClass(PhoneNumberSearch3, [{
    key: "find",
    value: function find() {
      var matches = this.regexp.exec(this.text);
      if (!matches) {
        return;
      }
      var number = matches[0];
      var startsAt = matches.index;
      number = number.replace(WHITESPACE_IN_THE_BEGINNING_PATTERN, "");
      startsAt += matches[0].length - number.length;
      number = number.replace(PUNCTUATION_IN_THE_END_PATTERN, "");
      number = parsePreCandidate(number);
      var result = this.parseCandidate(number, startsAt);
      if (result) {
        return result;
      }
      return this.find();
    }
  }, {
    key: "parseCandidate",
    value: function parseCandidate(number, startsAt) {
      if (!isValidPreCandidate(number, startsAt, this.text)) {
        return;
      }
      if (!isValidCandidate(number, startsAt, this.text, this.options.extended ? "POSSIBLE" : "VALID")) {
        return;
      }
      var result = parse(number, this.options, this.metadata);
      if (!result.phone) {
        return;
      }
      result.startsAt = startsAt;
      result.endsAt = startsAt + number.length;
      return result;
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      if (this.state === "NOT_READY") {
        this.last_match = this.find();
        if (this.last_match) {
          this.state = "READY";
        } else {
          this.state = "DONE";
        }
      }
      return this.state === "READY";
    }
  }, {
    key: "next",
    value: function next() {
      if (!this.hasNext()) {
        throw new Error("No next element");
      }
      var result = this.last_match;
      this.last_match = null;
      this.state = "NOT_READY";
      return result;
    }
  }]);
  return PhoneNumberSearch3;
}();

// node_modules/libphonenumber-js/es6/legacy/findPhoneNumbers.js
function findPhoneNumbers2() {
  var _normalizeArguments = normalizeArguments(arguments), text = _normalizeArguments.text, options = _normalizeArguments.options, metadata = _normalizeArguments.metadata;
  return findPhoneNumbers(text, options, metadata);
}
function searchPhoneNumbers2() {
  var _normalizeArguments2 = normalizeArguments(arguments), text = _normalizeArguments2.text, options = _normalizeArguments2.options, metadata = _normalizeArguments2.metadata;
  return searchPhoneNumbers(text, options, metadata);
}

// node_modules/libphonenumber-js/index.es6.exports/findPhoneNumbers.js
function findPhoneNumbers3() {
  return withMetadataArgument(findPhoneNumbers2, arguments);
}

// node_modules/libphonenumber-js/index.es6.exports/searchPhoneNumbers.js
function searchPhoneNumbers3() {
  return withMetadataArgument(searchPhoneNumbers2, arguments);
}

// node_modules/libphonenumber-js/index.es6.exports/PhoneNumberSearch.js
function PhoneNumberSearch2(text, options) {
  PhoneNumberSearch.call(this, text, options, metadata_min_json_default);
}
PhoneNumberSearch2.prototype = Object.create(PhoneNumberSearch.prototype, {});
PhoneNumberSearch2.prototype.constructor = PhoneNumberSearch2;
export {
  AsYouType2 as AsYouType,
  AsYouType as AsYouTypeCustom,
  DIGITS,
  DIGIT_PLACEHOLDER,
  Metadata2 as Metadata,
  ParseError,
  PhoneNumber2 as PhoneNumber,
  PhoneNumberMatcher2 as PhoneNumberMatcher,
  PhoneNumberSearch2 as PhoneNumberSearch,
  PhoneNumberSearch as PhoneNumberSearchCustom,
  parsePhoneNumber2 as default,
  findNumbers2 as findNumbers,
  findPhoneNumbers3 as findPhoneNumbers,
  findPhoneNumbers2 as findPhoneNumbersCustom,
  findPhoneNumbersInText2 as findPhoneNumbersInText,
  format,
  formatNumber2 as formatCustom,
  formatIncompletePhoneNumber2 as formatIncompletePhoneNumber,
  format as formatNumber,
  formatRFC3966,
  getCountries2 as getCountries,
  getCountryCallingCode2 as getCountryCallingCode,
  getCountryCallingCode as getCountryCallingCodeCustom,
  getExampleNumber2 as getExampleNumber,
  getExtPrefix2 as getExtPrefix,
  getNumberType3 as getNumberType,
  getNumberType2 as getNumberTypeCustom,
  getCountryCallingCode2 as getPhoneCode,
  getCountryCallingCode as getPhoneCodeCustom,
  isPossibleNumber2 as isPossibleNumber,
  isPossiblePhoneNumber3 as isPossiblePhoneNumber,
  isSupportedCountry2 as isSupportedCountry,
  isValidNumber3 as isValidNumber,
  isValidNumber2 as isValidNumberCustom,
  isValidNumberForRegion3 as isValidNumberForRegion,
  isValidPhoneNumber2 as isValidPhoneNumber,
  parse2 as parse,
  parseNumber as parseCustom,
  parseDigits,
  parseIncompletePhoneNumber,
  parse2 as parseNumber,
  parsePhoneNumberWithError2 as parsePhoneNumber,
  parsePhoneNumberCharacter,
  parsePhoneNumber2 as parsePhoneNumberFromString,
  parsePhoneNumberWithError2 as parsePhoneNumberWithError,
  parseRFC3966,
  searchNumbers2 as searchNumbers,
  searchPhoneNumbers3 as searchPhoneNumbers,
  searchPhoneNumbers2 as searchPhoneNumbersCustom,
  searchPhoneNumbersInText2 as searchPhoneNumbersInText,
  validatePhoneNumberLength2 as validatePhoneNumberLength
};
//# sourceMappingURL=libphonenumber-js.js.map
