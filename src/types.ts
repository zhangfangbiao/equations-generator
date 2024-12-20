export enum Flag {
    plus = '+',
    minus = '-',
    multiply = '*',
    divide = '÷'
}

export interface FromData {
    /**
     * max以内的加减乘除运算
     * 如果是加法，结果最大为max，
     * 如果是减法，参与运算数最大为max，结果最小为0，
     * 如果是乘法，结果最大为max，
     * 如果是除法，参与运算数最大为max，结果最小为0，
     */
    max: number,
    /** 允许的运算符 */
    flags: Flag[],
}

export interface Info {
    first: number,
    second: number,
    flag: Flag
}
