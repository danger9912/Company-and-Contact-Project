import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

import { PickList } from "primereact/picklist";
const TableWrapper = styled.div`
  max-height: 450px;
  overflow-y: auto;
  width: 50%;
  border: 1px solid #000;
  border-radius: 10px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DataContainer = styled.div`
  margin: 20px;
  width: 50%;
  max-width: 800px;
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
  background-color: lightgreen;
  color: black;
  padding: 15px;
  font-size: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Table = styled.table`
  width: 50%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const TemporalConsistency = () => {
  const [data, setData] = useState(null);
  const [filename, setFilename] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("excelFile", selectedFile);

    try {
      const response = await axios.post(
        "https://company-and-contact-project.onrender.com/upload_file",
        formData
      );
      if (response.status === 201) {
        setFilename(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || 'File upload failed');
    }
  };

  const fetchFieldNames = async () => {
    try {
      if (filename) {
        const response = await axios.post(
          "https://company-and-contact-project.onrender.com/api/fieldnames",
          { filename }
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

  const fetchProcessedDates = async () => {
    try {
      const response = await axios.post(
        "https://company-and-contact-project.onrender.com/api/temporalquality/tempoValidity",
        {
          filename,
          attributes: target,
        }
      );
      setData(response.data.result);
    console.log(response.data.result)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onChange = (e) => {
    const { source, target } = e;
    setTarget(target.length > 1 ? [target[target.length - 1]] : target);
  };

  const reset = () => {
    setData(null);
    setFilename("");
    setAttributes([]);
    setSource([]);
    setTarget([]);
  };

  return (
    <MainContainer>
      <h3 style={{ marginTop: "10px", marginBottom: "10px" }}>
        Date validated
      </h3>

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

      <DataContainer>
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
      </DataContainer>

      <Button onClick={fetchProcessedDates} style={{ marginBottom: "20px" }}>
        Start Test
      </Button>

  

      {data && (
        <>
          <Lab>
            <strong>Invalid Percentage:</strong> {data.invalidPercentage}%
            <br />
            <strong>Ambiguous Percentage:</strong> {data.ambiguousPercentage}%
          </Lab>
          <TableWrapper>
            <center>
              <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px" }}>
                Filtered Dates
              </h2>
              <Table>
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                  <tr>
                    <TableHeader>Index</TableHeader>
                    <TableHeader>Date (YYYY-MM-DD)</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {data.filterDates.map((date, index) => (
                    <TableBodyRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{date}</TableCell>
                    </TableBodyRow>
                  ))}
                </tbody>
              </Table>
              <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px" }}>
                Ambiguous Dates
              </h2>
              <Table>
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                  <tr>
                    <TableHeader>Index</TableHeader>
                    <TableHeader>Date (YYYY-MM-DD)</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {data.ambiguousDates.map((date, index) => (
                    <TableBodyRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{date}</TableCell>
                    </TableBodyRow>
                  ))}
                </tbody>
              </Table>
             
            </center>
          </TableWrapper>
        </>
      )}
    </MainContainer>
  );
};

export default TemporalConsistency;
