/*
 * @Author: Little Weak_Duck
 * @Date: 2024-02-28 22:42:56
 * @LastEditors: Little Weak_Duck
 * @LastEditTime: 2024-02-28 22:57:38
 * @FilePath: /src/api/index.ts
 * @Description: 
 */

import comment from "./comment";
import admin from "./admin";

export default {
    ...comment,
    ...admin
}