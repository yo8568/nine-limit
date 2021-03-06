# Nine Limit

![build](https://travis-ci.org/yo8568/nine-limit.svg?branch=master)
![九極](/public/assets/nine-limit.png)

## 原理

根據西元 ***年月日時分*** 換算成農(陰)曆 ***年月日時分*** ，接著再利用換算過後的年月日時分再一次換算成九極格式。

### 九極格式

| 名稱   | 範例  |   單位與其順序 |
|-------|---------|--------------|
| 年極   | 已亥年  |   依農民曆算法  |
| 月極   | 戊辰月  |  依農民曆算法  |
| 大段極  | 戌大段  |  寅卯辰巳午未申酉戌亥子丑  |
| 中段極  | 酉中段  |  寅卯辰巳午未申酉戌亥子丑  |
| 小段極  | 水小段  |  木火土金水  |
| 日極    | 戊子日  |  依農民曆算法  |
| 時極    | 己未時  |  依農民曆算法  |
| 大刻極  | 戌大刻  |  寅卯辰巳午未申酉戌亥子丑  |
| 小刻極  | 陰小刻  |  陽陰  |

### 安裝

```bash
$ npm install nine-limit
```

### 使用

***toString()***

```javascript
const nineLimit = new NineLimit('2019-03-19 03:25')
  .toString()

console.log(nineLimit)
// 乙亥年 丁卯月 午大段 亥中斷 火小段 乙卯日 戊寅時 辰大刻 陽小刻
```

***toObject()***

```javascript
const nineLimit = new NineLimit('2019-03-19 03:25')
  .toObject()

console.log(nineLimit)
// { yearLimit: { label: '年極', value: '己亥', unit: '年' },
//   monthLimit: { label: '月極', value: '戊辰', unit: '月' },
//   largeSegmentLimit: { label: '大段極', value: '酉', unit: '大段' },
//   mediumSegmentLimit: { label: '中段極', value: '亥', unit: '中段' },
//   smallSegmentLimit: { label: '小段極', value: '水', unit: '小段' },
//   dayLimit: { label: '日極', value: '辛卯', unit: '日' },
//   hourLimit: { label: '時極', value: '乙未', unit: '時' },
//   largeQuaterLimit: { label: '大刻極', value: '辰', unit: '大刻' },
//   smallQuaterLimit: { label: '小刻極', value: '陽', unit: '小刻' }
//  }
```
