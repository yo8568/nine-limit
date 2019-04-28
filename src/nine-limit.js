
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
import ZhCnFiveElements from '../locales/zh-cn/five-elements.json'
import ZhTWFiveElements from '../locales/zh-tw/five-elements.json'
import ZhCnTwoLimits from '../locales/zh-cn/two-limits.json'
import ZhTWTwoLimits from '../locales/zh-tw/two-limits.json'

const jsonsOfLocale = {
  'zh-CN': {
    'common': ZhCnCommon,
    'earthlyBranches': ZhCnEarthlyBranches,
    'heavenlyStems': ZhCnHeavenlyStems,
    'fiveElements': ZhCnFiveElements,
    'twoLimits': ZhCnTwoLimits
  },
  'zh-TW': {
    'common': ZhTwCommon,
    'earthlyBranches': ZhTWEarthlyBranches,
    'heavenlyStems': ZhTWHeavenlyStems,
    'fiveElements': ZhTWFiveElements,
    'twoLimits': ZhTWTwoLimits
  }
}

const NINE_LIMIT_FORMAT = [
  'yearLimit', 'monthLimit',
  'largeSegmentLimit', 'mediumSegmentLimit', 'smallSegmentLimit',
  'dayLimit', 'hourLimit', 'largeQuaterLimit', 'smallQuaterLimit'
]

const locales = ['zh-TW', 'zh-CN']

class NineLimit {
  constructor (year, month, day, hour, minute) {
    this.locale = 'zh-TW'
    this.solarDateTime = moment().utcOffset(8)
    this.isLargeSegmentIncludesLastSegment = false
    this.initialize()
    this.setSolarDateTime(year, month, day, hour, minute)
  }

  initialize () {
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
        unit: common['smallQuaterLimitUnit']
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
      if (typeof year !== 'number') throw TypeError('Year is not number.')
      if (typeof month !== 'number') throw TypeError('Month is not number.')
      if (typeof day !== 'number') throw TypeError('Day is not number.')
      if (typeof hour !== 'number') throw TypeError('Hour is not number.')
      if (typeof minute !== 'number') throw TypeError('Minute is not number.')

      this.solarDateTime = moment()
        .year(year)
        .month(month - 1)
        .date(day)
        .hour(hour)
        .minute(minute)

      this.lunarDate = LunarCalendar.solarToLunar(
        this.getSolarYear(), this.getSolarMonth(), this.getSolarDay()
      )
      this.isLargeSegmentIncludesLastSegment = this.lunarDate.monthDays >= 28
    } else if (!year && !month & !day) {
      this.solarDateTime = moment().utcOffset(8)
      this.lunarDate = LunarCalendar.solarToLunar(
        this.getSolarYear(), this.getSolarMonth(), this.getSolarDay()
      )
      this.isLargeSegmentIncludesLastSegment = this.lunarDate.monthDays >= 28
    } else {
      throw TypeError('Input value are not valid.')
    }

