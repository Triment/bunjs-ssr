import { readdirSync, statSync } from "fs";
import { join } from "path";

// 遍历文件
export function GetPageFileList(rootPath: string){
  const basePath = join(new URL(import.meta.url).pathname, "../../", rootPath)
  const queue = [basePath]
  const result  = []
  for(const url of queue){
    if(statSync(url).isDirectory()){
      for (const subDir of readdirSync(url)){
        queue.push(join(url, subDir))
      }
    } else {
      result.push(url)
    }
  }
  return result
}