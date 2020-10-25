/* NOT USED */
import React, { useState, useEffect } from 'react';
import {useStateValue} from "../components/State";
import { Dimensions } from 'react-native';

function DimensionsState(props) {

  const [{}, dispatch] = useStateValue();

  const onChangeScreenSize = ({ set_window, set_screen }) => {
    const get_window = Dimensions.get("window");
    const get_screen = Dimensions.get("screen");
    let set_to = {
      window: get_window,
      screen: get_screen
    }
    console.log('setting to', set_to)
    dispatch({type: 'setDimensions', value: set_to})
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChangeScreenSize);
    return () => {
      Dimensions.removeEventListener("change", onChangeScreenSize);
    };
  });

  return (null);

}


export default DimensionsState;