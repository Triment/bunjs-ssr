import { existsSync, statSync } from "fs";
import * as path from "path";
import { join } from "path";
import { ServerComponent } from "./render/_default.server";
import { GetPageFileList } from "./utils/GetPageFileList";


const PROJECT_ROOT = import.meta.dir;
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, "public");
const BUILD_DIR = path.resolve(PROJECT_ROOT, "build");

const router = new Bun.FileSystemRouter({
  style: 'nextjs',
  dir: './pages',
})

//console.log((router.match("/main?uiui=90")))


await Bun.build({
  entrypoints: [...GetPageFileList('./render'),...GetPageFileList('./pages')],
  outdir: "./build",
  root: '.',
  splitting: true
});
function serveFromDir(config: {
  directory: string;
  path: string;
}): Response | null {
  let basePath = path.join(config.directory, config.path);
  const suffixes = ["", ".html", "index.html"];

  for (const suffix of suffixes) {
    try {
      const pathWithSuffix = path.join(basePath, suffix);
      const stat = statSync(pathWithSuffix);
      if (stat && stat.isFile()) {
        return new Response(Bun.file(pathWithSuffix));
      }
    } catch (err) {}
  }

  return null;
}

const server = Bun.serve({
  async fetch(request) {
    let reqPath = new URL(request.url).pathname;
    console.log(request.method, reqPath);
    // if(){
    //   import()
    // }
    const matched = router.match(request.url)
    if(matched){
      let js = ''
      if(!existsSync(join('./build/pages', matched.src.replace('.tsx', '.js')))
      && existsSync(join('./build/pages', matched.src.replace('.tsx', '/index.js')))){
        js = `/pages/${matched.src.replace('.tsx', '/index.js')}`
      } else {
        js = `/pages/${matched.src.replace('.tsx', '.js')}`
      }

      const res = await ServerComponent(matched.query, matched.filePath, js)
      return new Response(res, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      })
    }
    if (reqPath === "/") reqPath = "/index.html";

    // check public
    const publicResponse = serveFromDir({
      directory: PUBLIC_DIR,
      path: reqPath,
    });
    if (publicResponse) return publicResponse;

    // check /.build
    const buildResponse = serveFromDir({ directory: BUILD_DIR, path: reqPath });
    if (buildResponse) return buildResponse;

    return new Response("File not found", {
      status: 404,
    });
  },
});

console.log(`Listening on http://localhost:${server.port}`);
