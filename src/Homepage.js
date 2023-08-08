/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import Grid from "./Grid";
import loading from "./loading.gif";

const Homepage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop:'90px' }}>
        <Grid/>
        <img src={loading}/>
    </div>
  )
}

export default Homepage;