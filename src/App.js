import React,{Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import FaceRecoginition from './Components/FaceRecoginition/FaceRecoginition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Signin from './Components/Signin/Signin';
import Rank from './Components/Rank/Rank';
import Register from './Components/Register/Register';
import ParticlesBg from 'particles-bg';

import './App.css';


const returnClarifairRequestOptions=(imageUrl)=>{
  ///////////////////////////////////////////////////////////////////////////////////////////////////
      // In this section, we set the user authentication, user and app ID, model details, and the URL
      // of the image we want as an input. Change these strings to run your own example.
      //////////////////////////////////////////////////////////////////////////////////////////////////
  
      // Your PAT (Personal Access Token) can be found in the portal under Authentification
      const PAT = '58f9b1307bba456f8d5f5585e0c2e7ea';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = 'geetika333';       
      const APP_ID = 'facedetect';
      // Change these to whatever model and image URL you want to use
      const MODEL_ID = 'face-detection';
      // const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
      const IMAGE_URL = imageUrl;
       ///////////////////////////////////////////////////////////////////////////////////
      // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
      ///////////////////////////////////////////////////////////////////////////////////
  
      const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
  return requestOptions
  }
      
const initialState={
        input:'',
        imageUrl:'',
        box:{},
        route:'signin',
        isSignedIn:false,
        user:{
          id:'',
          name:'',
          email:'',
          entries:0,
          joinedDate : ''
        }
}
class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }
 
    loadUser=(data)=>{
      this.setState({user : { 
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joinedDate : data.joinedDate
    }})
      }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; //data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height);
    return {
      leftCol: clarifaiFace.left_col * width,  //clarifaiFace.left_col is percentage which is multiplied by width of image
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width), //total percentage minus percentage from left hand side 
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    this.setState({ box});
  }

  onInputChange =(event)=>{
    this.setState({input: event.target.value});
  } 
 
  onButtonSubmit =()=>{
     this.setState({imageUrl: this.state.input});
     fetch("https://api.clarifai.com/v2/models/" + 'face-detection'  + "/outputs", returnClarifairRequestOptions(this.state.input))
     .then(response => response.json())
     .then(response => {
      if(response){
        fetch('http://localhost:3000/image',{
          method:'put',
          headers : {'Content-Type': 'application/json'},
          body: JSON.stringify({
          id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
        .catch(console.log);
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
    }

onRouteChange=(route)=>{
  if(route==='signout'){
    this.setState(initialState);
  }else if(route==='home'){
    this.setState({isSignedIn: true});
  }
  this.setState({route: route});
}
render(){
    return (
      <div className="App">
      <ParticlesBg type="cobweb" color='60efff' num={200} bg={true} />
        
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route==='home'
        ?
        <div>
        <Logo/>
            <ImageLinkForm 
             onInputChange={this.onInputChange} 
             onButtonSubmit={this.onButtonSubmit}
             />
        <Rank name={this.state.user.name} 
        entries={this.state.user.entries}/>
        <FaceRecoginition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        :(
          this.state.route=='signin'
          ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
        
        
        }
      </div>
    );
  }
}

export default App;