import React from 'react';
import './ImageFormLink.css';
const ImageLinkForm = ({onInputChange, onButtonSubmit})=>{
    return(
      <div >
        <p className="f3 fw2 white ma1">
            {'This Smart thing will detect faces in pictures.Try it out.....'}
        </p>
        <div className='center'>
        <div className='form pa br3'>
          <input  style={{border: 'none',margin:'1em'}} type='tex' className='ph4 pv2  br3' onChange={onInputChange}/>
          <button style={{border: 'none'}}
          onClick={onButtonSubmit}
          className='f5 grow dim  ph4 pv2  br3 dib white bg-dark-gray'>Detect</button>
        </div>
        </div>
        
      </div>
    )
}
export default ImageLinkForm;