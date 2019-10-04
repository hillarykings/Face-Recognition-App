import React from 'react';
import './Signin.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    signInEmail: '',
    signInPassword: ''  
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    }).then(response => response.json()).then(data => {
      if (data === 'success') {
        return this.props.onRouteChange('home');
      }
    })
  }

  render() {   
     const { onRouteChange } = this.props;
        return (
<article className=" center pa3 pa4-ns mv3 ba b--black-10 sign-in-form">
<main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="text-color f4 fw6 ph0 mh0">Sign In</legend>
      <div className="mt3">
        <label className="text-color db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={this.onEmailChange} className="form-input pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
      </div>
      <div className="mv3">
        <label className="text-color db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={this.onPasswordChange} className="form-input b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
      </div>
    </fieldset>
    <div className="">
      <input 
      onClick={this.onSubmitSignIn}
      className="text-color form-input b ph3 pv2 input-reset ba bg-light-purple grow pointer f6 dib" type="submit" value="Sign in" />
    </div>
    <div className="lh-copy mt3">
      <p onClick={() => onRouteChange('register')} className="text-color f6 link dim db pointer">Register</p>
    </div>
  </div>
</main>
</article>
        );
   }
}

export default Signin;
