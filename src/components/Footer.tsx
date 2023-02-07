import { FiInstagram } from "react-icons/fi";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { ImFacebook } from "react-icons/im";

const Footer = () => {
  return (
    <footer className="bg-[coral] pl-5 md:14 lg:pl-32">
      <section className="px-[4.5%] max-w-[1300px] py-10 text-white text-sm ">
        <div className="grid justify-center md:justify-start md:grid-cols-3 mb-14 md:5 space-y-5 md:space-y-0">
          <div className="flex flex-col space-y-5 order-3 md:order-[unset] mt-5 md:mt-0">
            <h3 className="font-bold text-lg mb-2 ">Our Links</h3>
            <a href="#" className="!mb-2 !mt-1 cursor-pointer">
              About Us
            </a>
            <a href="#" className="!mb-2 !mt-1 cursor-pointer">
              Contact Us
            </a>
            <a href="#" className="!mb-2 !mt-1 cursor-pointer">
              Terms and Conditions
            </a>
            <div>
              <p className="mb-3">Follow us on:</p>
              <div className="flex gap-x-5 ">
                <a href="#">
                  {" "}
                  <ImFacebook size={24} />{" "}
                </a>
                <a href="#">
                  {" "}
                  <FaTwitter size={24} />{" "}
                </a>
                <a href="#">
                  {" "}
                  <FiInstagram size={24} />{" "}
                </a>
                <a href="#">
                  {" "}
                  <FaLinkedinIn size={24} />{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-5">
            <h3 className="font-bold text-lg mb-2">Ten Network</h3>
            <a href="#" className="!mb-2 !mt-1 cursor-pointer">
              Services
            </a>
            <a href="#" className="!mb-2 !mt-1 cursor-pointer">
              Gallery
            </a>
          </div>
          <div className="flex flex-col space-y-5">
            <h3 className="font-bold text-lg mb-2">Ten Network Branches</h3>
            <a href="#" className="!mb-2 !mt-1 cursor-pointer">
              Bosso Campus
            </a>
            <a href="#" className="!mb-2 !mt-1 cursor-pointer">
              GidanKwano Campus
            </a>
            <a href="#" className="!mb-2 !mt-1 cursor-pointer">
              Gidan Mangoro
            </a>
          </div>
        </div>
        <div>
          <p className="text-center"> &copy; Copyright 2022, Ten Network</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
