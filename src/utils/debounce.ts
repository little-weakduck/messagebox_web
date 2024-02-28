/*
 * @Author: Little Weak_Duck
 * @Date: 2024-02-29 01:07:48
 * @LastEditors: Little Weak_Duck
 * @LastEditTime: 2024-02-29 01:07:49
 * @FilePath: /src/utils/debounce.ts
 * @Description:  debounce
 */

export default function debounce(fn: Function, delay: number) {
    let timer: number
    return function (...args: any[]) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
