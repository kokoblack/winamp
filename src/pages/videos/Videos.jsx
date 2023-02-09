import React from 'react'
import SideNav from '../home/SideNav'

const Videos = () => {
  return (
    <div>
      <SideNav/>
      {[
    ['Home', '/dashboard'],
    ['Team', '/team'],
    ['Projects', '/projects'],
    ['Reports', '/reports'],
  ].map(([title, url]) => (
    <a href={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
  ))}

    </div>
  )
}

export default Videos