// import React from 'react'
import React, { useState } from 'react';
import axios from "axios";
// import Swal from 'sweetalert2';
// import { Modal, Button, Table, Spinner } from "react-bootstrap";
import {Button } from "react-bootstrap";
// import * as XLSX from "xlsx";
// import * as FileSaver from "file-saver";
import { PickList } from "primereact/picklist";
import styled from 'styled-components';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import VisibilityIcon from "@mui/icons-material/Visibility";

const TableWrapper = styled.div`
  max-height: 450px; /* Set the height you want for the scrollable area */
  overflow-y: auto;
  width:500px;
  height:550px;
  border: 1px solid #ccc; /* Add border to TableWrapper */
  border-radius: 10px;
`;
const MainContainer = styled.div`
  display: flex;
  // margin-left: 30px;
 
`;

// const SectionContainer = styled.div`
//   // width: 19%;
//   margin-right:15px;
// `;

const DataContainer = styled.div`
  position: relative;
  margin-left:100px;
  margin-right:15px;
  margin-bottom:50px;
// :400px;

`;

// const Dropdown = styled.select`
//   padding: 10px;
//   font-size: 16px;
//   border-radius: 8px;
//   width:150px;
//   margin-bottom:10px
// `;

// const Option = styled.option`
//   padding: 10px;
//   font-size: 16px;
 
//   border-radius: 8px;
// `;

const Table1 = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc; 
  border-radius:8px;
 

`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  font-weight: bold;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: left;
`;

const TableBodyRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

// const ErrorLabel = styled.div`
//   background-color: #ff4d4d;
//   color: white;
//   padding: 10px;
//   font-size: 15px;
//   border-radius: 8px;
// `;
const Lab = styled.div`
  background-color: red;
  color: black;
  padding: 10px;
  font-size: 15px;
  border-radius: 8px;
  margin-bottom:10px;
  margin-top:10px;
`;
const pickListStyles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    list: {
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '45%', // Adjust width as needed
        height: '300px', // Set a fixed height
        padding: '10px',
        overflowY: 'auto', // Enable vertical scrolling
    },
    header: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    item: {
        padding: '5px',
        cursor: 'pointer',
    },
    selectedItem: {
        backgroundColor: '#f0f0f0',
    },
    hoverItem: {
        backgroundColor: '#e6f7ff', // Light blue
    },
};
const StateFormat = () => {
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const [selectedFilename, setSelectedFilename] = useState("");
  const [data, setData] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  // const [tableData, setTableData] = useState([]);
  const [incorrect, setincorrect] = useState('');
  // const [responseData, setResponseData] = useState([]);
  // const [keys, setKeys] = useState([]);
  // const [Ref, setRef] = useState(false);
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("excelFile", selectedFile);

    try {
      const response = await axios.post("https://company-and-contact-project.onrender.com/upload_file", formData);
      if (response.status === 201) {
        setSelectedFilename(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
      console.error("Error:", error);
    }
  };

  const fetchFieldNames = async () => {
    try {

      if (selectedFilename) {
        console.log(selectedFilename);
        const response = await axios.post(
          "https://company-and-contact-project.onrender.com/api/fieldnames",
          { filename: selectedFilename }
        );
        console.log(response.data.field_names);
        const fieldNames = response.data.field_names.map((fieldName) => ({
          label: fieldName,
          value: fieldName,
        }));
        setSource(fieldNames);
      } else {
        console.error("No filename selected.");
      }
    } catch (error) {
      console.error("Error fetching field names:", error);
    }
  };
  const attributeSelected = () => {
    fetchStationCode();
  }
  const fetchStationCode = async () => {
    try {
      const response = await axios.post('https://company-and-contact-project.onrender.com/api/validate_phone',
        {
          filename: selectedFilename,
          attributes: target,
        }
      )
      console.log(response.data)
      setData(response.data);


    //   setincorrect(parseFloat(((response.data.errorcount) / (response.data.validCount + (response.data.errorcount))) * 100).toFixed(3));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const onChange = (e) => {
    const { source, target } = e;

    // Check if exactly one item is selected in the target list
    if (target.length === 1) {
      setTarget(target);
    } else {
      // If not exactly one item is selected, keep only the last selected item
      setTarget(target.length > 1 ? [target[target.length - 1]] : []);
    }
  };

  return (
    <div>
      <h2>Phone Format validation</h2>
      <center>
        <input
         style={{

          height: "50px",

          width: "300px",

          border: "1px solid #ccc",

          borderRadius: "5px",

          padding: "8px",

          fontSize: "16px",

      }}
          onChange={handleFileChange}
          type="file"
          name="excelFile"
        />
        <br />
        <br />
        <Button onClick={fetchFieldNames}>Read Dataset</Button>
        <div
            style={{
              marginTop: "1%",
              width: "70%",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: "1", marginRight: "10px" }}>
            <PickList
          source={source}
          target={target}
          itemTemplate={(item) => item.label}
          sourceHeader="Available Attribute Headings"
          targetHeader="Selected Attributes"
          showSourceControls={false}
          showTargetControls={false}
          sourceStyle={{ height: "300px", border: "1px solid #ccc", borderRadius: "4px", padding: "10px", marginRight: "10px" }}
          targetStyle={{ height: "300px", border: "1px solid #ccc", borderRadius: "4px", padding: "10px" }}
          onChange={onChange}
        />
            </div>
          </div>

        <Button onClick={attributeSelected} style={{ marginBottom: "50px" }}>start Test</Button>
      </center>
      <MainContainer>
        <div style={{ display: "flex" }}>
          {data?.length !== 0 ?
            <DataContainer
              style={{ marginTop: "42px" }}
            >
              <div style={{ display: "flex" }}>
                <h4>Filter Table</h4>
                {/* <button1 style={{ backgroundColor: "#4CAF50", border: "none", color: "white", padding: "10px 20px", fontSize: "15px", cursor: "pointer", borderRadius: "8px", marginLeft: "290px" }} onClick={handleSave}>Save</button1> */}

              </div>

              <Lab>



                <strong>Error Percentage: </strong>{incorrect}%<br></br>

              </Lab>
              <TableWrapper>
                <Table1>
                  <thead>
                    <tr>
                      <TableHeader>Sr No.</TableHeader>
                      <TableHeader>phone Number</TableHeader>
                      <TableHeader>Valid/Invalid</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => (
                      <TableBodyRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item?.phoneNumber}</TableCell>
                        <TableCell>{item?.isValid == true ? "true" : "false"}</TableCell>
                      </TableBodyRow>
                    ))}
                  </tbody>
                </Table1>
              </TableWrapper>
            </DataContainer>
            : <></>}
            </div>
            </MainContainer>
        </div>
       
        )
}

        export default StateFormat