import React from 'react'

export default function Spacer({className}:{className?:string}) {
  return (
    <div className={`w-full h-[1px] bg-slate-400 ${className}`}></div>
  )
}
