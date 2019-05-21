"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _moment = _interopRequireDefault(require("moment"));

var _lunarCalendar = _interopRequireDefault(require("lunar-calendar"));

var _common = _interopRequireDefault(require("../locales/zh-cn/common.json"));

var _common2 = _interopRequireDefault(require("../locales/zh-tw/common.json"));

var _earthlyBranches = _interopRequireDefault(require("../locales/zh-cn/earthly-branches.json"));

var _earthlyBranches2 = _interopRequireDefault(require("../locales/zh-tw/earthly-branches.json"));

var _heavenlyStems = _interopRequireDefault(require("../locales/zh-cn/heavenly-stems.json"));

var _heavenlyStems2 = _interopRequireDefault(require("../locales/zh-tw/heavenly-stems.json"));

var _fiveElements = _interopRequireDefault(require("../locales/zh-cn/five-elements.json"));

var _fiveElements2 = _interopRequireDefault(require("../locales/zh-tw/five-elements.json"));

var _twoLimits = _interopRequireDefault(require("../locales/zh-cn/two-limits.json"));

var _twoLimits2 = _interopRequireDefault(require("../locales/zh-tw/two-limits.json"));

/**
 * @copyright 2016 commenthol
 * @license MIT
 */
var jsonsOfLocale = {
  'zh-CN': {
    'common': _common["default"],
    'earthlyBranches': _earthlyBranches["default"],
    'heavenlyStems': _heavenlyStems["default"],
    'fiveElements': _fiveElements["default"],
    'twoLimits': _twoLimits["default"]
  },
  'zh-TW': {
    'common': _common2["default"],
    'earthlyBranches': _earthlyBranches2["default"],
    'heavenlyStems': _heavenlyStems2["default"],
    'fiveElements': _fiveElements2["default"],
    'twoLimits': _twoLimits2["default"]
  }
};
var NINE_LIMIT_FORMAT = ['yearLimit', 'monthLimit', 'largeSegmentLimit', 'mediumSegmentLimit', 'smallSegmentLimit', 'dayLimit', 'hourLimit', 'largeQuaterLimit', 'smallQuaterLimit'];
var locales = ['zh-TW', 'zh-CN'];

