export default class baseFloat {
  static isInteger (value: number): boolean {
    return Math.floor(value) === value
  }

  static toInteger (floatNum: number) {
    let ret: any = { times: 1, num: 0 }
    if (baseFloat.isInteger(floatNum)) {
      ret.num = floatNum
      return ret
    }
    let strfi: string = floatNum + ''
    let point: number = strfi.indexOf('.')
    let length: number = strfi.substr(point + 1).length
    ret.times = Math.pow(10, length)
    let numCount: any = floatNum * ret.times + 0.5
    ret.num = parseInt(numCount, 10)
    return ret
  }

  static add (valueTotal: number, value: number): number {
    return baseFloat.floatComputed(valueTotal, value, 'add')
  }

  static subtract (valueTotal: number, value: number): number {
    return baseFloat.floatComputed(valueTotal, value, 'subtract')
  }

  static multiply (valueTotal: number, value: number):number {
    return baseFloat.floatComputed(valueTotal, value, 'multiply')
  }

  static divide (valueTotal: number, value: number): number {
    return baseFloat.floatComputed(valueTotal, value, 'divide')
  }

  static multiplyPrec (valueTotal: number, value: number, prec: number = 2): number {
    let result = baseFloat.floatComputed(valueTotal, value, 'multiply')
    return Number(result.toFixed(prec))
  }

  static dividePrec (valueTotal: number, value: number, prec: number = 2): number {
    let result = baseFloat.floatComputed(valueTotal, value, 'divide')
    return Number(result.toFixed(prec))
  }

  static floatComputed (valueTotal: number, value: number, mode: string): any {
    let valueTotalTo = baseFloat.toInteger(valueTotal)
    let valueTo = baseFloat.toInteger(value)
    let valueTotalNum = valueTotalTo.num
    let valueNum = valueTo.num
    let valueTotalTime = valueTotalTo.times
    let valueTime = valueTo.times
    let max = valueTotalTime > valueTime ? valueTotalTime : valueTime
    let result = null
    switch (mode) {
      case 'add':
        if (valueTotalTime === valueTime) {
          result = valueTotalNum + valueNum
        } else if (valueTotalTime > valueTime) {
          result = valueTotalNum + valueNum * (valueTotalTime / valueTime)
        } else {
          result = valueTotalNum * (valueTime / valueTotalTime) + valueNum
        }
        return result / max
      case 'subtract':
        if (valueTotalTime === valueTime) {
          result = valueTotalNum - valueNum
        } else if (valueTotalTime > valueTime) {
          result = valueTotalNum - valueNum * (valueTotalTime / valueTime)
        } else {
          result = valueTotalNum * (valueTime / valueTotalTime) - valueNum
        }
        return result / max
      case 'multiply':
        result = (valueTotalNum * valueNum) / (valueTotalTime * valueTime)
        return result
      case 'divide':
        return (function () {
          let num = valueTotalNum / valueNum
          let times = valueTime / valueTotalTime
          return baseFloat.floatComputed(num, times, 'multiply')
        }())
    }
  }
}
