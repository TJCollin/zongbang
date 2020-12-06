export const numberFormat = (value) => {
  // 小于10000直接显示
  const base = 10000
  if(value < base) {
    return value
  }
  else {
    let fixedVal = (value/base).toFixed(2)
    return `${fixedVal}万`
  }
}