import { useEffect, useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import { sidebarList } from "../../data/AdminDashboard";

import filter from "../../assets/images/Filter 1.png";
import previous from "../../assets/images/icon-previous.svg";
import next from "../../assets/images/icon-next.svg";
import { FiArrowLeft } from "react-icons/fi";
import girl from "../../assets/images/table-girl.png";
import { toast } from "react-toastify";
import axios from "axios";
import { apiEndpoints, BASE_URL } from "../../config/Endpoints";
import empty from "../../assets/images/no-data.png";
import moment from "moment";

import { trim as trimText } from "./AdminDashboard";
import SelectedSupport from "../../components/SelectedSupport";
import { ISupport, IUser } from "../../extra/types";
import { CustomInput, Error } from "../Emergency";
import { AiOutlineClose } from "react-icons/ai";
import { useFormik } from "formik";
import { ImSpinner2 } from "react-icons/im";

export interface IEmpty {
  content?: string;
}

const Empty = ({ content }: IEmpty) => (
  <div className="py-5 mt-3 flex flex-col justify-center text-center">
    <img className="mx-auto w-24" src={empty} alt="no data" />
    <p className="ml-8">{content ?? "No cases here."}</p>{" "}
  </div>
);

const AdminAdmins = () => {
  const [partners, setPartners] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showSupportDetails, setShowSupportDetails] = useState(false);
  const caseTableHeader = ["case", "date", "status", "action"];
  const tableHeader = ["Name", "Phone", "Email", "Action"];
  const [selectedUser, setSelectedUser] = useState({} as IUser);
  const [selectedSupport, setSelectedSupport] = useState({} as ISupport);
  const [userSupport, setUserSupport] = useState(
    {} as {
      analytics: { allCount: number; completedCount: number };
      supports: Array<ISupport>;
    }
  );
  const [loading, setLoading] = useState();
  const [addNew, setAddNew] = useState(false);

  const [pageIndex, setPageIndex] = useState(1);
  const itemCount = 5;

  const [allUsers, setAllUsers] = useState([] as Array<IUser>);

  const resolvedCases = () => {
    return userSupport.supports.filter(
      (item) => item.status.toLowerCase() === "completed"
    );
  };

  const handleShowUserDetails = (user: IUser) => {
    fetchUserDetails(user.email);
    setSelectedUser(user);
    setShowUserDetails(!showUserDetails);
  };

  const handleShowSuppportDetails = (item?: ISupport) => {
    setShowSupportDetails(!showSupportDetails);
    if (item) setSelectedSupport(item);
  };

  const addNewAdmin = () => {
    setAddNew(true);
  };

  async function fetchUsers() {
    try {
      const res = await axios.get(`${BASE_URL}/${apiEndpoints.USERS}`);
      setAllUsers(res.data.data);
    } catch (error) {
      toast.error("Error fetching users from database", { theme: "colored" });
    }
  }

  async function fetchUserDetails(email: string) {
    try {
      const res = await axios.get(
        `${BASE_URL}/${apiEndpoints.SUPPORT}/${email}`
      );
      setUserSupport(res?.data?.data);
    } catch (error) {
      toast.error("Error fetcing user support details", { theme: "colored" });
    }
  }

  function getInRangeItems(array: Array<IUser>) {
    const lowerLimit = (pageIndex - 1) * itemCount;
    const upperLimit = itemCount * pageIndex;
    const res = array.filter((_, idx) => idx >= lowerLimit && idx < upperLimit);
    return res;
  }

  function getButtomPagination() {
    const number = Math.ceil(allUsers?.length / itemCount);
    return number;
  }

  const formik = useFormik({
    initialValues: { name: "", gender: "", phone: "", password: "", email: "" },
    validationSchema: {},
    onSubmit(values) {
      console.log(values);
    }
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
      <Header dashboard />
      <div className="flex-1 flex">
        <DashboardSidebar sidebarList={sidebarList} />
        <main className="w-full lg:w-4/5 bg-[#fff] h-full pt-8 px-10 ">
          {!showUserDetails ? (
            <div className="h-full flex flex-col">
              <div className="mt-8 flex items-center justify-between pb-5 border-b">
                <p className="text-xl font-semibold">Ten Network Admins</p>
                <div className="flex gap-3 items-center">
                  <div className="flex items-center gap-2">
                    <select
                      className="border outline-none rounded px-5 py-1.5 text-sm"
                      name="filter"
                      id="filter"
                    >
                      <option value="april 2022">April 2022</option>
                      <option value="may 2022">May 2022</option>
                      <option value="june 2022">June 2022</option>
                    </select>
                    <img src={filter} alt="fiter" />
                  </div>
                  <button
                    onClick={addNewAdmin}
                    className="bg-[coral] px-5 py-2 rounded text-white"
                  >
                    Add New
                  </button>
                </div>
              </div>
              <div className="mt-2 pb-5 max-w-3xl">
                <table className="w-full">
                  <thead>
                    <tr>
                      {tableHeader.map((item, idx) => (
                        <th className="capitalize text-left" key={idx}>
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getInRangeItems(allUsers)?.map((item, idx) => (
                      <tr key={idx} className="text-sm">
                        <td className="pt-4">
                          <div className="flex items-center gap-2">
                            <img
                              className="rounded-full w-7"
                              src={item.imgUrl ?? girl}
                              alt={item?.name}
                            />
                            <p className="font-semibold">{item.name}</p>
                          </div>
                        </td>
                        <td className="pt-4">{item.phone}</td>
                        <td className="pt-4">{item.email}</td>
                        <td className="pt-4">
                          <button
                            onClick={() => handleShowUserDetails(item)}
                            className="text-xs  rounded px-5 py-1.5 text-white capitalize font-semibold w-fit bg-blue-500"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between pt-4 mt-auto mb-3 border-t">
                <p className="text-sm">
                  Showing{" "}
                  <span className="font-semibold">
                    {allUsers?.length ? itemCount * (pageIndex - 1) + 1 : "0"}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold">
                    {" "}
                    {allUsers?.length ? itemCount * pageIndex : 0}{" "}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold">
                    {" "}
                    {allUsers?.length || 0}{" "}
                  </span>
                  Entries
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    className="disabled:opacity-50"
                    onClick={() => setPageIndex((prev) => prev - 1)}
                    disabled={pageIndex === 1}
                  >
                    <img className="w-2.5 mr-2" src={previous} alt="previous" />
                  </button>
                  {[...Array(getButtomPagination())].map((_, idx) => (
                    <p
                      onClick={() => setPageIndex(idx + 1)}
                      role={"button"}
                      className={`cusor-pointer text-white rounded px-2 py-1 bg-blue-500 ${
                        pageIndex === idx + 1 && "scale-[1.25] font-semibold"
                      }`}
                    >
                      {idx + 1}
                    </p>
                  ))}
                  <button
                    className="disabled:opacity-50 "
                    disabled={pageIndex * itemCount >= allUsers?.length}
                    onClick={() => setPageIndex((prev) => prev + 1)}
                  >
                    <img className="w-2.5 ml-2" src={next} alt="next" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {!showSupportDetails ? (
                <div className="flex flex-col">
                  <div className="border-b">
                    <button
                      onClick={() => setShowUserDetails(false)}
                      className="flex items-center gap-2 py-3 px-2"
                    >
                      <FiArrowLeft />
                      <span>Back</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-[4fr,6fr] gap-10 mt-14">
                    <div className="shadow rounded p-5 flex gap-4">
                      <div className="flex flex-col lg:items-center">
                        <div className="w-20 h-20 rounded-full">
                          <img
                            className="rounded-full w-full object-cover"
                            src={girl}
                            alt="suleiman"
                          />
                        </div>
                        {/* <p className="ml-5 sm:ml-[unset] text-primaryBlue font-medium underline cursor-pointer">
                      change photo
                    </p> */}
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className=" flex items-center gap-2">
                          <p className="text-xl font-semibold opacity-70 whitespace-nowrap">
                            {selectedUser?.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-semibold opacity-70 text-base whitespace-nowrap">
                            Sex :
                          </p>
                          <p>{selectedUser?.gender ?? "null"}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-semibold opacity-70 text-base whitespace-nowrap">
                            Age :
                          </p>
                          <p>{selectedUser?.age ?? "null"}</p>
                        </div>
                        <p>{selectedUser?.email ?? "null"}</p>
                        <div className="flex items-center gap-3">
                          <p className="font-semibold opacity-70 text-base whitespace-nowrap">
                            Occupation :
                          </p>
                          <p>{selectedUser?.occupation ?? "null"}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-semibold opacity-70 text-base whitespace-nowrap">
                            Phone :
                          </p>
                          <p>{selectedUser?.phone ?? "null"}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-semibold opacity-70 text-base whitespace-nowrap">
                            Marital Status :
                          </p>
                          <p>{selectedUser?.marital_status ?? "null"}</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <p className="font-semibold opacity-70 text-lg whitespace-nowrap">
                            State :
                          </p>
                          <p className="mt-1.5">
                            {selectedUser?.location ?? "null"}{" "}
                          </p>
                        </div>
                        {/* <button className="ml-[unset] px-14 mt-10 py-3 rounded bg-primaryBlue text-white w-fit">
                          Assign
                        </button> */}
                      </div>
                    </div>
                    <div>
                      <div>
                        <p className="font-bold">
                          Submitted Case{" "}
                          <span>({userSupport?.analytics?.allCount})</span>
                        </p>
                        <div className="mt-5">
                          <table className="w-full">
                            <thead>
                              <tr>
                                {caseTableHeader.map((item, idx) => (
                                  <th
                                    className="capitalize text-left"
                                    key={idx}
                                  >
                                    {item}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            {userSupport?.analytics?.allCount ? (
                              <tbody>
                                {userSupport?.supports?.map((item, idx) => (
                                  <tr key={idx} className="text-sm">
                                    <td className="pt-4">
                                      {trimText(item.message)}
                                    </td>
                                    <td className="pt-4">
                                      {moment(item.createdAt).format("l") ??
                                        "09-09-2019"}
                                    </td>
                                    <td className="pt-4 pr-3">
                                      <button
                                        // onClick={() => handleShowUserDetails()}
                                        className="text-xs w-full rounded px-5 py-1.5 text-white capitalize font-semibold bg-blue-500"
                                      >
                                        {item.status}
                                      </button>
                                    </td>
                                    <td className="pt-4 ">
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => {}}
                                          className="text-xs  rounded px-5 py-1.5 text-white capitalize font-semibold w-fit bg-[coral]"
                                        >
                                          Assign
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleShowSuppportDetails(item)
                                          }
                                          className="text-xs  rounded px-5 py-1.5 text-white capitalize font-semibold w-fit bg-blue-500"
                                        >
                                          View
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            ) : null}
                          </table>
                          {userSupport?.analytics?.allCount ? null : <Empty />}
                        </div>
                      </div>
                      <div className="mt-10">
                        <p className="font-bold">Resolved Cases</p>
                        {userSupport?.analytics?.completedCount ? (
                          <div className="mt-3">
                            {resolvedCases().map((item, idx) => (
                              <div
                                key={idx}
                                className="mb-4 text-sm grid grid-cols-[.7fr,.3fr] gap-3"
                              >
                                <p className="">{item.message}</p>
                                <button className="px-4 py-2 h-fit w-fit text-white bg-primaryBlue rounded">
                                  View details
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="">
                            <Empty content="no resolved cases yet." />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <SelectedSupport
                  userEmail={selectedUser.email}
                  selectedSupport={selectedSupport}
                  getUserSupports={fetchUserDetails}
                  handleShowSuppportDetails={handleShowSuppportDetails}
                />
              )}
            </>
          )}
        </main>
      </div>
      {addNew ? (
        <div className="fixed z-10 inset-0 bg-black/50 grid place-content-center ">
          <div className="bg-white rounded w-[500px] p-7 max-h-[90vh] overflow-y-auto">
            <div className="relative w-full mx-auto px-5 !py-6 sm:p-10 ">
              <div
                onClick={() => setAddNew(false)}
                className="absolute -top-2 -right-7 hover:font-semibold cursor-pointer flex items-center gap-2 -translate-x-3 sm:-translate-x-4"
              >
                <AiOutlineClose size={20} />
              </div>
              <div className="">
                <p className="font-semibold text-xl mb-6 ">
                  Create New Admin Form
                </p>
                <form
                  onSubmit={formik.handleSubmit}
                  className="w-full flex flex-col gap-10"
                >
                  {/* name */}
                  <div>
                    <CustomInput
                      label="Name"
                      placeholder="full name, last name first"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <Error text={formik.errors.name} />
                    )}
                  </div>
                  {/* email */}
                  <div>
                    <CustomInput
                      label="Email"
                      placeholder="admin email"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <Error text={formik.errors.email} />
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-medium ">Gender:</p>
                    <div className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value={"male"}
                        //@ts-ignore
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value={"female"}
                        //@ts-ignore
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                    {formik.touched.gender && formik.errors.gender && (
                      <Error text={formik.errors.gender} />
                    )}
                  </div>
                  <div>
                    {/* phone number */}
                    <CustomInput
                      label="Phone"
                      placeholder="phone number"
                      {...formik.getFieldProps("phone")}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <Error text={formik.errors.phone} />
                    )}
                  </div>

                  {/* category */}
                  <div className="relative border-b border-b-black pb-2 w-full">
                    <select
                      placeholder="location"
                      {...formik.getFieldProps("role")}
                      className="pl-1 bg-transparent font-semibold border-none outline-none appearance-none w-full"
                    >
                      <option value="Germany">Category</option>
                      <option value="">Admin 1</option>
                      <option value="Nigeria">Admin 2</option>
                      <option value="Ghana">Admin 3</option>
                    </select>
                    <div className="orange-triangle-down"></div>
                  </div>
                  <div>
                    {/* Password */}
                    <CustomInput
                      label="Password"
                      placeholder="password"
                      {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <Error text={formik.errors.password} />
                    )}
                  </div>
                  {/* submit button */}
                  <div className="flex items-center gap-7 mt-2">
                    <button
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
      {/* <Footer /> */}
    </div>
  );
};

export default AdminAdmins;
