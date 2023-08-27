import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain1.png';
const Logo = ()=>{
    return(
    <div className='ma2 mt0 pa2'>
    <Tilt className='Tilt  br2 shadow-5'style={{ width:'350px',margin:'auto'}} >
        <div className='Tilt-inner' >
             <img src={brain} style={{ width:'40%'}} alt='logo'/>
             <p className='sans-serif fw2 white'>Smart Detect - Image Recoginition App </p>
         </div>
    </Tilt>
    </div>
        
    )
}
export default Logo;
