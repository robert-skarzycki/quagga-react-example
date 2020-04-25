import React, { useEffect, useState } from "react";
import "./App.css";
import Quagga from "quagga";

function App() {
  return (
    <div className="App">
      <h1>Quagga React Example</h1>
      <p>
        Browser should ask you for access to camera. If you allow it, there
        should live stream of your camera.
      </p>
      <p>
        Scanner recognizes EAN 13 barcode. Once it is recognized, it will be
        shown above camera view.
      </p>
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
      <h2>{code}</h2>
      <div id="interactive" className="viewport" />
    </div>
  );
};

export default App;
