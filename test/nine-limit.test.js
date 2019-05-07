import NineLimit from '../src/nine-limit'

test('2019 4/24 13:23', () => {
  const result = new NineLimit(2019, 4, 24, 13, 23).toObject()
  expect(result.yearLimit.value).toBe('己亥')
  expect(result.monthLimit.value).toBe('戊辰')
  expect(result.largeSegmentLimit.value).toBe('酉')
  expect(result.mediumSegmentLimit.value).toBe('亥')
  expect(result.smallSegmentLimit.value).toBe('水')
  expect(result.dayLimit.value).toBe('辛卯')
  expect(result.hourLimit.value).toBe('乙未')
  expect(result.largeQuaterLimit.value).toBe('辰')
  expect(result.smallQuaterLimit.value).toBe('陽')
  expect(new NineLimit(2019, 4, 24, 13, 23).toString()).toBe('己亥年 戊辰月 酉大段 亥中段 水小段 辛卯日 乙未時 辰大刻 陽小刻')
})

test('2019 4/10 07:50', () => {
  const result = new NineLimit(2019, 4, 10, 7, 50).toObject()
  expect(result.yearLimit.value).toBe('己亥')
  expect(result.monthLimit.value).toBe('戊辰')
  expect(result.largeSegmentLimit.value).toBe('辰')
  expect(result.mediumSegmentLimit.value).toBe('卯')
  expect(result.smallSegmentLimit.value).toBe('土')
  expect(result.dayLimit.value).toBe('丁丑')
  expect(result.hourLimit.value).toBe('甲辰')
  expect(result.largeQuaterLimit.value).toBe('未')
  expect(result.smallQuaterLimit.value).toBe('陽')
  expect(new NineLimit(2019, 4, 10, 7, 50).toString()).toBe('己亥年 戊辰月 辰大段 卯中段 土小段 丁丑日 甲辰時 未大刻 陽小刻')
})


test('2019 3/19 03:01', () => {
  const result = new NineLimit(2019, 3, 19, 3, 1).toObject()
  expect(result.yearLimit.value).toBe('己亥')
  expect(result.monthLimit.value).toBe('丁卯')
  expect(result.largeSegmentLimit.value).toBe('午')
  expect(result.mediumSegmentLimit.value).toBe('子')
  expect(result.smallSegmentLimit.value).toBe('火')
  expect(result.dayLimit.value).toBe('乙卯')
  expect(result.hourLimit.value).toBe('戊寅')
  expect(result.largeQuaterLimit.value).toBe('寅')
  expect(result.smallQuaterLimit.value).toBe('陽')
  expect(new NineLimit(2019, 3, 19, 3, 1).toString()).toBe('己亥年 丁卯月 午大段 子中段 火小段 乙卯日 戊寅時 寅大刻 陽小刻')
})