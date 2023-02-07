import { useState, useEffect, useContext } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import { sidebarList } from "../../data/UserDashboard";

import caretUp from "../../assets/images/caret-up.png";
import caretDown from "../../assets/images/caret-down.png";
import orangeMark from "../../assets/images/orange mark.png";
import decorationImage from "../assets/images/decorationImage.png";

// @ts-ignore
import PaystackPop from "@paystack/inline-js";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { CustomInput, Error } from "../Emergency";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../config/Endpoints";
import { UsersContext } from "../../contexts/Users";
import { toast } from "react-toastify";

interface Account {
  amount: string;
  amountPaying: string;
  stage: string;
  amountPaid: string;
  unpaidBalance: string;
}

const UserDashboardReport = () => {
  const navigate = useNavigate();
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [activePrice, setActivePrice] = useState(300);
  const [otherPrice, setOtherPrice] = useState(200);
  const [proceedToPayment, setProceedToPayment] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState({} as Account);

  const { loggedInUser } = useContext(UsersContext);

  const prices = [10000, 5000, 6000, 8000, 3000, 4000];

  const validationSchema = Yup.object().shape({
    acc_number: Yup.string().required("This field is required"),
    bank: Yup.string().required("This field is required"),
    amount: Yup.string().required("This field is required")
  });

  const formik = useFormik({
    initialValues: {
      acc_number: "",
      bank: "",
      amount: ""
    },
    onSubmit(values) {
      console.log(values);
    },
    validationSchema
  });

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
    return `NGN${number.toLocaleString("en-En")}`;
  }

  async function getAccount() {
    try {
      const res = await axios.get(`${BASE_URL}/account/${loggedInUser.email}`);
      setAccountDetails(res.data?.data[0]);
    } catch (error) {
      toast.error("Error updating status.", { theme: "colored" });
    }
  }

  async function makeDeposit(data: any) {
    try {
      await axios.post(`${BASE_URL}/account/deposit`, data).then(() => {
        console.log("deposit successful");
      });
    } catch (error) {
      toast.error("Problem making deposit. Please try again", {
        theme: "colored"
      });
    }
  }

  useEffect(() => {
    getAccount();
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
        makeDeposit({
          email:loggedInUser.email,
          amount:Number(activePrice),
        });
        navigate("/success", { state: { to: "dashboard" } });
      },
      onCancel: () => {
        alert("Payment failed. Please try again");
      }
    });
  };

  return (
    <div className="flex flex-col ">
      <Header dashboard />
      <div className="flex-1 flex">
        <div className="">
          <DashboardSidebar sidebarList={sidebarList} />
        </div>
        <main className="w-full pt-6 overflow-y-auto h-[calc(100vh-5rem)] bg-[rgba(0,6,255,.15)]">
          <div className="w-full  ">
            <div className="sm-w-[90%] mx-auto">
              {!proceedToPayment ? (
                <section className="px-[5%] mt-9 mb-16 md:mb-12 flex flex-col md:flex-row gap-14 md:gap-20">
                  <div className="max-w-[400px]">
                    <p className="font-bold text-xl mb-5">
                      Make a secure Payment
                    </p>
                    <div className="grid grid-cols-3 gap-5">
                      {prices.map((price, idx) => (
                        <div
                          onClick={() => setActivePrice(price)}
                          className={`${
                            activePrice == price && " !bg-[coral] text-white"
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
                            NGN
                          </span>
                          {formatNumber(otherPrice)}
                        </p>
                        <div>
                          <div onClick={handleIncrease}>
                            <img
                              className="w-7 p-1"
                              src={caretUp}
                              alt="caret up"
                            />
                          </div>
                          <div onClick={handleReduce}>
                            <img
                              className="w-7 p-1"
                              src={caretDown}
                              alt="caret down"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <p>
                          {" "}
                          <span className="font-semibold tracking-wider">
                            Name:
                          </span>{" "}
                          Victor Lawrence{" "}
                        </p>
                        <p>
                          {" "}
                          <span className="font-semibold tracking-wider">
                            Address:
                          </span>{" "}
                          48, Okada Road, Bosso
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => setProceedToPayment(true)}
                        className="w-[300px] mx-auto sm:mx-[unset] py-3 text-white bg-[coral] font-medium tracking-wider"
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                  <div className="mb-5 ">
                    <div className="flex justify-end mb-5">
                      <button
                        onClick={() => setWithdraw(true)}
                        className="w-[200px] ml-auto sm:mx-[unset] py-3 text-white bg-[coral] font-medium tracking-wider"
                      >
                        Withdraw
                      </button>
                    </div>
                    <div className="border grid grid-cols-3 gap-5 rounded">
                      <div className="bg-white shadow min-w-[150px] p-5 rounded">
                        <p>Amount</p>
                        <p>{formatNumber(Number(accountDetails?.amount))}</p>
                      </div>
                      <div className="bg-white shadow min-w-[150px] p-5 rounded">
                        <p>Stage</p>
                        <p>{accountDetails?.stage}</p>
                      </div>
                      <div className="bg-white shadow min-w-[150px] p-5 rounded">
                        <p>Amount Paying</p>
                        <p>
                          {formatNumber(Number(accountDetails?.amountPaying))}
                        </p>
                      </div>
                      <div className="bg-white shadow min-w-[150px] p-5 rounded">
                        <p>Amount Paid</p>
                        <p>
                          {formatNumber(Number(accountDetails?.amountPaid))}
                        </p>
                      </div>
                      <div className="bg-white shadow min-w-[150px] p-5 rounded">
                        <p className="whitespace-nowrap">Unpaid Balance</p>
                        <p>
                          {formatNumber(Number(accountDetails?.unpaidBalance))}
                        </p>
                      </div>
                      <div className="bg-white shadow min-w-[150px] p-5 rounded">
                        <p className="whitespace-nowrap">Payment Period</p>
                        <p>5 Months</p>
                      </div>
                    </div>
                    <p className="text-gold text-lg font-semibold mt-10">
                      Thank You
                    </p>
                    <p className="font-bold my-5 text-xl">TEN's Formular</p>
                    <p className="tracking-wider">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      <br className="hidden sm:block" /> Lorem, ipsum dolor.
                      Lorem ipsum dolor sit. <br className="hidden sm:block" />
                      Lorem ipsum dolor sit amet, consectetur adipisicing.
                      support, <br className="hidden sm:block" />
                      Lorem ipsum dolor, sit amet consectetur adipisicing.{" "}
                      <br className="hidden sm:block" /> education.
                    </p>
                  </div>
                </section>
              ) : (
                <section className="max-w-[550px] bg-[#f5f6fa] px-[5%] sm:mt-9 sm:mb-16 md:mb-12 grid sm:justify-center">
                  <form
                    onSubmit={handlePay}
                    className="px-0 md:px-16 p-10 grid gap-3"
                  >
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
                      className="w-full mt-3 text-white font-medium tracking-wider bg-[coral] py-3 text-center"
                    >
                      Donate <span>{formatNumber(activePrice)}</span>
                    </button>
                  </form>
                </section>
              )}
            </div>
          </div>
        </main>
      </div>
      {withdraw ? (
        <div className="fixed z-10 inset-0 bg-black/50 grid place-content-center ">
          <div className="bg-white rounded w-[500px] p-7 max-h-[90vh] overflow-y-auto">
            <div className="relative w-full mx-auto px-5 !py-6 sm:p-10 ">
              <div
                onClick={() => setWithdraw(false)}
                className="absolute -top-2 -right-7 hover:font-semibold cursor-pointer flex items-center gap-2 -translate-x-3 sm:-translate-x-4"
              >
                <AiOutlineClose size={20} />
              </div>
              <div className="">
                <p className="text-xl font-medium mb-8">
                  Enter your bank details.
                </p>
                <form
                  onSubmit={formik.handleSubmit}
                  className="w-full flex flex-col gap-10"
                >
                  {/* option */}
                  <div className="relative border-b border-b-black pb-2 w-full">
                    <select
                      {...formik.getFieldProps("amount")}
                      className="bg-transparent font-semibold border-none outline-none appearance-none w-full"
                    >
                      <option value="">Amount</option>
                      <option value="education">NGN 1000</option>
                      <option value="medical">NGN 2000</option>
                      <option value="business">NGN 3000</option>
                      <option value="Partnership">NGN 5000</option>
                    </select>
                    <div className="orange-triangle-down"></div>
                  </div>
                  <div className="-mt-10">
                    {formik.touched.amount && formik.errors.amount && (
                      <Error text={formik.errors.amount} />
                    )}
                  </div>
                  <div>
                    {/* phone number */}
                    <CustomInput
                      label="Account Number"
                      placeholder="Account Number"
                      {...formik.getFieldProps("acc_number")}
                    />
                    {formik.touched.acc_number && formik.errors.acc_number && (
                      <Error text={formik.errors.acc_number} />
                    )}
                  </div>
                  {/* location */}
                  <div className="relative border-b border-b-black pb-2 w-full">
                    <select
                      placeholder="bank"
                      {...formik.getFieldProps("bank")}
                      className="pl-1 bg-transparent font-semibold border-none outline-none appearance-none w-full"
                    >
                      <option value="">Bank</option>
                      <option value="gtbank">GTBank</option>
                      <option value="firstbank">First Bank</option>
                      <option value="access">Access Bank</option>
                      <option value="unity">Unity Bank</option>
                    </select>
                    <div className="orange-triangle-down"></div>
                  </div>
                  <div className="-mt-10">
                    {formik.touched.bank && formik.errors.bank && (
                      <Error text={formik.errors.bank} />
                    )}
                  </div>
                  {/* submit button */}
                  <div className="flex items-center gap-7 mt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="disabled:bg-opacity-50 px-12 sm:px-20 py-3 rounded-md text-white bg-[#f59134] shadow-md"
                    >
                      {loading ? (
                        <ImSpinner2
                          size={22}
                          className="mx-auto animate-spin"
                        />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserDashboardReport;
