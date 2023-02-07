import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";

import { sidebarList } from "../../data/AdminDashboard";
import filter from "../../assets/images/Filter 1.png";
import previous from "../../assets/images/icon-previous.svg";
import next from "../../assets/images/icon-next.svg";
import { FiArrowLeft } from "react-icons/fi";
import { AiOutlineCaretDown, AiOutlineCloudDownload } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { apiEndpoints, BASE_URL } from "../../config/Endpoints";
import { ImSpinner2 } from "react-icons/im";
import moment from "moment";
import profile from "../../assets/images/profile.jpg";
import { ISupport } from "../../extra/types";
import SelectedSupport from "../../components/SelectedSupport";

interface IAnalytics {
  total_users: string;
  total_cases: string;
  total_parnters: string;
}

export function trim(text: string, max: number = 20) {
  if (text.length > max) {
    return `${text.substring(0, max)}...`;
  }
  return text;
}

const AdminDashboard = () => {
  const [analyticsCount, setAnalyticsCount] = useState({} as IAnalytics);

  const requestStatus = ["pending", "completed", "Inconclusive"];
  const analytics = [
    {
      name: "beneficiaries",
      count: analyticsCount?.total_users
    },
    {
      name: "volunteers",
      count: analyticsCount?.total_parnters
    },
    {
      name: "solved cases",
      count: analyticsCount.total_cases
    }
  ];
  const tableHeader = ["name", "case", "email", "date", "status", "action"];
  const [tableData, setTableData] = useState([] as Array<ISupport>);
  const [viewRequest, setViewRequest] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const itemCount = 5;
  const [selectedSupport, setSelectedSupport] = useState({} as ISupport);
  const toggleShowDetails = () => setViewRequest(!viewRequest);
  const handleShowStatus = () => setShowStatus(!showStatus);

  async function getAnalytics() {
    setAnalyticsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/${apiEndpoints.ANALYTICS}`);
      setAnalyticsCount(res.data.data);
    } catch (error) {
      toast.error("Unable to fetch user analytics");
    } finally {
      setAnalyticsLoading(false);
    }
  }

  async function getAllSupports() {
    try {
      const res = await axios.get(`${BASE_URL}/${apiEndpoints.SUPPORT}`);
      setTableData(res.data.data);
    } catch (error) {
      toast.error("Error retrieving supports from db", { theme: "colored" });
    }
  }

  function getButtomPagination() {
    const number = Math.ceil(tableData?.length / itemCount);
    return number;
  }

  function getInRangeItems(array: Array<ISupport>) {
    const lowerLimit = (pageIndex - 1) * itemCount;
    const upperLimit = itemCount * pageIndex;
    const res = array.filter((_, idx) => idx >= lowerLimit && idx < upperLimit);
    return res;
  }

  useEffect(() => {
    getAnalytics();
    getAllSupports();
  }, []);

  useEffect(() => {
    console.log("hi", analyticsCount);
  }, [analyticsCount]);

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
      <Header dashboard />
      <div className="flex-1 flex">
        <DashboardSidebar sidebarList={sidebarList} />
        <main className="w-full lg:w-4/5 bg-[#fff] h-full py-8 px-10 flex flex-col">
          {!viewRequest ? (
            <>
              <div className="bg-[#f1f1ff] px-10 py-4 text-2xl font-bold">
                Welcome back
              </div>
              {analyticsLoading ? (
                <div className="py-20">
                  <ImSpinner2 className="animate-spin mx-auto" size={22} />
                  <p className="text-center font-semibold">Loading...</p>
                </div>
              ) : (
                <div className="mt-5 gap-5 flex">
                  {analytics.map((item, idx) => (
                    <div
                      key={idx}
                      className="min-w-[170px] shadow rounded px-6 py-3 bg-[#E3E4FF] flex flex-col items-center"
                    >
                      <p className="text-xl font-bold">{item.count}+</p>
                      <p className="capitalize font-semibold">{item.name}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className='flex flex-col flex-1'>
                <div className="mt-8 flex items-center justify-between pb-5 border-b">
                  <p className="text-xl font-semibold">
                    Recent Beneficiaries Requests
                  </p>
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
                </div>
                <div className="mt-2 mb-5 pb-5 border-b">
                  <table className="w-full">
                    <thead> 
                      <tr>
                        {tableHeader.map((item, idx) => (
                          <th
                            className={`capitalize text-left ${
                              idx === 1 && "px-5"
                            } `}
                            key={idx}
                          >
                            {item}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {getInRangeItems(tableData).map((item, idx) => (
                        <tr key={idx} className="text-sm">
                          <td className="pt-4">
                            <div className="flex items-center gap-2">
                              <img
                                className="rounded-full w-7"
                                src={profile}
                                alt="user"
                              />
                              <p className="font-semibold">{item.name}</p>
                            </div>
                          </td>
                          <td className="pt-4 px-5">
                            {trim(item.message, 30)}
                          </td>
                          <td className="pt-4 pr-5">
                            {item.email ?? "dummy@email.com"}
                          </td>
                          <td className="pt-4 whitespace-nowrap">
                            {moment(item.createdAt).format("YYYY-MM-DD") ||
                              "2000-20-02"}
                          </td>
                          <td className="px-5 pt-4 pr-3">
                            <button className="min-w-[100px] text-xs rounded px-4 py-2 text-white capitalize font-semibold w-fit bg-[coral]">
                              {item.status ?? "None"}
                            </button>
                         </td>
                          <td className="pt-4">
                            <button
                              onClick={() => {
                                toggleShowDetails();
                                setSelectedSupport(item);
                              }}
                              className="text-xs  rounded px-6 py-2 text-white capitalize font-semibold w-fit bg-blue-500"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-auto flex justify-between pt-3">
                  <p className="text-sm">
                    Showing{" "}
                    <span className="font-semibold">
                      {tableData.length ? itemCount * (pageIndex - 1) + 1 : "0"}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold">
                      {" "}
                      {tableData.length ? itemCount * pageIndex : 0}{" "}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold">
                      {" "}
                      {tableData.length || 0}{" "}
                    </span>
                    Entries
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      className="disabled:opacity-50"
                      onClick={() => setPageIndex((prev) => prev - 1)}
                      disabled={pageIndex === 1}
                    >
                      <img
                        className="w-2.5 mr-2"
                        src={previous}
                        alt="previous"
                      />
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
                      disabled={pageIndex * itemCount >= tableData.length}
                      onClick={() => setPageIndex((prev) => prev + 1)}
                    >
                      <img className="w-2.5 ml-2" src={next} alt="next" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <SelectedSupport
              selectedSupport={selectedSupport}
              handleShowSuppportDetails={toggleShowDetails}
              getAllSupports = {getAllSupports}
            />
          )}
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminDashboard;
