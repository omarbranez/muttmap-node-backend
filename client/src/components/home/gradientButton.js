import React from 'react';
import Button from '@mui/material/Button';

const GradientButton = (props) => {
  return (
    <div>
      <Button variant="contained"><br/>
        {props.text}
      </Button><br/>
    </div>
  )
}

export default GradientButton