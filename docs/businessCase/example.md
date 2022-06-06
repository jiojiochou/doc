## 实现大文件快速上传

##### 1.思路:

```ts
1.压缩文件资源
2.文件资源分块, 再上传


问题一: 	" 谁负责资源分块,谁负责整合 "

前端负责分块, 后端负责整合

问题二:	" 服务端怎么知道什么时候要整合资源? 还要保证资源的有序性 "

由于资源分块, 原来 1 个文件对应 1 个上传请求, 现在 1 个文件对应 n 个上传请求
前端可以基于 Promise.all 将多个接口整合, 上传完成再发送一个合并请求, 通知服务端进行合并
前端要定好每个文件对应的序号, 并将当前的分块 序号以及文件Hash 等信息一起发送给服务端, 服务端在进行合并时, 通过序号进行依次合并即可

问题三:	"如果某个分块的上传请求失败了，怎么办？"

一旦服务端某个上传请求失败，会返回当前分块失败的信息，其中会包含文件名称、文件 hash、分块大小以及分块序号等，
前端拿到这些信息后可以进行重传，同时考虑此时是否需要将 Promise.all 替换为 Promise.allSettled 更方便.
```

##### 1.1  前端如何分块

```ts
1.选择资源
2.得到对应的文件对象 File ,File.prototype.slice === Blob.prototype.slice 俩方法可以实现资源的分块
```

##### 2. 请求模块

```ts
import axios from "axios";

const baseURL = 'http://localhost:8080';

export const uploadFile = (url, formData, onUploadProgress = () => { }) => {
  return axios({
    method: 'post',
    url,
    baseURL,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData,
    onUploadProgress
  });
}

export const mergeChunks = (url, data) => {
  return axios({
    method: 'post',
    url,
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  });
}
```
