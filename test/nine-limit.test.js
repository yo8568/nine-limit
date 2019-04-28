import NineLimit from '../src/nine-limit'

test('NineLimit', () => {
  console.log(new NineLimit().toNineLimit())
})

// test('Test some examples', () => {
//   test('2019 4/24 13:23', () => {
//     const result = new NineLimit(2019, 4, 24, 13, 23).toNineLimit()
//     expect(result).toBe('己亥年 戊辰月 酉大段 亥中段 水小段 辛卯日 乙未時 辰大刻 陽小刻')
//   })

//   test('2019 4/10 07:50', () => {
//     const result = new NineLimit(2019, 4, 24, 13, 23).toNineLimit()
//     expect(result).toBe('己亥年 戊辰月 辰大段 卯中段 土小段 丁丑日 甲辰時 未大刻 陽小刻')
//   })

//   test('2019 3/19 03:01', () => {
//     const result = new NineLimit(2019, 4, 24, 13, 23).toNineLimit()
//     expect(result).toBe('己亥年 丁卯月 午大段 子中段 火小段 乙卯日 戊寅時 寅大刻 陽小刻')
//   })
// })