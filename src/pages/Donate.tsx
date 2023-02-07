import { useEffect, useState } from "react";
import caretUp from "../assets/images/caret-up.png";
import caretDown from "../assets/images/caret-down.png";
import Footer from "../components/Footer";
import { BiArrowBack } from "react-icons/bi";

import orangeMark from "../assets/images/orange mark.png";
import decorationImage from "../assets/images/decorationImage.png";
// @ts-ignore
import PaystackPop from "@paystack/inline-js";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const navigate = useNavigate();
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [activePrice, setActivePrice] = useState(300);
  const [otherPrice, setOtherPrice] = useState(200);
  const [proceedToPayment, setProceedToPayment] = useState(false);

  const prices = [10000, 500, 1000, 100, 300, 5000];

  const handleIncrease = (): void => {
    let number = +otherPrice;
    number++;
    setOtherPrice(number);
    setActivePrice(number);
  };

  const handleReduce = (): void => {
    let number = +otherPrice;
    number--;
    setOtherPrice(number);
    setActivePrice(number);
  };

  function formatNumber(number: Number) {
    return `$${number.toLocaleString("en-En")}`;
  }

  useEffect(() => {
    console.log(activePrice);
  }, []);

  // @ts-ignore
  const handlePay = (e) => {
    e.preventDefault();
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_ffd903094679d0b0f72c72cc213f949b987e39ad",
      firstName: fname,
      lastName: lname,
      email,
      amount: Number(activePrice) * 100,
      // @ts-ignore
      onSuccess: (tranx) => {
        alert(
          "Payment Successful. Transaction reference is " + tranx.reference
        );
        navigate("/success");
      },
      onCancel: () => {
        alert("Payment failed. Please try again");
      }
    });
  };

  return (
    <>
      <img
        className="absolute right-[20%] z-[-1] top-36 w-60"
        src={decorationImage}
        alt="decoration"
      />
      {!proceedToPayment ? (
        <section className="px-[5%] mt-9 mb-16 md:mb-12 flex flex-col md:flex-row gap-14 md:gap-20">
          <div className="max-w-[400px]">
            <p className="font-bold text-xl mb-5">Make a secure Donation</p>
            <div className="grid grid-cols-3 gap-5">
              {prices.map((price, idx) => (
                <div
                  onClick={() => {
                    setActivePrice(price);
                    console.log(price);
                  }}
                  className={`${
                    activePrice == price && " !bg-primaryBlue text-white"
                  } bg-[#f5f6fa] relative flex justify-center items-center py-3 px-5 cursor-pointer rounded-md shadow-md`}
                  key={idx}
                >
                  <p className="font-semibold">{formatNumber(price)}</p>
                  {activePrice === price && (
                    <div className="absolute top-1 right-1 w-4 h-4 shadow-lg bg-white rounded-full flex justify-center items-center">
                      <img src={orangeMark} alt="check mark" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="my-10">
              <p className="text-xl font-bold mb-2">Others</p>
              <div
                className={`bg-[#f5f6fa] relative flex gap-10 justify-end pr-16 items-center cursor-pointer rounded-md shadow-md`}
              >
                <p className=" px-5 py-2 rounded-sm font-semibold text-xl">
                  <span className="inline-block mr-2 text-base font-bold">
                    USD
                  </span>
                  {`  ${otherPrice}`}
                </p>
                <div>
                  <div onClick={handleIncrease}>
                    <img className="w-7 p-1" src={caretUp} alt="caret up" />
                  </div>
                  <div onClick={handleReduce}>
                    <img className="w-7 p-1" src={caretDown} alt="caret down" />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <p>
                  {" "}
                  <span className="font-semibold tracking-wider">
                    Name:
                  </span>{" "}
                  Lawrence Victor Aman
                </p>
                <p>
                  {" "}
                  <span className="font-semibold tracking-wider">
                    Address:
                  </span>{" "}
                  48, Okada Road Bosso
                </p>
                <p>
                  {" "}
                  <span className="font-semibold tracking-wider">
                    Account No:
                  </span>{" "}
                  0123456789
                </p>
                <p>
                  {" "}
                  <span className="font-semibold tracking-wider">
                    Bank:
                  </span>{" "}
                  First Bank
                </p>
              </div>
            </div>
            <div className="flex">
              <button
                onClick={() => setProceedToPayment(true)}
                className="w-[300px] mx-auto sm:mx-[unset] py-3 text-white bg-primaryBlue font-medium tracking-wider"
              >
                Proceed
              </button>
            </div>
          </div>
          <div className="my-auto">
            <p className="text-gold text-lg font-semibold">Thank You</p>
            <p className="font-bold my-5 text-xl">Help make a change</p>
            <p className="tracking-wider">
              Your dollars are used to provide support to victims
              <br className="hidden sm:block" /> through our statewide hotline,
              one-on-one advocacy, criminal <br className="hidden sm:block" />
              justice system advocacy and intervention, courtroom support,{" "}
              <br className="hidden sm:block" />
              media intervention and to provide resources, referrals and{" "}
              <br className="hidden sm:block" /> education.
            </p>
          </div>
        </section>
      ) : (
        <section className="max-w-[550px] bg-[#f5f6fa] px-[5%] sm:mt-9 sm:mb-16 md:mb-12 grid sm:justify-center">
          <form onSubmit={handlePay} className="px-0 md:px-16 p-10 grid gap-3">
            <div
              onClick={() => setProceedToPayment(false)}
              className="hover:font-semibold cursor-pointer flex items-center gap-2 -translate-x-3 sm:-translate-x-4"
            >
              <BiArrowBack />
              <span>Go back</span>
            </div>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <label className="font-semibold" htmlFor="name">
                  First Name
                </label>
                <input
                  required
                  onChange={(e) => setfName(e.target.value)}
                  value={fname}
                  type="name"
                  placeholder="first name"
                  className="border outline-none px-3 py-3 rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <label className="font-semibold" htmlFor="name">
                  Last Name
                </label>
                <input
                  required
                  onChange={(e) => setlName(e.target.value)}
                  value={lname}
                  type="name"
                  placeholder="Last name"
                  className="border outline-none px-3 py-3 rounded-md"
                />
              </div>
              <label className="font-semibold" htmlFor="email">
                Email
              </label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Mayorsuleimankhan1@gmail.com"
                className="border outline-none px-3 py-3 rounded-md w-72"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-3 text-white font-medium tracking-wider bg-primaryBlue py-3 text-center"
            >
              Donate <span>{formatNumber(activePrice)}</span>
            </button>
          </form>
        </section>
      )}
      <Footer />
    </>
  );
};

export default Donate;
