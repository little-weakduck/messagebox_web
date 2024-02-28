/*
 * @Author: Little Weak_Duck
 * @Date: 2024-02-28 22:43:03
 * @LastEditors: Little Weak_Duck
 * @LastEditTime: 2024-02-28 23:20:40
 * @FilePath: /src/api/comment.ts
 * @Description:  comment.ts
 */

import type { Comment } from '@/types/comment'
import instance, { type PaginationBody, type ResponseBody } from './instance'

const getCommentList = (params: { page?: number, size?: number }) => {
    return instance.get<ResponseBody<PaginationBody<Comment[]>>>('/comments', { params })
}

const createComment = (data:{content:string,title:string,author:string,parentId?:number}) => {
    return instance.get(`/comments}`, {data})
}

const deleteComment = (id: number) => {
    const data = { password: localStorage.getItem('ADMIN_PASSWORD')}
    return instance.delete(`/comments/${id}`, { data })
}

export default {
    getCommentList,
    createComment,
    deleteComment
}