import React, { Component} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import SignIn from './components/SignIn/Signin.js'
import Register from './components/Register/Register.js'
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo.js'; 
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js'
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: 'e38a69ef5784461c892e6541eba4b9aa'
 });

const ParticlesOptions = {
  particles: {
      number: {
        value: 250,
        density: {
          enable: true,
          value_area: 1100
        }
      }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: '',
      isSignedIn: false
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000').then(response => response.json()).then(console.log)
  }

  calculateFaceLocation = (data) => {
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
   return {
     leftCol: clarifaiFace.left_col * width,
     topRow: clarifaiFace.top_row * height,
     rightCol: width - (clarifaiFace.right_col * width),
     bottomRow: height - (clarifaiFace.bottom_row * height)
   }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
      this.setState({input: event.target.value});
  }
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

    onRouteChange = (route) => {
      if (route === 'signout') {
        this.setState({isSignedIn: false})
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
    }
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={ParticlesOptions} 
          />
       <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
       { route === 'home' 
       ? <div>
         <Logo />
         <Rank />
         <ImageLinkForm onInputChange={this.onInputChange}
         onButtonSubmit={this.onButtonSubmit} 
       />
         <FaceRecognition box={box} imageUrl={imageUrl}/>
       </div>
      : (
        route === 'signin' 
        ?
        <SignIn onRouteChange={this.onRouteChange} /> 
        :
        <Register onRouteChange={this.onRouteChange} /> 
      )
       }
      </div>
    );
  }
}

export default App;
