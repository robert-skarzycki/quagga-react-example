import React, { useEffect, useState } from "react";
import "./App.css";
import Quagga from "quagga";

function App() {
  return (
    <div className="App">
      <QuaggaElement />
    </div>
  );
}

const QuaggaElement = () => {
  const [code, setCode] = useState();
  const onDetected = (data: any) => {
    setCode(data.codeResult.code);
  };

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facing: "environment", // or user
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: 2,
        decoder: {
          readers: ["ean_reader"],
          debug: {
            drawBoundingBox: false,
            showFrequency: false,
            drawScanline: false,
            showPattern: false,
          },
          multiple: false,
        },
        locate: true,
      },
      function (err: any) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(onDetected);

    return () => {
      Quagga.offDetected(onDetected);
    };
  }, []);

  return (
    <div>
      <h1>{code}</h1>
      <div id="interactive" className="viewport" />
    </div>
  );
};

export default App;
