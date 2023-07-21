export const Page = ({id}:{id?:string}) => {
  console.log(id)
  return <div onClick={()=>console.log(id)}>pageindex{id}</div>
}