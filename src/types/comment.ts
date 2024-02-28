/*
 * @Author: Little Weak_Duck
 * @Date: 2024-02-25 12:08:59
 * @LastEditors: Little Weak_Duck
 * @LastEditTime: 2024-02-26 10:06:26
 * @FilePath: /src/types/comment.ts
 * @Description: comment type
 */

export interface Comment {
    id: string;
    content: string;
    title: string;
    author: string;
    updateAt: Date;
    parent?: Comment;
}

