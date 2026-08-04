"use client";
import { useState } from "react";

export default function Home() {
  const [pfp, setPfp] = useState("");
  
  const recentVids = [
    {id: "gdZLi9oWNsA", title: "Dynamite", channel: "BANGTANTV", times: 7},
    {id: "7C2z4GqqS5E", title: "Seven", channel: "Jungkook", times: 12},
    {id: "XQO9E-TwYrw", title: "Boy With Luv", channel: "BANGTANTV", times: 3},
  ];

  return (
    <main style={{background:'linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)', minHeight:'100vh', padding:'16px', fontFamily:'Poppins'}}>
      <h1 style={{color:'#8000FF', fontWeight:'bold', fontSize:'24px', textAlign:'center'}}>borahae.fm 💜</h1>

      {/* PFP - chota kiya */}
      <div style={{textAlign:'center', margin:'20px 0'}}>
        <img src={pfp || "https://i.pravatar.cc/100"} style={{width:'80px', height:'80px', borderRadius:'50%', border:'4px solid #8000FF', boxShadow:'0 0 15px #8000FF'}} />
        <p style={{fontSize:'12px', color:'#666', marginTop:'5px'}}>Settings me PFP change karo</p>
      </div>

      {/* 4 Purple Boxes */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'20px'}}>
        {["7/17 Missions", "102 Total Stream", "5 Days Streak", "Jungkook Top Artist"].map((item,i) => (
          <div key={i} style={{background:'white', border:'2px solid #E0D4FF', padding:'15px', borderRadius:'16px', textAlign:'center', boxShadow:'0 4px 10px rgba(128,0,255,0.1)'}}>
            <b style={{color:'#8000FF', fontSize:'18px'}}>{item.split(" ")[0]}</b><br/>
            <small>{item.split(" ").slice(1).join(" ")}</small>
          </div>
        ))}
      </div>

      <h2 style={{fontWeight:'bold', color:'#333'}}>Recently Streamed</h2>
      {recentVids.map(v => (
        <a key={v.id} href={`https://youtube.com/watch?v=${v.id}`} target="_blank" 
           style={{textDecoration:'none', color:'black'}}>
          <div style={{background:'white', border:'2px solid #8000FF', borderRadius:'16px', padding:'12px', margin:'12px 0', display:'flex', boxShadow:'0 4px 12px rgba(128,0,255,0.15)'}}>
            <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} style={{width:'100px', borderRadius:'12px', border:'2px solid #8000FF'}}/>
            <div style={{marginLeft:'12px'}}>
              <b>{v.title}</b><br/>
              <small style={{color:'#666'}}>{v.channel}</small><br/>
              <span style={{color:'#8000FF', fontWeight:'bold', fontSize:'16px'}}>x{v.times}</span>
            </div>
          </div>
        </a>
      ))}

      {/* Bottom Nav */}
      <nav style={{position:'fixed', bottom:0, left:0, right:0, background:'white', borderTop:'2px solid #E0D4FF', display:'flex', justifyContent:'space-around', padding:'12px', boxShadow:'0 -4px 10px rgba(0,0,0,0.05)'}}>
        <a href="/" style={{color:'#8000FF', fontWeight:'bold', textDecoration:'none'}}>Home</a>
        <a href="/missions" style={{color:'#888', textDecoration:'none'}}>Missions</a>
        <a href="/music" style={{color:'#888', textDecoration:'none'}}>Music</a>
        <a href="/history" style={{color:'#888', textDecoration:'none'}}>History</a>
        <a href="/settings" style={{color:'#888', textDecoration:'none'}}>Settings</a>
      </nav>
    </main>
  )
}
