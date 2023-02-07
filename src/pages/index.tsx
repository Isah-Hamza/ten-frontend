import pexel from "../assets/images/pexels-inna-mikitas-6455239 1.png";
import news1 from "../assets/images/news1.svg";
import news2 from "../assets/images/news2.svg";
import pixabay from "../assets/images/pexels-pixabay-159775.png";
import donate from "../assets/images/donate.jpg";
import person from "../assets/images/hero-page-girl.png";
import farcry from "../assets/images/farcry.svg";
import Services from "../components/Services";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <>
      <main className="pt-5 md:pt-10">
        <section className="first mb-20 px-[3%] lg:px-[5%] grid md:grid-cols-2 lg:flex justify-between">
          <div className="left md:pt-32">
            <h2 className="text-2xl lg:text-4xl font-semibold mb-5 max-w-lg">
              Ten Network craves to instill in you the habit of saving.
            </h2>
            <p className="text-lg text-center sm:text-left leading-tight mb-7">
              We are a poverty alleviation and empowerment initiative{" "}
              <br className="hidden lg:block" /> aimed at lifting over 10M
              Nigerians from poverty.
            </p>
            <button className="cursor-pointer flex items-center space-x-4 rounded-md px-5 py-2 bg-[coral] text-white">
              <span>Join Today</span>
              <span className="text-2xl -mt-1">&rarr;</span>
            </button>
          </div>
          <div className="">
            <img className="lg:w-[550px]" src={person} alt="person" />
          </div>
        </section>
        <section className="px-[5%] mb-20">
          <h2 className="text-2xl font-bold mb-7">About Ten Network</h2>
          <div className=" grid  md:grid-cols-2 lg:flex lg:space-x-20 items-center justify-center md:justify-start ">
            <div className="mb-6 md:mb-0">
              <img
                className="sm:w-96 mx-auto md:mx-[unset] "
                src={farcry}
                alt="facry"
              />
            </div>
            <div className="max-w-[400px] ">
              <p>
                We are a poverty alleviation and empowerment initiative aimed at
                lifting over 10M Nigerians from poverty. and send over 5M
                Children back to school and make 5M people breadwinner at the
                end of 2030. The network started since 2020 and has since then
                acheived 40% of its aim and objectives{" "}
              </p>
              <button className="mt-6 flex items-center space-x-4 rounded-md px-10 py-3 bg-[coral] text-white">
                <span>Contact Us</span>
                {/* <!-- <span className="text-2xl -mt-1" >
                            &rarr;
                        </span> --> */}
              </button>
            </div>
          </div>
        </section>
        <Services title="Services" />
        <div>
          <section className="px-[5%]">
            <h2 className="text-2xl font-bold mb-7  ">Prevention</h2>
          </section>
          <article className="bg-primaryBlue md:mt-24">
            <section className="px-[5%] mb-10 md:mb-20">
              <div className=" grid md:grid-cols-2 lg:flex space-x-0 md:space-x-8 lg:space-x-20 text-white py-10 items-center ">
                <div className="relative w-80 h-full mb-10 md:mb-0 mx-auto md:mx-[unset] ">
                  <img
                    src={pexel}
                    className="w-80 static md:absolute top-1/2  md:-translate-y-1/2 scale-y-105 "
                    alt="image"
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold mb-5">
                    Safety and security videos
                  </p>
                  <p>
                    Take time out to view tips on how to be your own security{" "}
                    <br className="hidden lg:block" /> and safety personel in
                    our absence{" "}
                  </p>
                  <button className="mt-6 flex items-center space-x-4 rounded-md px-10 py-3 bg-[#F59134] text-white">
                    <span>View More</span>
                    <span className="text-2xl -mt-1">&rarr;</span>
                  </button>
                </div>
              </div>
            </section>
          </article>
        </div>
        <section className="px-[5%] mb-20 mt-28">
          <h2 className="text-2xl font-bold mb-10  ">Latest News</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center space-y-10 md:space-y-0 md:space-x-5 lg:space-x-10">
            <div className="service-card  ">
              <img className="w-full h-56 object-cover " src={news1} alt="" />
              <div className="p-5 text-sm border-b border-gray-700">
                <p className="mb-5">
                  Unity, tolerance key to national security, says Osinbajo
                </p>
                <p>
                  Unity, tolerance key to national security, says Vice President
                  Yemi Osinbajo, yesterday, declared...
                </p>
              </div>
              <button className=" flex items-center space-x-4 rounded-md px-10 py-3 my-2">
                <span>Read More</span>
                <span className="text-2xl -mt-1">&rarr;</span>
              </button>
            </div>
            <div className="service-card  ">
              <img className="w-full h-56 object-cover " src={news2} alt="" />
              <div className="p-5 text-sm border-b border-gray-700">
                <p className="mb-5">
                  Unity, tolerance key to national security, says Osinbajo
                </p>
                <p>
                  Unity, tolerance key to national security, says Vice President
                  Yemi Osinbajo, yesterday, declared...
                </p>
              </div>
              <button className=" flex items-center space-x-4 rounded-md px-10 py-3 my-2">
                <span>Read More</span>
                <span className="text-2xl -mt-1">&rarr;</span>
              </button>
            </div>
            <div className="service-card  ">
              <img className="w-full h-56 object-cover " src={pixabay} alt="" />
              <div className="p-5 text-sm border-b border-gray-700">
                <p className="mb-5">
                  Unity, tolerance key to national security, says Osinbajo
                </p>
                <p>
                  Unity, tolerance key to national security, says Vice President
                  Yemi Osinbajo, yesterday, declared...
                </p>
              </div>
              <button className=" flex items-center space-x-4 rounded-md px-10 py-3 my-2">
                <span>Read More</span>
                <span className="text-2xl -mt-1">&rarr;</span>
              </button>
            </div>
          </div>
        </section>
        <div className="bg-primaryBlue mb-20">
          <section className="px-[5%] text-white grid md:grid-cols-2 md:space-x-10">
            <div className="py-10 mx-auto md:mx-[unset]">
              <h3 className="text-2xl text-center md:text-left font-bold text-gold mb-5">
                Your Donation
              </h3>
              <p className="text-center sm:text-left">
                Take time out to view tips on how to be your own security and
                safety personel in our absence{" "}
              </p>
              <button className="mt-6 flex items-center space-x-4 rounded-md px-16 py-3 bg-gold text-white">
                <span>Donate</span>
              </button>
            </div>
            <div className="relative h-full mx-auto md:mx-[unset]">
              <img
                src={donate}
                alt=""
                className="w-96 scale-y-110 origin-top mx-auto "
              />
            </div>
          </section>
        </div>
        <div>
          <NewsLetter />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Homepage;
