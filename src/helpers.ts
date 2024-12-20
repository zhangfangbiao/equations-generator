import { Flag, FromData, Info } from './types'

export const LINE = 25

export const getFlag = (flags: Flag[]) => {
    return flags[Math.floor(Math.random() * flags.length)]
}

/** 获取参与运算的第一个数first与第二个数second和符号flag */
export const getInfo = (params: FromData): Info => {
    const { max, flags } = params
    const flag = getFlag(flags)
    let first: number
    let second: number

    switch (flag) {
        case Flag.plus:
            first = Math.floor(Math.random() * (max + 1))
            second = Math.floor(Math.random() * (max + 1 - first))
            break
        case Flag.minus:
            first = Math.floor(Math.random() * (max + 1))
            second = Math.floor(Math.random() * (first + 1))
            break
        case Flag.multiply:
            first = Math.floor(Math.random() * Math.floor(Math.sqrt(max))) + 1
            second = Math.floor(Math.random() * (Math.floor(max / first) + 1))
            break
        case Flag.divide:
            second = Math.floor(Math.random() * max) + 1 // 除数不能为0
            first = second * Math.floor(Math.random() * (Math.floor(max / second) + 1))
            break
        default:
            first = 0
            second = 0
    }

    return { first, second, flag }
}
