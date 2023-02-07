import { useEffect, useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import { sidebarList } from "../../data/AdminDashboard";

import mijenti from "../../assets/images/mijente.png";
import { VscClose } from "react-icons/vsc";
import axios from "axios";
import { apiEndpoints, BASE_URL } from "../../config/Endpoints";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Error } from "../Emergency";
import { ImSpinner2 } from "react-icons/im";
import { trim } from "./AdminDashboard";
import { IPartner } from "../../extra/types";
import empty from "../../assets/images/no-data.png";

const AdminPartners = () => {
  const [allPartners, setAllPartners] = useState([] as Array<IPartner>);
  const [createPartnerLoading, setCreatePartnerLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string()
      .required("This field is required")
      .email("Please enter a valid email"),
    partner_type: Yup.string().required("Please select one"),
    description: Yup.string().required("Please provide a short description")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      partner_type: "",
      description: ""
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      createPartner(values);
    }
  });

  const [addPartner, setAddPartner] = useState(false);

  const toggleAddPartner = () => setAddPartner(!addPartner);

  async function fetchPartners() {
    try {
      const res = await axios.get(`${BASE_URL}/${apiEndpoints.PARTNERS}`);
      setAllPartners(res.data.data);
    } catch (error) {
      toast.error("Error fetching users from database", { theme: "colored" });
    }
  }

  async function createPartner(data: Object) {
    setCreatePartnerLoading(true);
    try {
      const res = axios.post(`${BASE_URL}/${apiEndpoints.PARTNERS}`, data);
      toast.success("New partner added succesfully", { theme: "colored" });
      formik.resetForm();
      toggleAddPartner();
      fetchPartners();
    } catch (error) {
      toast.error("Error creating partner", { theme: "colored" });
    } finally {
      setCreatePartnerLoading(false);
    }
  }

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
      <Header dashboard />
      <div className="flex-1 flex">
        <DashboardSidebar sidebarList={sidebarList} />
        <main className="w-full lg:w-4/5 bg-[#fff] h-full px-10 ">
          <div className="h-full flex flex-col">
            <div className="mt-8 flex items-center justify-between pb-5 border-b">
              <p className="text-xl font-semibold">Ten Network's Volunteers</p>
              <button
                onClick={toggleAddPartner}
                className="text-white bg-primaryBlue py-2 px-5 rounded text-sm"
              >
                Add new Volunteer
              </button>
            </div>
            <div className="max-w-4xl">
              {allPartners.length ? (
                <>
                  {allPartners.filter(
                    (item) => item.partner_type === "law firm"
                  ).length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-3 mt-5">
                        Law Firms
                      </p>
                      {allPartners
                        .filter((item) => item.partner_type === "law firm")
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className="mb-3 items-center flex justify-between bg-[#fafaff] px-7 py-5"
                          >
                            <img
                              className="h-7"
                              src={mijenti}
                              alt="alternative"
                            />
                            <div className="flex-1 mx-7">
                              <p>{item.description}</p>
                              <p className="font-medium">{item.email}</p>
                            </div>
                            <button className="text-white text-sm px-6 py-1.5 rounded bg-blue-500">
                              View
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                  {allPartners?.filter(
                    (item) => item.partner_type === "law enforcement agency"
                  ).length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-3 mt-5">
                        Law Enforcement Agency
                      </p>
                      {allPartners
                        .filter(
                          (item) =>
                            item.partner_type === "law enforcement agency"
                        )
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className="mb-3 flex items-center justify-between bg-[#fafaff] px-7 py-5"
                          >
                            <img
                              className="h-7"
                              src={mijenti}
                              alt="alternative"
                            />
                            <div className="flex-1 mx-7">
                              <p>{item.description}</p>
                              <p className="font-medium">{item.email}</p>
                            </div>
                            <button className="text-white text-sm px-6 py-1.5 rounded bg-blue-500">
                              View
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                  {allPartners.filter(
                    (item) => item.partner_type === "health care agency"
                  ).length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-3 mt-8">
                        Health Care Agencies
                      </p>
                      {allPartners
                        .filter(
                          (item) => item.partner_type === "health care agency"
                        )
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className="mb-3 flex items-center justify-between bg-[#fafaff] px-7 py-5"
                          >
                            <img
                              className="h-7"
                              src={mijenti}
                              alt="alternative"
                            />
                            <div className="flex-1 mx-7">
                              <p>{trim(item.description, 70)}</p>
                              <p className="font-medium">{item.email}</p>
                            </div>
                            <button className="text-white text-sm px-6 py-1.5 rounded bg-blue-500">
                              View
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-20 grid place-content-center">
                  <img className="w-64" src={empty} alt="empty" />
                  <p className="text-center">No Volunteers added yet</p>
                  <p className="font-semibold text-sm text-center">Add One</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      {addPartner && (
        <div className="inset-0 fixed z-[1000] bg-black/50 grid place-content-center">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded-md p-6 pt-8 relative"
          >
            <VscClose
              size={22}
              className="absolute right-4 top-4 cursor-pointer"
              onClick={toggleAddPartner}
            />
            <p className="font-semibold text-lg">Add New Volunteer</p>
            <div className="flex flex-col mt-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="name"
                className=" w-[350px] p-3 py-2 rounded border outline-none"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <Error text={formik.errors.name} />
              )}
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="type">Volunteer Category</label>
              <select
                placeholder="name"
                className=" w-[350px] p-3 py-2 rounded border outline-none"
                {...formik.getFieldProps("partner_type")}
              >
                <option value={""}>Select one...</option>
                <option value={"law firm"}>Law Firm</option>
                <option value={"law enforcement agency"}>
                  Law Enforcement Agency
                </option>
                <option value={"health care agency"}>Health Care Agency</option>
              </select>
              {formik.touched.partner_type && formik.errors.partner_type && (
                <Error text={formik.errors.partner_type} />
              )}
              <div className="flex flex-col mt-4">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className=" w-[350px] p-3 py-2 rounded border outline-none"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <Error text={formik.errors.email} />
                )}
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="about">Description</label>
                <textarea
                  placeholder="Enter more information about partner"
                  className=" w-[350px] p-3 py-2 rounded border outline-none"
                  {...formik.getFieldProps("description")}
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                  <Error text={formik.errors.description} />
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={createPartnerLoading}
                className="disabled:opacity-50 text-white bg-primaryBlue py-2 px-5 rounded text-sm mt-7"
              >
                {createPartnerLoading ? (
                  <ImSpinner2
                    size={22}
                    className="min-w-[100px] mx-auto animate-spin"
                  />
                ) : (
                  "Create Volunteer"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default AdminPartners;
