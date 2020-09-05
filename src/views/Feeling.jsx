import React, { Component } from "react";
import "./Feeling.css";
import axios from "axios";
import { Button, Image, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Feeling extends Component {
  imageSource;
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      faces: [],
    };
  }

  value;
  imageHandler(e) {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      this.imageSource = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          this.setState({ image: reader.result });
        }
      };
      reader.readAsDataURL(img);
    }
  }

  scanFace() {
    const URL = "http://127.0.0.1:4040/detect";
    let data = new FormData();

    data.append("image", this.imageSource);
    let config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(URL, data, config)
      .then((resp) => {
        this.setState({
          faces: resp.data,
        });
        console.log("response", resp.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  render() {
    return (
      <>
        <Container>
          <Row className="justify-content-md-center">
            <h1> Análisis de Rostro con AWS Rekognition </h1>
          </Row>
          <Row>
            <Col xs={5}>
              <label
                className="btn btn-primary"
                style={{ width: "100%" }}
                htmlFor="files"
              >
                Elegir Archivo
              </label>
              <input
                style={{ display: "none" }}
                id="files"
                type="file"
                accept="image/*"
                onChange={(e) => this.imageHandler(e)}
              />
              <Button onClick={() => this.scanFace()} style={{ width: "100%" }}>
                Escanear Sentimientos
              </Button>
              <Image src={this.state.image} width={"100%"} rounded />
            </Col>
            <Col xs={5}>
              {this.state.faces && this.state.faces.length > 0 ? (
                this.state.faces.map((f) => (
                  <>
                    <Row>
                      <Col xs={4}>
                        <strong>Disgustado:</strong>
                      </Col>
                      <Col xs={3}>
                        <label>{f.emotions.DISGUSTED > 50 ? "Si" : "No"}</label>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={4}>
                        <strong>Enojado:</strong>
                      </Col>
                      <Col xs={3}>
                        <label>{f.emotions.ANGRY > 50 ? "Si" : "No"}</label>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={4}>
                        <strong>Triste:</strong>
                      </Col>
                      <Col xs={3}>
                        <label>{f.emotions.SAD > 50 ? "Si" : "No"}</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <strong>Sorprendido:</strong>
                      </Col>
                      <Col xs={3}>
                        <label>{f.emotions.SURPRISED > 50 ? "Si" : "No"}</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <strong>Confundido:</strong>
                      </Col>
                      <Col xs={3}>
                        <label>{f.emotions.CONFUSED > 50 ? "Si" : "No"}</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <strong>Feliz:</strong>
                      </Col>
                      <Col xs={3}>
                        <label>{f.emotions.HAPPY > 50 ? "Si" : "No"}</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <strong>Calmado</strong>
                      </Col>
                      <Col xs={3}>
                        <label>{f.emotions.CALM > 50 ? "Si" : "No"}</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <strong>Temeroso</strong>
                      </Col>
                      <Col xs={3}>
                        <label>{f.emotions.FEAR > 50 ? "Si" : "No"}</label>
                      </Col>
                    </Row>
                    <hr />
                  </>
                ))
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>
        <div className="container">
          <div className="box-options"></div>
          <div className="box-description"></div>
        </div>
      </>
    );
  }
}

export default Feeling;
