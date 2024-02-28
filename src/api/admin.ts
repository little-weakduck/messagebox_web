/*
 * @Author: Little Weak_Duck
 * @Date: 2024-02-28 22:46:35
 * @LastEditors: Little Weak_Duck
 * @LastEditTime: 2024-02-28 22:56:34
 * @FilePath: /src/api/admin.ts
 * @Description: admin
 */


import instance from './instance'

const checkAdminCorrect = (data: { password: string }) => {
    return instance.post(`/admin/check`, data)
}

const changeAdminPassword = (data: { oldPassword: string, newPassword: string, check: string }) => {
    return instance.post(`/admin`, data)
}

export default {
    checkAdminCorrect,
    changeAdminPassword
}