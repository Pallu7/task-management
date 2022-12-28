import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import CustomButtonGroup from './CustomButtonGroup';
import CustomRadioGroup from './CustomRadioGroup';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit,regionValue,headValue,handleChange}) {
  
  const {id,name,address,contactNumber1,contactNumber2,email,shortName,code,contactPerson,isHeadOffice,isRegionalHead}=data






  return (
    <div style={{width:"800px",background:"red"}}>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "825px",  // Set your width here
        },
      },
    }}
      >
        <DialogTitle id="alert-dialog-title" >
          {id?"Update Branch":"Create New Branch"}
        </DialogTitle>
        <DialogContent >
          <form style={{display:"flex",flexWrap:"wrap"}}>
            <TextField sx={{margin:"15px"}} name="name" value={name}  onChange={onChange} placeholder='Enter branch name' label="Name"   />
            <TextField sx={{margin:"15px"}} name="address" value={address} onChange={onChange} placeholder='Enter address' label="Address"   />
            <TextField sx={{margin:"15px"}} name="contactNumber1" value={contactNumber1} onChange={onChange} placeholder='Enter contact number 1' label="Contact Number 1"  />
            <TextField sx={{margin:"15px"}} name="contactNumber2" value={contactNumber2} onChange={onChange} placeholder='Enter contact number 2' label="Contact Number 2"  />
            <TextField sx={{margin:"15px"}} name="email" value={email} onChange={onChange} placeholder='Enter email' label="Email"   />
            <TextField sx={{margin:"15px"}} name="code" value={code} onChange={onChange} placeholder='Enter code' label="code"   />
            <TextField sx={{margin:"15px"}} name="shortName" value={shortName} onChange={onChange} placeholder='Enter short name' label="Short Name"   />
            <TextField sx={{margin:"15px"}} name="contactPerson" value={contactPerson} onChange={onChange} placeholder='Enter contact person' label="Contact Person"   />
           
          {/* <CustomButtonGroup value={regionValue} handleChange={handleChange} name="isHeadOffice" label="Is Head Office"/> */}
          <CustomRadioGroup
              required
              title="Is Head Office"
               name="isHeadOffice"
              value={isHeadOffice}
              onChange={onChange}
              controlLabel1="Yes"
              controlValue1="true"
              controlLabel2="No"
              controlValue2="false"
            />
          <CustomRadioGroup
              required
              title="Is Regional Head"
              name="isRegionalHead"
              value={isRegionalHead}
              onChange={onChange}
              controlLabel1="Yes"
              controlValue1="true"
              controlLabel2="No"
              controlValue2="false"
            />

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined' color="secondary" >Cancel</Button>
          <Button autoFocus variant='contained' onClick={()=>handleFormSubmit()}>
           {id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
