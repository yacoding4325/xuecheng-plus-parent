import { createFormAPI, uploadVideo } from '@/utils/request'

// 上传注册
// fileMd5=c5c75d70f382e6016d2f506d134eee11&fileName=1.avi&fileSize=51&mimetype=video/x-msvideo&fileExt=avi

export async function upRegister(params: any) {
    const { data } = await createFormAPI('/media/upload/checkfile', 'post', params, 'application/x-www-form-urlencoded;')
    return data
  }

// ### 上传分块前检查 - 
// fileMd5=c5c75d70f382e6016d2f506d134eee11&chunk=0&chunkSize=51

export async function checkchunk(params: any) {
    const { data } = await createFormAPI('/media/upload/checkchunk', 'post', params, 'application/x-www-form-urlencoded;')
    return data
}  

// ### 上传分块文件
// fileMd5=c5c75d70f382e6016d2f506d134eee11&chunk=1 Content-Type: multipart/form-data; boundary=WebAppBoundary

export async function upChunk(params: any) {
    const { data } = await uploadVideo('/media/upload/uploadchunk', 'post', params, 'multipart/form-data; boundary=WebAppBoundary')
    return data
}    

// ### 合并文件
// fileMd5=dcb37b85c9c03fc5243e20ab4dfbc1c8&fileName=8.avi&chunkSum=1&mimetype=video/x-msvideo&fileExt=avi

export async function mergeChunks(params: any) {
    const { data } = await createFormAPI('/media/upload/mergechunks', 'post', params, 'application/x-www-form-urlencoded;')
    return data
}   