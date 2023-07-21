import { createRoot, hydrateRoot } from "react-dom/client";

let root: any;

function render() {
  console.log(window.location);
  const container = document.getElementById("root");
  window.onload = ()=>{
    let js = ''
    // if(existsSync("../pages"+window.location.pathname+'.tsx')){
    //   js = "../pages"+window.location.pathname+'.js'
    // }
    // if(existsSync(join("../pages"+window.location.pathname+'.tsx'))){
    //   js = "../pages"+window.location.pathname+'.js'
    // }
    import("../pages"+window.location.pathname+'.js').then(({ Page }) => {
      if (container && container.innerHTML === "") {
        if (!root) {
          root = createRoot(container!);
        }
        root.render(<Page {...window.CTX_STATE} />);
      } else {
        hydrateRoot(container!, <Page {...window.CTX_STATE} />);
      }
    }).catch(e=>{
      import("../pages"+window.location.pathname+'/index.js').then(({ Page }) => {
        if (container && container.innerHTML === "") {
          if (!root) {
            root = createRoot(container!);
          }
          root.render(<Page {...window.CTX_STATE} />);
        } else {
          hydrateRoot(container!, <Page {...window.CTX_STATE} />);
        }
      })
    });
  }
  
}
render();
