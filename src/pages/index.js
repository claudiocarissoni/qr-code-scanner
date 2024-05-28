import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lettore QR-CODE</title>
        <meta
          name="Lettore di codici QR-CODE"
          content="Generato dal CC19731028"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header class="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left">
        <div class="bg-black/5 p-4 text-center text-surface dark:text-white">
          LETTORE CODICI QR
        </div>
      </header>

      <main className="flex flex-col h-screen justify-center items-center">
        <div className="flex flex-col lg:flex-row">
          <Link
            href={`/scan2`}
            className=" bg-blue-100 m-4 text-4xl rounded-md px-4 py-2 hover:bg-blue-400"
          >
            Leggi QR-CODE
          </Link>
          <Link
            href={`/generate`}
            className=" bg-blue-100 m-4 text-4xl rounded-md px-4 py-2 hover:bg-blue-400"
          >
            Genera QR-CODE
          </Link>
        </div>
      </main>

      <footer class="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left">
        <div class="bg-black/5 p-4 text-center text-surface dark:text-white">
          AMTech by AM Instruments
        </div>
      </footer>
    </>
  );
}
