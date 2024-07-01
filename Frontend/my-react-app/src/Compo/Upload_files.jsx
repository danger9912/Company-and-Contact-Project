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
  width: 500px;
  height: 550px;
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

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        const formData = new FormData();
        formData.append("excelFile", selectedFile);
    
        try {
            const response = await axios.post("http://localhost:3001/upload_file", formData);
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
                    "http://localhost:3001/api/fieldnames",
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

    return (
        <MainContainer>
            <h2>Upload Files</h2>
            <Input onChange={handleFileChange} type="file" name="excelFile" />
            <UploadButton onClick={fetchFieldNames}>Read Dataset</UploadButton>
            <DataContainer>
                <PickList
                    source={source}
                    target={target}
                    itemTemplate={(item) => item.label}
                    sourceHeader="Available Attribute Headings"
                    targetHeader="Data Product Specification"
                    showSourceControls={false}
                    showTargetControls={false}
                    sourceStyle={{ height: '300px' }}
                    targetStyle={{ height: '300px' }}
                    onChange={onChange}
                />
            </DataContainer>
            <UploadButton>Start Test</UploadButton>
        </MainContainer>
    );
};

export default UploadFiles;
