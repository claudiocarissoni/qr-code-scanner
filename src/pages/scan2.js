//import "../pages/custumStyle.css";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import QrFrame from "../../public/qr-frame.svg";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

function Scan2() {
  // QR States
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  // Result
  const [scannedResult, setScannedResult] = useState(null);

  // Success
  const onScanSuccess = (result) => {
    // 🖨 Print the "result" to browser console.
    console.log(result);
    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    setScannedResult(result?.data);
  };

  // Fail
  const onScanFail = (err) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        //overlay: qrBoxEl?.current || undefined,
        maxScansPerSecond: 2,
        returnDetailedScanResult: true,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div style={{ textAlign: "center", alignItems: "center" }}>
      {/* QR */}
      <video ref={videoEl}></video>
      <div ref={qrBoxEl}>
        <img
          className="qr-frame"
          src={QrFrame}
          //alt="Qr Frame"
          width={256}
          height={256}
        />
      </div>

      <Link
        href={`/`}
        className="bg-yellow-200 m-4 text-md rounded-md px-4 py-2 hover:underline"
      >
        Torna alla pagina iniziale..
      </Link>

      {/* Show Data Result if scan is success */}
      {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  );
}

export default Scan2;
