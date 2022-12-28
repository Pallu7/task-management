
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

const CustomRadioGroup = ({
  required,
  title,
 name,
  value,
  onChange,
  controlValue1,
  controlLabel1,
  controlValue2,
  controlLabel2,
}) => {
  return (
    <FormControl>
      <FormLabel required={required}>{title}</FormLabel>

      <RadioGroup name={name} value={value} onChange={onChange}>
        <FormControlLabel
          value={controlValue1}
          control={<Radio />}
          label={controlLabel1}
        />
        <FormControlLabel
          value={controlValue2}
          control={<Radio />}
          label={controlLabel2}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;