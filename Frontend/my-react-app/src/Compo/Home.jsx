import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";

const CardDash = ({
  omissionRate,
  fileName,
  fileFormatAccepted,
  defaultText,
  errormessage,
}) => {
  const navigate = useNavigate();
  const [smShow, setSmShow] = useState(false);

  const data = [
    {
      header: "Logical Consistency",
      subHeaders: [
       
        "Format Consistency",
      ],
    },
    
  ];

  const subheaderRoutes = {
    "Format Consistency": "/format",
  
  };

  const borders = ["success", "danger", "info", "warning", "dark", "primary"];
  const data1 = { name: fileName };

  const handleClick = (subHeader) => {
    const route = subheaderRoutes[subHeader];
    if (route) {
      navigate(route, { state: data1 });
    } else {
      console.error(`Route Not Defined for: ${subHeader}`);
    }
  };

  return (
    <>
      <center>
        <h1 style={{ marginTop: "10px", fontWeight: "bold", color: "#333" }}>Shipments Coding Rounds</h1>
        <h5 style={{ color: "#555" }}>Check the File Formats</h5>
        <Link to="./view" >ViewFile </Link>
      </center>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {data.map((item, index) => (
          <Card
            border={borders[index % borders.length]}
            key={item.header}
            style={{
              width: "15rem",
              margin: "1rem",
              borderWidth: "0.15rem",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <Card.Header style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>
              <h5>{item.header.toUpperCase()}</h5>
            </Card.Header>
            <Card.Body>
              {item.subHeaders.map((subHeader) => (
                <React.Fragment key={subHeader}>
                  <Card.Body style={{ padding: "1rem" }}>
                    <h6>
                      <Card.Text>
                        <button
                          style={{ all: "unset", cursor: "pointer" }}
                          onClick={() => handleClick(subHeader)}
                        >
                          <Link
                            style={{
                              textDecoration: "none",
                              fontSize: "14px",
                              color: "#007bff",
                            }}
                          >
                            {subHeader.toUpperCase()}
                          </Link>
                        </button>
                      </Card.Text>
                    </h6>

                    {subHeader === "Omission" && (
                      <Card.Text style={{ color: "#555" }}>
                        Rate: {omissionRate}%
                      </Card.Text>
                    )}

                    {subHeader === "Format Consistency" && defaultText && (
                      <Card.Text
                        style={{
                          color: fileFormatAccepted ? "green" : "red",
                          fontWeight: "bold",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h6>{fileFormatAccepted ? "Accepted" : "Rejected"}</h6>
                      </Card.Text>
                    )}
                  </Card.Body>
                  <hr style={{ margin: "0.5rem 0" }} />
                </React.Fragment>
              ))}
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Format Consistency
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{errormessage}</Modal.Body>
      </Modal>
    </>
  );
};

export default CardDash;
