import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const CustomButtonGroup = ({value,handleChange,name,label}) => {
  return (
    <FormControl>
    <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name={name}
      value={value}>
      <FormControlLabel   onChange={handleChange} value={true} control={<Radio />} label="True" />
      <FormControlLabel   onChange={handleChange} value={false} control={<Radio />} label="False" />
    </RadioGroup>
  </FormControl>
  )
}

export default CustomButtonGroup