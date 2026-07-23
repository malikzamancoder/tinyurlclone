import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";


function Dashboard() {

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);


  const API_URL = import.meta.env.VITE_API_URL;



  useEffect(() => {

    const fetchLinks = async () => {

      try {

        const response = await axios.get(
          `${API_URL}/urls`
        );

        console.log(response.data);

        setLinks(response.data.data);


      } catch (error) {

        console.log(
          "Dashboard Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    fetchLinks();


  }, [API_URL]);




  const totalClicks = links.reduce(
    (total, item) => total + item.clicks,
    0
  );



  const stats = [
    {
      title:"Total Links",
      value:links.length
    },
    {
      title:"Total Clicks",
      value:totalClicks
    },
    {
      title:"Active Links",
      value:links.length
    },
    {
      title:"QR Codes",
      value:"Coming Soon"
    }
  ];



  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />


      <div className="mx-auto max-w-7xl px-6 py-10">


        <div className="mb-10 rounded-2xl bg-blue-600 p-8 text-white">

          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>


          <p className="mt-2 text-blue-100">
            Manage your links and track their performance.
          </p>


        </div>





        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">


          {
            stats.map((item)=>(

              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 shadow-md"
              >

                <p className="text-slate-500">
                  {item.title}
                </p>


                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {item.value}
                </h2>


              </div>

            ))
          }


        </div>





        <div className="mt-10 rounded-2xl bg-white p-6 shadow-md">


          <h2 className="mb-6 text-2xl font-bold">
            Recent Links
          </h2>



          {
            loading ?

            <p>
              Loading...
            </p>


            :

            <div className="overflow-x-auto">


              <table className="w-full">


                <thead>

                  <tr className="border-b">

                    <th className="py-3 text-left">
                      Original URL
                    </th>


                    <th className="py-3 text-left">
                      Short URL
                    </th>


                    <th className="py-3 text-left">
                      Clicks
                    </th>


                  </tr>

                </thead>



                <tbody>


                {
                  links.map((link)=>(

                    <tr
                      key={link._id}
                      className="border-b"
                    >


                      <td className="py-4 text-slate-600">

                        {link.longUrl}

                      </td>



                      <td className="py-4 text-blue-600">

                        {API_URL}/{link.shortId}

                      </td>



                      <td className="py-4">

                        {link.clicks}

                      </td>



                    </tr>


                  ))
                }


                </tbody>



              </table>


            </div>

          }



        </div>



      </div>


    </div>

  );

}


export default Dashboard;