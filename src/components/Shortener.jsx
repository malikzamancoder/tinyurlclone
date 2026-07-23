import { useState } from "react";
import axios from "axios";

function Shortener() {

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");


  const API_URL = import.meta.env.VITE_API_URL;


  const handleShorten = async () => {

    setError("");
    setCopied(false);


    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }


    try {

      setLoading(true);


      const response = await axios.post(
        `${API_URL}/save`,
        {
          longUrl: url,
        }
      );


      const railwayShortUrl = response.data.shortURL.replace(
        "http://localhost:5050",
        "https://tinyurlserver-production-6b06.up.railway.app"
      );


      setShortUrl(railwayShortUrl);
      setUrl("");


    } catch (error) {

      console.error(
        "Error creating short URL:",
        error.response?.data || error.message
      );


      setError("Failed to create short URL. Please try again.");


    } finally {

      setLoading(false);

    }

  };


  const copyURL = async () => {

    await navigator.clipboard.writeText(shortUrl);

    setCopied(true);


    setTimeout(() => {
      setCopied(false);
    }, 2000);

  };



  return (

    <section className="-mt-10 px-6">


      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl">


        <h2 className="mb-6 text-center text-3xl font-bold text-slate-900">
          Shorten Your Long URL
        </h2>



        <div className="flex flex-col gap-4 lg:flex-row">


          <input

            type="url"

            placeholder="Paste your long URL here..."

            value={url}

            onChange={(e)=>setUrl(e.target.value)}

            className="flex-1 rounded-xl border border-slate-300 px-5 py-4 outline-none transition focus:border-blue-600"

          />



          <button

            onClick={handleShorten}

            disabled={loading}

            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"

          >

            {
              loading 
              ? "Creating..."
              : "Shorten URL"
            }


          </button>


        </div>




        {
          error && (

            <p className="mt-4 text-center text-red-500">
              {error}
            </p>

          )
        }





        {
          shortUrl && (

            <div className="mt-6 rounded-xl bg-slate-100 p-5 text-center">


              <p className="mb-3 font-semibold text-slate-700">
                Your Short URL
              </p>



              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">


                <a

                  href={shortUrl}

                  target="_blank"

                  rel="noopener noreferrer"

                  className="break-all text-blue-600 underline"

                >

                  {shortUrl}

                </a>




                <button

                  onClick={copyURL}

                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"

                >

                  {
                    copied 
                    ? "Copied!"
                    : "Copy"
                  }


                </button>



              </div>


            </div>

          )
        }




        <p className="mt-5 text-center text-sm text-slate-500">
          Fast, secure, and reliable URL shortening.
        </p>



      </div>


    </section>

  );

}


export default Shortener;