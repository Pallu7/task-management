import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Grid} from '@mui/material';
import FormDialog from '../dialog';
import axios from 'axios';
import "./branch.css";
import { Delete, Edit, FileDownload, Folder} from '@mui/icons-material';


const initialValue = {
  name: "",
  address: "",
  contactNumber1: "",
  contactNumber2: "",
  email: "",
  code: "",
  shortName: "",
  contactPerson: "",
  isHeadOffice:true,
  isRegionalHead:true

}

const Branch = () => {
  // const [value,setValue]=useState([{id:1,radio:true},{id:2,radio:false}])
  // const [regionValue, setRegionValue] = React.useState(false);
  // const [headValue, setHeadValue] = React.useState(false);

  const gridRef = useRef();
  const [open, setOpen] = useState(false)
  const [gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialValue)

  // const handleChange = (event) => {
  //   let id=event.target.name
  //   console.log(id)
  //   if(id==="isRegionalHead"){
  //     let value=JSON.parse(event.target.value)
  //     setRegionValue(event.target.value);
  //     setFormData({ ...formData, [id]:value })
  //   }
  //   else{
  //       let value=JSON.parse(event.target.value)
  //       setHeadValue(event.target.value);
  //       setFormData({ ...formData, [id]:value })
  //     }
  //   }
  
   
   
  

  const handleClickOpen = () => {
    console.log(open)
    setOpen(true)
    console.log(open)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const url = "https://localhost:7098/api/Branch"
  const columnDefs = [
    { headerName: "Branch Name", field: "name", floatingFilter: true },
    { headerName: "Address", field: "address", tooltipField: "name" },
    { headerName: "Contact no.1", field: "contactNumber1" },
    { headerName: "Contact no.2", field: "contactNumber2" },
    { headerName: "Email", field: "email", tooltipField: "name" },
    { headerName: "Code", field: "code", tooltipField: "name" },
    { headerName: "Contact Person", field: "contactPerson", tooltipField: "name" },
    { headerName: "Short Name", field: "shortName", tooltipField: "name" },
    { headerName: "Is Head Office", field: "isHeadOffice", tooltipField: "name" },
    { headerName: "Is Regional Head", field: "isRegionalHead", tooltipField: "name" },
    { headerName: "Is Regional Head", field: "isHeadOffice", tooltipField: "name" },
    {
      headerName: "Actions", width: 250,
      cellRenderer: (params) => <div>
        <Button variant='contained' color='error' size="small" fontSize="sm" startIcon={<Delete />} onClick={() => handleDelete(params.data)}>Delete</Button>
        <Button variant='outlined' color='success' size="small" fontSize="sm" startIcon={<Edit />} onClick={() => handleUpdate(params.data)}>Update</Button>
      </div>
    }
  ]
  useEffect(() => {
    getBranch()
  }, [])

  const getBranch = () => {
    fetch(url)
      .then(resp =>
        resp.json())
      

      .then(resp => {
        setTableData(resp)
      console.log(resp)})

  }

  const onGridReady = params => {
    setGridApi(params.api)
    // fetch("https://localhost:7098/api/Branch")
    // .then(resp=>resp.json())
    // .then(resp=>console.log(resp))
    // .then(resp=>params.api.applyTransaction({add:resp}))
  }

  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    resizable: true
  }


  const handleDelete = (data) => {
    const id = data.id
    const confirm = window.confirm("Are you sure, you want to delete?", id)
    console.log(confirm)
    if (confirm) {
      axios.delete(url + `/${id}`).then(resp => getBranch())
    }


  }
  const handleUpdate = (data) => {
    console.log(data)
    setFormData(data)
    handleClickOpen()
  }



  const onChange = (e) => {
    console.log(e.target.name)
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleFormSubmit = () => {
    formData.isRegionalHead = JSON.parse(formData.isRegionalHead);
    formData.isHeadOffice = JSON.parse(formData.isHeadOffice);

    if(formData.id){
      // axios.get(url+`/${formData.id}`).then(resp=>resp.json()).then(res=>console.log(res))
      console.log(formData.id)
      // handleClose()
      // getBranch()
      // setFormData(initialValue)

   axios.get(url+`/${formData.id}`).then(resp=>{
    console.log(resp.data)
      axios.put(url,formData).then(res=>{
        handleClose()
        getBranch()
        setFormData(initialValue)
        })
    }
   )
    }
    else{
     axios.post(url, formData).then(resp => {
    
      handleClose()
      getBranch()
      setFormData(initialValue)
    })
    
  }
}







  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  }
  const getRowId = useMemo(() => {
    return (params) => params.data.id;
  }, []);


  // set background colour on even rows again, this looks bad, should be using CSS classes
  const getRowStyle = params => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: "#B6D0E2" };
    }
  };

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById('page-size').value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);


  return (
    <>
      <Grid align="right">
        <Button variant='contained' color='primary' onClick={handleClickOpen}>Add Branch</Button>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <div className="example-header">
          Page Size:
          <select onChange={onPageSizeChanged} id="page-size" defaultValue={"3"}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>

        <Button size='small' sx={{ my: 2 }} variant="contained" endIcon={<FileDownload/> } onClick={onExportClick}>
          Export
        </Button>
      </Grid>


      <div className="ag-theme-alpine" style={{ width: '100%', height: 400 }} >

        <AgGridReact
          ref={gridRef}
          getRowStyle={getRowStyle}
          rowData={tableData} // Row Data for Rows

          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          // animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows
          onGridReady={onGridReady}
          getRowId={getRowId}
          enableBrowserTooltips={true}
          pagination={true}
          floatingFilter={false}

          paginationPageSize={5}









        />
      </div>

      <FormDialog 
      open={open} 
      handleClose={handleClose} 
      data={formData} 
      onChange={onChange} 
      handleFormSubmit={handleFormSubmit} 
      // regionValue={regionValue}
      // headValue={headValue}
      // handleChange={handleChange}

      />
    </>
  )
}

export default Branch