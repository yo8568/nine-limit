
/**
 * @copyright 2016 commenthol
 * @license MIT
 */

import moment from 'moment'
import LunarCalendar from 'lunar-calendar'
import ZhCnCommon from '../locales/zh-cn/common.json'
import ZhTwCommon from '../locales/zh-tw/common.json'
import ZhCnEarthlyBranches from '../locales/zh-cn/earthly-branches.json'
import ZhTWEarthlyBranches from '../locales/zh-tw/eearthly-branches.json'
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
  constructor (date) {
    this.locale = 'zh-TW'
    this.solarDateTime = moment().utcOffset(8).toDate()
    this.lunarDate = new CalendarChinese().fromDate(this.solarDateTime).get()
    
    this.hour = this.solarDateTime.getHours()
    this.minute = this.solarDateTime.getMinutes()
    this.second = this.solarDateTime.getSeconds()

    this.initialize()
    this.setSolarDateTime(date)

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
        value: '陰',
        unit: common['smallQuaterLimit']
      }
    }
  }

  getTranslation () {
    return locales.includes(this.locale)
      ? jsonsOfLocale[this.locale]
      : jsonsOfLocale['zh-TW']
  } 

  setSolarDateTime (date) {
    if (date) {
      this.solarDateTime = moment(date).utcOffset(8).toDate()
    } else {
      this.solarDateTime = moment().utcOffset(8).toDate()
    }
  }

  setLunarDateFromSolar() {
    const [cycle, year, month, leap, day] = new CalendarChinese().fromDate(this.solarDateTime).get()
    this._setYear(year)
    this._setYear(month)
  }

  _setYear (year) {
    this._year = year
  }

  year () {
    return this.getEHByOrder(this._year)
  }

  getEHByOrder(order) {
    const { earthlyBranches, heavenlyStems } = jsonsOfLocale[this.locale]
    const ebCounts = 12
    const hsCounts = 10
    
    return heavenlyStems[order % hsCounts] + earthlyBranches[order % ebCounts]
  }

  _setMonth (month) {
    this._month = month
  }

  month () {
    return this.getEHByOrder(this._month)
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
