import { renderToString } from "react-dom/server"



export const ServerComponent = async (ctx:any, ComponentPath:string, src: string) => {
  const component = (await import(ComponentPath)).Page
  return `<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body >
    <div id="root">${renderToString(component(ctx))}</div>
  </body>
  <script>window.CTX_STATE = ${JSON.stringify(ctx).toString()}</script>
  <script type="module" src="${src}"></script>
  <script type="module" src="/render/_default.client.js"></script>
  </html>`
}