var NineLimit =
/*#__PURE__*/
function () {
  function NineLimit(year, month, day, hour, minute) {
    (0, _classCallCheck2["default"])(this, NineLimit);
    this.locale = 'zh-TW';
    this.solarDateTime = (0, _moment["default"])().utcOffset(8);
    this.isLargeSegmentIncludesLastSegment = false;
    this.initialize();
    this.setSolarDateTime(year, month, day, hour, minute);
  }

  (0, _createClass2["default"])(NineLimit, [{
    key: "initialize",
    value: function initialize() {
      var _this$getTranslation = this.getTranslation(),
          common = _this$getTranslation.common;

      this.result = {
        yearLimit: {
          label: common['yearLimit'],
          value: '甲子',
          unit: common['yearLimitUnit']
        },
        monthLimit: {
          label: common['monthLimit'],
          value: '甲子',
          unit: common['monthLimitUnit']
        },
        largeSegmentLimit: {
          label: common['largeSegmentLimit'],
          value: '子',
          unit: common['largeSegmentLimitUnit']
        },
        mediumSegmentLimit: {
          label: common['mediumSegmentLimit'],
          value: '寅',
          unit: common['mediumSegmentLimitUnit']
        },
        smallSegmentLimit: {
          label: common['smallSegmentLimit'],
          value: '木',
          unit: common['smallSegmentLimitUnit']
        },
        dayLimit: {
          label: common['dayLimit'],
          value: '甲子',
          unit: common['dayLimitUnit']
        },
        hourLimit: {
          label: common['hourLimit'],
          value: '甲子',
          unit: common['hourLimitUnit']
        },
        largeQuaterLimit: {
          label: common['largeQuaterLimit'],
          value: '寅',
          unit: common['largeQuaterLimitUnit']
        },
        smallQuaterLimit: {
          label: common['smallQuaterLimit'],
          value: '陽',
          unit: common['smallQuaterLimitUnit']
        }
      };
    }
  }, {
    key: "getTranslation",
    value: function getTranslation() {
      return locales.includes(this.locale) ? jsonsOfLocale[this.locale] : jsonsOfLocale['zh-TW'];
    }
  }, {
    key: "setLocale",
    value: function setLocale(locale) {
      if (['zh-CN', 'zh-TW'].includes(locale)) this.locale = locale;
      this.initialize();
      return this;
    }
  }, {
    key: "setSolarDateTime",
    value: function setSolarDateTime(year, month, day, hour, minute) {
      if (year && month && day) {
        if (typeof year !== 'number') throw TypeError('Year is not number.');
        if (typeof month !== 'number') throw TypeError('Month is not number.');
        if (typeof day !== 'number') throw TypeError('Day is not number.');
        if (typeof hour !== 'number') throw TypeError('Hour is not number.');
        if (typeof minute !== 'number') throw TypeError('Minute is not number.');
        this.solarDateTime = (0, _moment["default"])().year(year).month(month - 1).date(day).hour(hour).minute(minute);
        this.lunarDate = _lunarCalendar["default"].solarToLunar(this.getSolarYear(), this.getSolarMonth(), this.getSolarDay());
        this.isLargeSegmentIncludesLastSegment = this.lunarDate.monthDays >= 28;
      } else if (!year && !month & !day) {
        this.solarDateTime = (0, _moment["default"])().utcOffset(8);
        this.lunarDate = _lunarCalendar["default"].solarToLunar(this.getSolarYear(), this.getSolarMonth(), this.getSolarDay());
        this.isLargeSegmentIncludesLastSegment = this.lunarDate.monthDays >= 28;
      } else {
        throw TypeError('Input value are not valid.');
      }

      this.lunarDate = _lunarCalendar["default"].solarToLunar(this.getSolarYear(), this.getSolarMonth(), this.getSolarDay());
      return this;
    }
  }, {
    key: "getSolarYear",
    value: function getSolarYear() {
      return this.solarDateTime.year();
    }
  }, {
    key: "getSolarMonth",
    value: function getSolarMonth() {
      return this.solarDateTime.month() + 1;
    }
  }, {
    key: "getSolarDay",
    value: function getSolarDay() {
      return this.solarDateTime.date();
    }
  }, {
    key: "getSolarHour",
    value: function getSolarHour() {
      return this.solarDateTime.hour();
    }
  }, {
    key: "getSolarMinute",
    value: function getSolarMinute() {
      return this.solarDateTime.minute();
    }
  }, {
    key: "_compileYearLimit",
    value: function _compileYearLimit() {
      this.result.yearLimit.value = this.lunarDate.GanZhiYear;
    }
  }, {
    key: "_compileMonthLimit",
    value: function _compileMonthLimit() {
      this.result.monthLimit.value = this.lunarDate.GanZhiMonth;
    }
    /**
     * 2.5天為一組，以寅為開頭取農曆月算出大段極。
     * 算出落在某個大段，然後以餘數為基礎，從該大段的頭開始換算成小時，再以5小時為一組
     * 以寅為開頭，算出中段極。
     * 最後小段極為五小時的第幾位以木火土金水為排序取值。
     */

  }, {
    key: "_compileSegmentLimit",
    value: function _compileSegmentLimit() {
      var dateOrder = this.lunarDate.lunarDay;
      var hour = this.getSolarHour(); // 若超過整點再加1

      var hourOrder = dateOrder - 1 + (hour >= 12 && this.getSolarMinute > 0 ? 0.5 : 0);
      var qOfLargeSegment = Math.ceil(hourOrder / 2.5 + (hourOrder % 2.5 === 0 ? 1 : 0));
      var rOfLargeSegment = hourOrder % 2.5;

      var _this$getTranslation2 = this.getTranslation(),
          earthlyBranches = _this$getTranslation2.earthlyBranches,
          fiveElements = _this$getTranslation2.fiveElements;

      this.result.largeSegmentLimit.value = earthlyBranches["e".concat(qOfLargeSegment)];
      var qOfMediumSegment = Math.ceil((rOfLargeSegment * 24 + hour + (this.getSolarMinute > 0 ? 1 : 0)) / 5);
      var rOfMediumSegment = (rOfLargeSegment * 24 + hour + (this.getSolarMinute > 0 ? 1 : 0)) % 5 + 1;
      this.result.mediumSegmentLimit.value = earthlyBranches["e".concat(qOfMediumSegment)];
      this.result.smallSegmentLimit.value = fiveElements["f".concat(rOfMediumSegment)];
    }
  }, {
    key: "_compileDayLimit",
    value: function _compileDayLimit() {
      this.result.dayLimit.value = this.lunarDate.GanZhiDay;
    }
  }, {
    key: "_compileHourLimit",
    value: function _compileHourLimit() {
      var _this = this;

      var _this$getTranslation3 = this.getTranslation(),
          earthlyBranches = _this$getTranslation3.earthlyBranches,
          heavenlyStems = _this$getTranslation3.heavenlyStems;

      var startHeavenlyHour = function () {
        var date = _this.result.dayLimit.value;
        if (date.includes(heavenlyStems['h1']) || date.includes(heavenlyStems['h6'])) return 1;
        if (date.includes(heavenlyStems['h2']) || date.includes(heavenlyStems['h7'])) return 3;
        if (date.includes(heavenlyStems['h3']) || date.includes(heavenlyStems['h8'])) return 5;
        if (date.includes(heavenlyStems['h4']) || date.includes(heavenlyStems['h9'])) return 7;
        if (date.includes(heavenlyStems['h5']) || date.includes(heavenlyStems['h10'])) return 9;
      }();

      var hour = this.getSolarHour() + (this.getSolarMinute > 0 ? 1 : 0); // 以e1=寅時為開頭 所以要為移往前2位

      var lunarHour = hour % 2 === 0 ? hour / 2 - 1 : (hour + 1) / 2 - 1;

      var heavenlyHourOrder = function () {
        var orderBasedNormalEarthlyOrder = 0;
        if (lunarHour + 2 > 12) orderBasedNormalEarthlyOrder = lunarHour + 2 - 12;else orderBasedNormalEarthlyOrder = lunarHour + 2;

        if (startHeavenlyHour + orderBasedNormalEarthlyOrder - 1 > 10) {
          return startHeavenlyHour + orderBasedNormalEarthlyOrder - 1 - 10;
        } else {
          return startHeavenlyHour + orderBasedNormalEarthlyOrder - 1;
        }
      }(); // console.log(heavenlyHourOrder)


      this.result.hourLimit.value = heavenlyStems["h".concat(heavenlyHourOrder)] + earthlyBranches["e".concat(lunarHour)];
    }
  }, {
    key: "_compileQuaterLimit",
    value: function _compileQuaterLimit() {
      var _this$getTranslation4 = this.getTranslation(),
          earthlyBranches = _this$getTranslation4.earthlyBranches,
          twoLimits = _this$getTranslation4.twoLimits;

      var hour = this.getSolarHour();
      var minute = this.getSolarMinute();
      var quaterMins = (hour % 2 === 0 ? 1 : 0) * 60 + minute;
      this.result.largeQuaterLimit.value = earthlyBranches["e".concat(Math.ceil(quaterMins / 10 + (quaterMins % 10 === 0 ? 1 : 0)))];
      this.result.smallQuaterLimit.value = quaterMins % 10 < 5 ? twoLimits['t1'] : twoLimits['t2'];
    }
  }, {
    key: "_compile",
    value: function _compile() {
      this._compileYearLimit();

      this._compileMonthLimit();

      this._compileSegmentLimit();

      this._compileDayLimit();

      this._compileHourLimit();

      this._compileQuaterLimit();

      return this;
    }
  }, {
    key: "toObject",
    value: function toObject() {
      this._compile();

      return this.result;
    }
  }, {
    key: "toString",
    value: function toString() {
      var _this2 = this;

      this._compile();

      return NINE_LIMIT_FORMAT.map(function (item) {
        return _this2.result[item].value + _this2.result[item].unit;
      }).join(' ');
    }
  }]);
  return NineLimit;
}();

var _default = NineLimit;
exports["default"] = _default;