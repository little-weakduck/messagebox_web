/*
 * @Author: Little Weak_Duck
 * @Date: 2024-02-28 22:41:03
 * @LastEditors: Little Weak_Duck
 * @LastEditTime: 2024-02-28 23:00:50
 * @FilePath: /src/api/instance.ts
 * @Description:  instance
 */

import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResponseBody<T = any> {
    status: string;
    message: string;
    data: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PaginationBody<T = any> {
    total: number;
    page: number;
    pageSize: number;
    data: T;
}

const instance = axios.create({
  baseURL: '/api',
  timeout: 30000
})

export default instance