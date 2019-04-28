
/**
 * @copyright 2016 commenthol
 * @license MIT
 */

import moment from 'moment'
import LunarCalendar from 'lunar-calendar'
import ZhCnCommon from '../locales/zh-cn/common.json'
import ZhTwCommon from '../locales/zh-tw/common.json'
import ZhCnEarthlyBranches from '../locales/zh-cn/earthly-branches.json'
import ZhTWEarthlyBranches from '../locales/zh-tw/earthly-branches.json'
import ZhCnHeavenlyStems from '../locales/zh-cn/heavenly-stems.json'
import ZhTWHeavenlyStems from '../locales/zh-tw/heavenly-stems.json'


const jsonsOfLocale = {
  'zh-CN': {
    'common': ZhCnCommon,
    'earthlyBranches': ZhCnEarthlyBranches,
    'heavenlyStems': ZhCnHeavenlyStems
  },
  'zh-TW': {
    'common': ZhTwCommon,
    'earthlyBranches': ZhTWEarthlyBranches,
    'heavenlyStems': ZhTWHeavenlyStems
  }
}


const NINE_LIMIT_FORMAT = [
  'yearLimit', 'monthLimit',
  'largeSegmentLimit', 'mediumSegmentLimit', 'smallSegmentLimit',
  'dayLimit', 'hourLimit', 'largeQuaterLimit', 'smallQuaterLimit'
]

// 設定最小甲子年為西元4年
const minFirstYearOfSolarYear = 4

const locales = ['zh-TW', 'zh-CN']

class NineLimit {
  constructor (year, month, day, hour, minute) {
    this.locale = 'zh-TW'
    this.initialize()
    this.setSolarDateTime(year, month, day, hour, minute)
  }

  initialize() {
    const { common } = this.getTranslation()
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
        unit: common['smallQuaterLimit']
      }
    }
  }

  getTranslation () {
    return locales.includes(this.locale)
      ? jsonsOfLocale[this.locale]
      : jsonsOfLocale['zh-TW']
  } 

  setSolarDateTime (year, month, day, hour, minute) {
    if (year && month && day) {
      if (typeof year !== Number) return new Error('Year is not number.')
      if (typeof month !== Number) return new Error('Month is not number.')
      if (typeof day !== Number) return new Error('Day is not number.')
      if (typeof hour !== Number) return new Error('Hour is not number.')
      if (typeof minute !== Number) return new Error('Minute is not number.')
      this.solarDateTime = moment()
        .set('year', year)
        .set('month', month)
        .set('day', day)
        .set('hour', hour)
        .set('minute', minute)
    } else if (!year && !month & !day) {
      this.solarDateTime = moment().utcOffset(8)
    } else {
      return new Error('Input value are not valid.')
    }

    this.lunarDate = LunarCalendar.solarToLunar(
      this.getSolarYear(), this.getSolarMonth(), this.getSolarDay()
    )
  }

  getSolarYear() {
    return this.solarDateTime.year()
  }

  getSolarMonth() {
    return this.solarDateTime.month()
  }

  getSolarDay() {
    return this.solarDateTime.day()
  }

  getSolarHour() {
    return this.solarDateTime.hour()
  }

  getSolarMinute() {
    return this.solarDateTime.minute()
  }

  _compileYear () {}
  _compileMonth () {}
  _compileLargeSegmentLimit () {}
  _compileMediumSegmentLimit () {}
  _compileSmallSegmentLimit () {}
  _compileDay () {}
  _compileHour () {}
  _compileLargeQuaterLimit () {}
  _compileSmallQuaterLimit () {}

  _compile () {
    this._compileYear()
    this._compileMonth()
    this._compileLargeSegmentLimit()
    this._compileMediumSegmentLimit()
    this._compileSmallSegmentLimit()
    this._compileDay()
    this._compileHour()
    this._compileLargeQuaterLimit()
    this._compileSmallQuaterLimit()  
    return this
  }

  toNineLimit() {
    this._compile()
    return this.result
  }

}

export default NineLimit
