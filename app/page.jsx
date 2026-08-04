"use client";
import { useState } from "react";

export default function Home() {
  const [playingVid, setPlayingVid] = useState(null);

  const recentVids = [
    {id: "gdZLi9oWNsA", title: "Dynamite", channel: "BANGTANTV", times: 7},
    {id: "7C2z4GqqS5E", title: "Seven - Jungkook", channel: "Jungkook", times: 12},
    {id: "XQO9E-TwYrw", title: "Boy With Luv", channel: "BANGTANTV", times: 3},
  ];

  return (
    <main style={{background: 'linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)', minHeight: '100vh', padding: '16px 16px 80px 16px'}}>
      <h1 style={{color: '#8000FF', fontWeight: 'bold', fontSize: '24px', textAlign: 'center'}}>borahae.fm 💜</h1>

      <div style={{textAlign: 'center', margin: '20px 0'}}>
        <img src="https://i.imgur.com/JqYeZ8X.png" style={{width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #8000FF'}} />
        <p style={{fontSize: '12px', color: '#666'}}>Settings me PFP change hoga</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px'}}>
        {["7/17 Missions", "102 Total Stream", "5 Days Streak", "Jungkook Top Artist"].map((item,i) => (
          <div key={i} style={{background: 'white', border: '2px solid #E0D4FF', padding: '15px', borderRadius: '16px', textAlign: 'center'}}>
            <b style={{color: '#8000FF', fontSize: '18px'}}>{item.split(" ")[0]}</b><br/>
            <small>{item.split(" ").slice(1).join(" ")}</small>
          </div>
        ))}
      </div>

      {playingVid && (
        <div onClick={() => setPlayingVid(null)} style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div onClick={(e) => e.stopPropagation()} style={{width: '95%', maxWidth: '500px', background: 'black', borderRadius: '16px', border: '3px solid #8000FF'}}>
            <iframe
              width="100%"
              height="250"
              src={"https://www.youtube.com/embed/" + playingVid + "?autoplay=1&rel=0"}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{borderRadius: '13px 13px 0 0'}}
            ></iframe>
            <button onClick={() => setPlayingVid(null)} style={{width: '100%', background: '#8000FF', color: 'white', border: 'none', padding: '10px', borderRadius: '0 0 13px 13px', fontWeight: 'bold'}}>✕ Close</button>
          </div>
        </div>
      )}

      <h2 style={{fontWeight: 'bold', color: '#333'}}>Recently Streamed</h2>
      {recentVids.map(v => (
        <div key={v.id} onClick={() => setPlayingVid(v.id)}
             style={{background: 'white', border: '2px solid #8000FF', borderRadius: '16px', padding: '12px', margin: '12px 0', display: 'flex', cursor: 'pointer'}}>
          <img src={"https://img.youtube.com/vi/" + v.id + "/mqdefault.jpg"} style={{width: '100px', borderRadius: '12px', border: '2px solid #8000FF'}}/>
          <div style={{marginLeft: '12px'}}>
            <b>{v.title}</b><br/>
            <small style={{color: '#666'}}>{v.channel}</small><br/>
            <span style={{color: '#8000FF', fontWeight: 'bold'}}>x{v.times}</span>
          </div>
        </div>
      ))}

      <nav style={{position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '2px solid #E0D4FF', display: 'flex', justifyContent: 'space-around', padding: '12px'}}>
        <a href="/" style={{color: '#8000FF', fontWeight: 'bold', textDecoration: 'none'}}>Home</a>
        <a href="/missions" style={{color: '#888', textDecoration: 'none'}}>Missions</a>
        <a href="/music" style={{color: '#888', textDecoration: 'none'}}>Music</a>
        <a href="/history" style={{color: '#888', textDecoration: 'none'}}>History</a>
        <a href="/settings" style={{color: '#888', textDecoration: 'none'}}>Settings</a>
      </nav>
    </main>
  )
}
