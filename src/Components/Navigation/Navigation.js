import React from "react";

const Navigation = ({onRouteChange,isSignedIn})=>{
    if(isSignedIn){
        return(
        <nav style={{display:'flex',justifyContent:'flex-end',background:'#42047e',opacity:'0.7',paddingRight:'3em'}}>
        <p
        //  className="f3 link dim white ba br4 pa3 pointer"
        onClick={()=>onRouteChange('signout')}
        className="f6 grow no-underline pa2 br-pill ba bw1 ph3 pv2 mb2 dib white pointer"
        >Sign Out</p>
        </nav>
        )
    }else{
        return(
            <nav style={{display:'flex',justifyContent:'flex-end',background:'#42047e',opacity:'0.7',paddingRight:'3em'}}>
        <p
        //  className="f3 link dim white ba br4 pa3 pointer"
        onClick={()=>onRouteChange('signin')}
        className="f6 grow no-underline pa2 br-pill ba bw1 ph3 pv2 mb2 dib white pointer"
        >Sign In</p>
        <p
        //  className="f3 link dim white ba br4 pa3 pointer"
        onClick={()=>onRouteChange('register')}
        className="f6 grow no-underline pa2 br-pill ba bw1 ph3 pv2 mb2 dib white pointer"
        >Register</p>
        </nav>
        
        )

    }

}

export default Navigation;

