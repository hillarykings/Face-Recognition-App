import React from 'react';
import './Register.css';

const Register = ({ onRouteChange }) => {
        return (
<article className=" center pa3 pa4-ns mv3 ba b--black-10 sign-in-form">
<main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="text-color f4 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="text-color db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input className="form-input pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
      </div>
      <div className="mt3">
        <label className="text-color db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input className="form-input pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
      </div>
      <div className="mv3">
        <label className="text-color db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input className="form-input b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
      </div>
    </fieldset>
    <div className="">
      <input 
      onClick={() => onRouteChange('home')}
      className="text-color form-input b ph3 pv2 input-reset ba bg-light-purple grow pointer f6 dib" type="submit" value="Register" />
    </div>
    <div className="lh-copy mt3">
      <p onClick={() => onRouteChange('signin')} className="text-color f6 link dim db pointer">SignIn</p>
    </div>
  </div>
</main>
</article>
        )
    }

export default Register;
