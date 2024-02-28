/*
 * @Author: Little Weak_Duck
 * @Date: 2024-02-25 12:08:59
 * @LastEditors: Little Weak_Duck
 * @LastEditTime: 2024-02-28 23:17:34
 * @FilePath: /src/types/comment.ts
 * @Description: comment type
 */

export interface Comment {
    id: number;
    content: string;
    title: string;
    author: string;
    updatedAt: Date | number;
    parent?: Comment;
}

