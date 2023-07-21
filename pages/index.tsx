import { useEffect } from "react"

export function Page(){
  // const [i, setI] = useState(0)
  useEffect(()=>{
    alert("hh")
  },[])
  return <div style={ { color: '#aaa'}}>hello index</div>
}