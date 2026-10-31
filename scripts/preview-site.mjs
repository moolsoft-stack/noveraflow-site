import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import worker from '../_worker.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
// Local adapter for the Pages ASSETS binding. The same Worker handles HTTP routing.
export const assets = {
  async fetch(request) {
    const pathname = decodeURIComponent(new URL(request.url).pathname);
    let target = path.resolve(root,'.'+pathname);
    if (!target.startsWith(root+path.sep)) return new Response(null,{status:404});
    try {
      if ((await stat(target)).isDirectory()) target=path.join(target,'index.html');
      const body = await readFile(target);
      return new Response(body,{headers:{'Content-Type':mime[path.extname(target)] || 'application/octet-stream'}});
    } catch {
      return new Response(await readFile(path.join(root,'404.html')),{status:404,headers:{'Content-Type':mime['.html']}});
    }
  },
};
export async function startPreview(port=0, {webAppEnabled=false}={}) {
  const server = http.createServer(async (req,res)=>{
    try {
      const request = new Request(`http://${req.headers.host}${req.url}`,{method:req.method,headers:req.headers});
      const response = await worker.fetch(request,{ASSETS:assets,WEB_APP_ENABLED:webAppEnabled ? 'true' : undefined});
      res.writeHead(response.status,Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch (error) {
      res.writeHead(500);res.end('Local preview error');console.error(error);
    }
  });
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve);});
  return server;
}
if (process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  const server = await startPreview(Number(process.env.SITE_PREVIEW_PORT || 4173));
  console.log(`Local Pages-compatible preview: http://127.0.0.1:${server.address().port}`);
}
