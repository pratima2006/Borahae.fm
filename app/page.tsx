"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [pfp, setPfp] = useState("");
  
  const recentVids = [
    {id: "gdZLi9oWNsA", title: "Dynamite", channel: "BANGTANTV", times: 7},
    {id: "7C2z4GqqS5E", title: "Seven", channel: "Jungkook", times: 12},
    {id: "XQO9E-TwYrw", title: "Boy With Luv", channel: "BANGTANTV", times: 3},
  ];

  return (
    <main style={{background:'#fff', minHeight:'100vh', padding:'16px', fontFamily:'Poppins'}}>
      <header style={{display:'flex', justifyContent:'space-between'}}>
        <h1 style={{color:'#8000FF', fontWeight:'bold'}}>borahae.fm 💜</h1>
        <Link href="/missions" style={{background:'#8000FF', color:'white', padding:'8px 12px', borderRadius:'8px'}}>Missions</Link>
      </header>

      {/* PFP Section */}
      <div style={{textAlign:'center', margin:'20px 0'}}>
        <img src={pfp || "https://via.placeholder.com/100"} style={{width:'100px', height:'100px', borderRadius:'50%', border:'3px solid #8000FF'}} />
        <br/>
        <input type="file" onChange={(e)=> setPfp(URL.createObjectURL(e.target.files[0]))} style={{marginTop:'8px'}}/>
      </div>

      {/* 4 Boxes */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'20px'}}>
        <div style={{border:'1px solid #ddd', padding:'10px', borderRadius:'10px', textAlign:'center'}}>7/17<br/><small>Missions</small></div>
        <div style={{border:'1px solid #ddd', padding:'10px', borderRadius:'10px', textAlign:'center'}}>102<br/><small>Total Stream</small></div>
        <div style={{border:'1px solid #ddd', padding:'10px', borderRadius:'10px', textAlign:'center'}}>5 Days<br/><small>Streak</small></div>
        <div style={{border:'1px solid #ddd', padding:'10px', borderRadius:'10px', textAlign:'center'}}>Jungkook<br/><small>Top Artist</small></div>
      </div>

      {/* Recent 7 MVs */}
      <h2 style={{fontWeight:'bold'}}>Recently Streamed</h2>
      {recentVids.map(v => (
        <div key={v.id} style={{border:'2px solid #8000FF', borderRadius:'12px', padding:'10px', margin:'10px 0', display:'flex'}}>
          <img src={`https://img.youtube.com/vi/${v.id}/0.jpg`} style={{width:'80px', borderRadius:'8px'}}/>
          <div style={{marginLeft:'10px'}}>
            <b>{v.title}</b><br/>
            <small>{v.channel}</small><br/>
            <span style={{color:'#8000FF', fontWeight:'bold'}}>x{v.times}</span>
          </div>
        </div>
      ))}

      {/* Bottom Nav */}
      <nav style={{position:'fixed', bottom:0, left:0, right:0, background:'white', borderTop:'1px solid #ddd', display:'flex', justifyContent:'space-around', padding:'10px'}}>
        <Link href="/">Home</Link><Link href="/missions">Missions</Link><Link href="/music">Music</Link><Link href="/history">History</Link><Link href="/settings">Settings</Link>
      </nav>
    </main>
  )
}
