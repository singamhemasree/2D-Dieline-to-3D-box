import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'

export default function App(){
  const [p, setP] = useState(0)
  const W=3, H=1, D=2
  
  return(
    <div style={{display:'flex', height:'100vh', background:'#e8f4f8', fontFamily:'Arial'}}>
      
      {/* LEFT: SKY DIELINE */}
      <div style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:20}}>
        <h4 style={{color:'#4a7a9e', marginBottom:10}}>EASILY RESIZABLE DIELINE</h4>
        <svg width="320" height="400" viewBox="0 0 320 400">
          <defs>
            <pattern id="sky" patternUnits="userSpaceOnUse" width="320" height="400">
              <rect width="320" height="400" fill="#a8d5e5"/>
            </pattern>
          </defs>
          <g stroke="#333" strokeWidth="1.5" fill="url(#sky)">
            <rect x="110" y="10" width="100" height="60" rx="5" strokeDasharray="4 2"/>
            <rect x="10" y="70" width="100" height="80" rx="5" strokeDasharray="4 2"/>
            <rect x="110" y="70" width="100" height="80"/>
            <rect x="210" y="70" width="100" height="80" rx="5" strokeDasharray="4 2"/>
            <rect x="110" y="150" width="100" height="60" rx="5" strokeDasharray="4 2"/>
            <rect x="110" y="210" width="100" height="80"/>
            <rect x="110" y="290" width="100" height="60" rx="5" strokeDasharray="4 2"/>
          </g>
          {/* Clouds */}
          <circle cx="60" cy="100" r="15" fill="white"/><circle cx="75" cy="95" r="12" fill="white"/><circle cx="70" cy="110" r="14" fill="white"/>
          <circle cx="260" cy="100" r="18" fill="white"/><circle cx="275" cy="95" r="14" fill="white"/><circle cx="270" cy="110" r="16" fill="white"/>
          <circle cx="150" cy="240" r="20" fill="white"/><circle cx="170" cy="235" r="16" fill="white"/><circle cx="165" cy="250" r="18" fill="white"/>
          {/* Sun */}
          <circle cx="180" cy="260" r="20" fill="#f4b942"/><g stroke="#f4b942" strokeWidth="2">
            {[...Array(12)].map((_,i)=><line key={i} x1="180" y1="260" x2={180+35*Math.cos(i*Math.PI/6)} y2={260+35*Math.sin(i*Math.PI/6)}/>)}
          </g>
          {/* Moon */}
          <circle cx="130" cy="240" r="18" fill="#f4b942"/><circle cx="140" cy="235" r="18" fill="#a8d5e5"/>
          {/* Stars */}
          <text x="140" y="40" fontSize="14">✨</text><text x="180" y="35" fontSize="18">🌟</text><text x="200" y="45" fontSize="14">✨</text>
          <text x="50" y="120" fontSize="16">🌟</text><text x="270" y="120" fontSize="14">✨</text>
          <text x="140" y="180" fontSize="16">🌟</text><text x="170" y="170" fontSize="18">🌟</text><text x="190" y="185" fontSize="14">✨</text>
          <text x="160" y="340" fontSize="20" fontWeight="bold" fill="white">HEMASREE</text>
        </svg>
      </div>
      
      {/* RIGHT: 3D SKY BOX */}
      <div style={{flex:1, padding:20, background:'white'}}>
        <h3 style={{textAlign:'center', color:'#4a7a9e'}}>3D Mockup - HEMASREE</h3>
        <div style={{height:'70%', border:'1px solid #a8d5e5', borderRadius:8}}>
          <Canvas camera={{position:[4,3,5]}}>
            <ambientLight intensity={1.2}/>
            <directionalLight position={[5,10,7]}/>
            
            <group>
              {/* BOTTOM with Sun */}
              <mesh position={[0, -H/2, 0]}>
                <boxGeometry args={[W, 0.05, D]}/>
                <meshStandardMaterial color="#a8d5e5"/>
              </mesh>
              
              {/* FRONT */}
              <group position={[0, -H/2, D/2]} rotation={[-p*Math.PI/2, 0, 0]}>
                <mesh><boxGeometry args={[W, H, 0.05]}/><meshStandardMaterial color="#a8d5e5"/></mesh>
              </group>
              
              {/* BACK with HEMASREE */}
              <group position={[0, -H/2, -D/2]} rotation={[p*Math.PI/2, 0, 0]}>
                <mesh><boxGeometry args={[W, H, 0.05]}/><meshStandardMaterial color="#a8d5e5"/></mesh>
                <Text position={[0, 0, 0.03]} rotation={[0, Math.PI, 0]} fontSize={0.25} color="white">HEMASREE</Text>
              </group>
              
              {/* LEFT with Cloud */}
              <group position={[-W/2, -H/2, 0]} rotation={[0, p*Math.PI/2, 0]}>
                <mesh><boxGeometry args={[0.05, H, D]}/><meshStandardMaterial color="#a8d5e5"/></mesh>
              </group>
              
              {/* RIGHT with Cloud */}
              <group position={[W/2, -H/2, 0]} rotation={[0, -p*Math.PI/2, 0]}>
                <mesh><boxGeometry args={[0.05, H, D]}/><meshStandardMaterial color="#a8d5e5"/></mesh>
              </group>
              
              {/* TOP LID with Moon + Stars */}
              <group position={[0, H/2, -D/2]} rotation={[p*Math.PI/2, 0, 0]}>
                <mesh position={[0, 0, D/2]}>
                  <boxGeometry args={[W, 0.05, D]}/>
                  <meshStandardMaterial color="#a8d5e5"/>
                </mesh>
              </group>
            </group>
            <OrbitControls/>
          </Canvas>
        </div>
        
        <input type="range" min="0" max="1" step="0.01" value={p} 
          onChange={e=>setP(parseFloat(e.target.value))} 
          style={{width:'100%', marginTop:15, accentColor:'#4a7a9e'}}/>
        <div style={{display:'flex', justifyContent:'space-between', fontSize:12, color:'#4a7a9e'}}><span>Open</span><span>Close</span></div>
      </div>
    </div>
  )
}
