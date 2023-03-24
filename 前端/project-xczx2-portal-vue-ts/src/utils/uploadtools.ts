import { upRegister, checkchunk, upChunk, mergeChunks } from '@/api/upload'
import CryptoJS from 'crypto-js'
export const uploadByPieces = ({ file, pieceSize = 2, success, error }:any) => {
    // 上传过程中用到的变量
    let fileMD5 = ""; // md5加密文件的标识
    const chunkSize = pieceSize * 1024 * 1024; // 分片大小
    const chunkCount = Math.ceil(file.size / chunkSize); // 总片数
    
    //得到某一片的分片
    const getChunkInfo = (file, currentChunk, chunkSize) => {
      let start = currentChunk * chunkSize;
      let end = Math.min(file.size, start + chunkSize);
      let chunk = file.raw.slice(start, end);
      return chunk;
    };

    // 第一步
    const readFileMD5 = () => {
      //得到第一片和最后一片
      const startChunk = getChunkInfo(file, 0, chunkSize);
      const endChunk = getChunkInfo(file, chunkCount - 1, chunkSize);
      //对第一片进行转码然后md5加密，网上很多是直接对整个文件转码加密得到标识，但是我发现大文件尤其是几个G的文件会崩溃，所以我是先分片然后取第一片加密
      let fileRederInstance = new FileReader();
      fileRederInstance.readAsBinaryString(file.raw);
      fileRederInstance.addEventListener("load", (e) => {
      let fileBolb = (e.target as any).result;
      fileMD5 = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(fileBolb)).toString()
        // 上传前提交注册 - 参数
        const params = {
          fileMd5:fileMD5
          // fileName:file.name,
          // fileSize:file.size,
          // mimetype:file.raw.type,
          // fileExt:file.name.split('.').at(-1)
        }
        // 上传前提交注册 - 接口调用
        upRegister(params).then(res => {
          if (res.code == 0){
            readChunkMD5(0)
          }
        }).catch(err => error(err))
        
      });
    };

    // 针对每个分片文件进行上传处理
    const readChunkMD5 = async (num) => {
      if (num <= chunkCount - 1) {
       //得到当前需要上传的分片文件
        const chunk = getChunkInfo(file, num, chunkSize);
        // 上传分块前检查
        //await checkchunk({fileMd5:fileMD5,chunk:num,chunkSize:chunkCount}).then( async res => {
          await checkchunk({fileMd5:fileMD5,chunk:num}).then( async res => {
          if (res.code == 0 && res.result == false){
            // 分块上传
            let fetchForm = new FormData();
            fetchForm.append("file", chunk);
            fetchForm.append("fileMd5", fileMD5);
            fetchForm.append("chunk", num);
            await upChunk(fetchForm).then(async res => {
              // 上传成功
              success({num, chunkCount, state:'uploading'})
              if(res.code == 0){
                readChunkMD5(num+1) 
              }
            }).catch(err => {
              error(err)
            })
          } else {
            success({num, chunkCount, state:'uploading'})
            readChunkMD5(num+1) 
          }
        })
      } else {
        // 上传结束请求合并
        // 提交合并
        mergeChunks({
          fileMd5:fileMD5,
          fileName:file.name,
          chunkTotal:chunkCount
          // mimetype:file.raw.type,
          // fileExt:file.name.split('.').at(-1) 
        }).then(res => {
            // 合并成功了
            success({num, chunkCount, state:'success'})
          }).catch(err => {
              error(err)
          })
      }
    };

    readFileMD5(); // 开始执行代码
  }