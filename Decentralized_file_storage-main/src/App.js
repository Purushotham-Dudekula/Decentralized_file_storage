import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";
import Web3 from "web3";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contractABI";
import './App.css'; // Custom CSS for additional styling

// IPFS project credentials
const projectId = "2GIu20VDHamYtvF8P3gjTeXPEhQ";
const projectSecret = "fb48ad793b55ebeccb840b4650fed125";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInms: 0,
      dateTime: null,
      filename: "",
      timeNhash: [],
      account: "",
      contract: null,
      buffer: null,
      imageHash: "",
      getHash: "",
      imagHashArr: [],
      uploading: false,
    };
  }

  componentDidMount() {
    this.loadWeb3();
  }

  async loadWeb3() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7454/");
    let accounts = await web3.eth.requestAccounts();
    this.setState({ account: accounts[0] });
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    this.setState({ contract: contract });
  }

  capturefile = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result), filename: files[0].name });
    };
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ uploading: true });
    const result = await ipfs.add({ content: this.state.buffer });
    const { path } = result;
    this.setState({ imageHash: path });

    const Obj = {};
    Obj[this.state.dateTime] = this.state.filename;
    this.state.timeNhash.push(Obj);

    await this.state.contract.methods
      .setHash(this.state.timeInms, path)
      .send({ from: this.state.account });

    this.setState({ uploading: false });
  };

  handleTime = (e) => {
    e.preventDefault();
    let date = new Date(e.target.value);
    this.setState({
      dateTime: date.toLocaleString("en-US"),
      timeInms: date.getTime(),
    });
  };

  handleGetHash = async () => {
    const hash = await this.state.contract.methods
      .get(this.state.timeInms)
      .call({ from: this.state.account });
    this.setState({ getHash: hash, imagHashArr: [...this.state.imagHashArr, hash] });
  };

  render() {
    return (
      <div className="app-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">IPFS File Uploader</a>
            <span className="navbar-text">Account: {this.state.account}</span>
          </div>
        </nav>

        <div className="container mt-5">
          <div className="row text-center">
            <h1 className="display-5">Upload Files to IPFS</h1>
            <p className="lead">Securely store Files on the decentralized web.</p>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-md-8">
              <form onSubmit={this.handleSubmit} className="form-upload">
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    <strong>Choose File:</strong>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={this.capturefile}
                    multiple
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="timeinput" className="form-label">
                    <strong>Select Date and Time:</strong>
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    onChange={this.handleTime}
                    name="input-time"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={this.state.uploading}
                >
                  {this.state.uploading ? "Uploading..." : "Submit"}
                </button>

                {this.state.uploading && (
                  <div className="progress mt-3">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      style={{ width: "100%" }}
                    >
                      Uploading to IPFS...
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="row mt-5 text-center">
            <h3>Retrieve files Hash from Blockchain</h3>
            <div className="col-md-6 offset-md-3">
              <div className="mb-3">
                <input
                  type="datetime-local"
                  className="form-control"
                  name="input-time"
                  onChange={this.handleTime}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={this.handleGetHash}
              >
                Get Hash
              </button>

              {this.state.imagHashArr.length > 0 && (
                <div className="mt-4">
                  {this.state.imagHashArr.map((hash, idx) => {
                    const link = "https://ipfs.io/ipfs/" + hash;
                    return (
                      <div key={idx} className="image-container">
                        <p>
                          Hash: <a href={link}>{hash}</a>
                        </p>
                        <img
                          src={`https://ipfs.io/ipfs/${hash}`}
                          className="img-fluid"
                          alt="Uploaded content"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
