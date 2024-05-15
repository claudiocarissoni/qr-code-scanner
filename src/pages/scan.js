import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";

export default function Scan() {
  const router = useRouter();
  const [data, setData] = useState("No result");
  const [showModal, setShowModal] = useState(false);
  const qrRef = useRef(null);

  const handleScan = (result, error) => {
    if (!!result) {
      setData(result?.text);
      setShowModal(true);
      qrRef.current.stop();
    }

    if (!!error) {
      console.info(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.reload();
  };

  const handleOK = async () => {
    //await axios.post(`/api/postData`, { data });
    router.reload();
  };

  return (
    <>
      <Head>
        <title>QR Scan</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col mt-[5rem] justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl mb-4">Inquadra un codice QR</h2>
          <div>
            <QrReader
              className="lg:h-[500px] lg:w-[500px] h-[500px] w-[500px]"
              delay={300}
              onResult={handleScan}
              constraints={{ facingMode: "environment" }}
              key="environment"
              style={{ width: "60%", height: "60%" }}
              ref={qrRef}
            />
          </div>
          <Link
            href={`/`}
            className=" bg-yellow-200 m-4 text-md rounded-md px-4 py-2 hover:underline"
          >
            Torna alla pagina iniziale..
          </Link>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-md p-4">
                <p className="text-xl font-bold mb-2">Dati letti:</p>
                <p>{data}</p>
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mt-4 hover:bg-gray-300"
                  onClick={handleCloseModal}
                >
                  Chiudi
                </button>
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mx-4 mt-4 hover:bg-gray-300"
                  onClick={handleOK}
                >
                  Ok
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
