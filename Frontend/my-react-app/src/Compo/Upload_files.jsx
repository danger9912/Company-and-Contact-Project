import React, { useState } from 'react';
import axios from "axios";
import './cs.css';
import './cs2.css';
import { Button } from "react-bootstrap";
import { PickList } from "primereact/picklist";
import styled from 'styled-components';

const TableWrapper = styled.div`
  max-height: 450px;
  overflow-y: auto;
  width: 1000px;
  height: 600px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
`;

const DataContainer = styled.div`
  position: relative;
  margin: 20px;
`;

const Table1 = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  border-radius: 8px;
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

const Lab = styled.div`
  background-color: red;
  color: black;
  padding: 10px;
  font-size: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const UploadButton = styled(Button)`
  margin: 20px;
`;

const Input = styled.input`
  height: 50px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
`;

const UploadFiles = () => {
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);
    const [selectedFilename, setSelectedFilename] = useState("");
    const [data,setdata] = useState([]);

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
                const response = await axios.post(
                    "https://company-and-contact-project.onrender.com/api/fieldnames",
                    { filename: selectedFilename }
                );
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

    const onChange = (e) => {
        const { source, target } = e;
        if (target.length === 1) {
            setTarget(target);
        } else {
            setTarget(target.length > 1 ? [target[target.length - 1]] : []);
        }
    };
    const handleView =async()=>{
        try {
            console.log("hello")
            if (selectedFilename) {
                const response = await axios.post(
                    "https://company-and-contact-project.onrender.com/api/view",
                    { name: selectedFilename }
                );
               console.log(response.data);
            setdata(response.data.file_data)
            } else {
                console.error("No filename selected.");
            }
        } catch (error) {
            console.error("Error fetching field names:", error);
        }
    }
    return (
        <MainContainer>
            <h2>Upload Files</h2>
            <Input onChange={handleFileChange} type="file" name="excelFile" />
           <br></br>
            <Button onClick={handleView}>Start Test</Button>
        <br></br>
            <TableWrapper>
                <Table1>
                  <thead>
                    <tr>
                      <TableHeader>Sr No.</TableHeader>
                      <TableHeader>company Name</TableHeader>
                      <TableHeader>company address</TableHeader>
                      <TableHeader>company email</TableHeader>
                      <TableHeader>company website</TableHeader>
                      <TableHeader>company phone</TableHeader>
                      <TableHeader>company founded date</TableHeader>
                      <TableHeader>Industry Type</TableHeader>
                      <TableHeader>
                      Number of Employees</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => (
                      <TableBodyRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item?.Company_Name}</TableCell>
                        <TableCell>{item?.Company_Address}</TableCell>
                        <TableCell>{item?.Company_Email}</TableCell>
                        <TableCell>{item?.Company_Website}</TableCell>
                        <TableCell>{item?.Company_Phone}</TableCell>
                        <TableCell>{item?.Founded_Date}</TableCell>
                        <TableCell>{item?.Industry_Type}</TableCell>
                        <TableCell>{item?.Employees}</TableCell>
                      </TableBodyRow>
                    ))}
                  </tbody>
                </Table1>
              </TableWrapper>
        </MainContainer>
    );
};

export default UploadFiles;
