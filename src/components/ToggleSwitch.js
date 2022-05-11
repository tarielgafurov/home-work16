import React from "react";
import './ToggleSwitch.css'
import { useContext } from "react";
import AuthContext from "../store/auth-context";

  const ToggleSwitch = () => {
    const context = useContext(AuthContext)
    return (
      <div className="container">
        <label className="switch">
        <input onClick={() => context.setDone((prevState) => !prevState)} type="checkbox"/>
        <span className="slider"/>
        </label>
                 
      </div>
    );
  };
  export default ToggleSwitch