    this.lunarDate = LunarCalendar.solarToLunar(
      this.getSolarYear(), this.getSolarMonth(), this.getSolarDay()
    )
    return this
  }

  getSolarYear () {
    return this.solarDateTime.year()
  }

  getSolarMonth () {
    return this.solarDateTime.month() + 1
  }

  getSolarDay () {
    return this.solarDateTime.date()
  }

  getSolarHour () {
    return this.solarDateTime.hour()
  }

  getSolarMinute () {
    return this.solarDateTime.minute()
  }

  _compileYearLimit () {
    this.result.yearLimit.value = this.lunarDate.GanZhiYear
  }

  _compileMonthLimit () {
    this.result.monthLimit.value = this.lunarDate.GanZhiMonth
  }

  /**
   * 2.5天為一組，以寅為開頭取農曆月算出大段極。
   * 算出落在某個大段，然後以餘數為基礎，從該大段的頭開始換算成小時，再以5小時為一組
   * 以寅為開頭，算出中段極。
   * 最後小段極為五小時的第幾位以木火土金水為排序取值。
   */
  _compileSegmentLimit () {
    const dateOrder = this.lunarDate.lunarDay
    const hour = this.getSolarHour()

    // 若超過整點再加1
    const hourOrder = (dateOrder - 1) + (hour >= 12 && this.getSolarMinute > 0 ? 0.5 : 0)
    const qOfLargeSegment = Math.ceil(hourOrder / 2.5 + (hourOrder % 2.5 === 0 ? 1 : 0))
    const rOfLargeSegment = hourOrder % 2.5
    const { earthlyBranches, fiveElements } = this.getTranslation()
    this.result.largeSegmentLimit.value = earthlyBranches[`e${qOfLargeSegment}`]

    const qOfMediumSegment = Math.ceil((rOfLargeSegment * 24 + hour + (this.getSolarMinute > 0 ? 1 : 0)) / 5)
    const rOfMediumSegment = ((rOfLargeSegment * 24 + hour + (this.getSolarMinute > 0 ? 1 : 0)) % 5) + 1
    this.result.mediumSegmentLimit.value = earthlyBranches[`e${qOfMediumSegment}`]
    this.result.smallSegmentLimit.value = fiveElements[`f${rOfMediumSegment}`]
  }

  _compileDayLimit () {
    this.result.dayLimit.value = this.lunarDate.GanZhiDay
  }
  _compileHourLimit () {
    const { earthlyBranches, heavenlyStems } = this.getTranslation()
    const startHeavenlyHour = (() => {
      const date = this.result.dayLimit.value
      if (date.includes(heavenlyStems['h1']) || date.includes(heavenlyStems['h6'])) return 1
      if (date.includes(heavenlyStems['h2']) || date.includes(heavenlyStems['h7'])) return 3
      if (date.includes(heavenlyStems['h3']) || date.includes(heavenlyStems['h8'])) return 5
      if (date.includes(heavenlyStems['h4']) || date.includes(heavenlyStems['h9'])) return 7
      if (date.includes(heavenlyStems['h5']) || date.includes(heavenlyStems['h10'])) return 9
    })()
    const hour = this.getSolarHour() + (this.getSolarMinute > 0 ? 1 : 0)

    // 以e1=寅時為開頭 所以要為移往前2位
    const lunarHour = hour % 2 === 0 ? (hour / 2) - 1 : ((hour + 1) / 2) - 1
    const heavenlyHourOrder = (() => {
      let orderBasedNormalEarthlyOrder = 0
      if (lunarHour + 2 > 12) orderBasedNormalEarthlyOrder = lunarHour + 2 - 12
      else orderBasedNormalEarthlyOrder = lunarHour + 2
      if (startHeavenlyHour + orderBasedNormalEarthlyOrder - 1 > 10) {
        return startHeavenlyHour + orderBasedNormalEarthlyOrder - 1 - 10
      } else {
        return startHeavenlyHour + orderBasedNormalEarthlyOrder - 1
      }
    })()

    // console.log(heavenlyHourOrder)
    this.result.hourLimit.value = heavenlyStems[`h${heavenlyHourOrder}`] + earthlyBranches[`e${lunarHour}`]
  }
  _compileQuaterLimit () {
    const { earthlyBranches, twoLimits } = this.getTranslation()
    const hour = this.getSolarHour()
    const minute = this.getSolarMinute()
    const quaterMins = (hour % 2 === 0 ? 1 : 0) * 60 + minute
    this.result.largeQuaterLimit.value = earthlyBranches[`e${Math.ceil(quaterMins / 10 + (quaterMins % 10 === 0 ? 1 : 0))}`]
    this.result.smallQuaterLimit.value = quaterMins % 10 < 5 ? twoLimits['t1'] : twoLimits['t2']
  }

  _compile () {
    this._compileYearLimit()
    this._compileMonthLimit()
    this._compileSegmentLimit()
    this._compileDayLimit()
    this._compileHourLimit()
    this._compileQuaterLimit()
    return this
  }

  toObject () {
    this._compile()
    return this.result
  }

  toString () {
    this._compile()
    return NINE_LIMIT_FORMAT.map(item => {
      return this.result[item].value + this.result[item].unit
    }).join(' ')
  }
}

export default NineLimit
