import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import { AiOutlineCaretDown, AiOutlineCloudDownload } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { apiEndpoints, BASE_URL } from "../config/Endpoints";
import { IPartner, ISupport } from "../extra/types";

interface IProps {
  userEmail?: string;
  selectedSupport: ISupport;
  handleShowSuppportDetails: () => void;
  getUserSupports?: (email: string) => void;
  getAllSupports?: () => void;
}

const SelectedSupport = (props: IProps) => {
  const {
    selectedSupport,
    handleShowSuppportDetails,
    getUserSupports,
    userEmail,
    getAllSupports
  } = props;
  const requestStatus = ["pending", "verified", "in progress", "completed"];
  const [showStatus, setShowStatus] = useState(false);
  const [showParnters, setShowPartners] = useState(false);
  const [support, setSupport] = useState({} as ISupport);
  const [partners, setPartners] = useState([] as Array<IPartner>);
  const [selectedPartner, setSelectedPartner] = useState({} as IPartner);

  const handleShowStatus = () => setShowStatus(!showStatus);

  async function getSupportDetails() {
    try {
      const res = await axios.get(
        `${BASE_URL}/${apiEndpoints.SUPPORT}/${selectedSupport._id}/details`
      );
      setSupport(res.data?.data);
    } catch (error) {
      toast.error("Error updating status.", { theme: "colored" });
    }
  }

  async function updateStatus(data: Object) {
    try {
      const res = await axios.patch(
        `${BASE_URL}/${apiEndpoints.SUPPORT}/${selectedSupport._id}`,
        data
      );
      getSupportDetails();
      if (getUserSupports) getUserSupports(userEmail!);
      if(getAllSupports) getAllSupports();
      toast.success("Status updated succesfully", { theme: "colored" });
    } catch (error) {
      toast.error("Error updating status.", { theme: "colored" });
    }
  }

  function handleUpdateStatus(status: string) {
    const data = {
      status
    };
    updateStatus(data);
  }

  async function fetchPartners() {
    try {
      const res = await axios.get(`${BASE_URL}/${apiEndpoints.PARTNERS}`);
      setPartners(res.data.data);
    } catch (error) {
      toast.error("Error fetching users from database", { theme: "colored" });
    }
  }

  async function handleAssignPartner(assigned_body: Object) {
    console.log(assigned_body);
    try {
      const res = await axios.patch(
        `${BASE_URL}/${apiEndpoints.SUPPORT}/${selectedSupport._id}`,
        assigned_body
      );
      getSupportDetails();
      if (getUserSupports) getUserSupports(userEmail!);
      if (getAllSupports) getAllSupports();
      toast.success("Partner organization assigned succesfully", {
        theme: "colored"
      });
    } catch (error) {
      toast.error("Error updating status.", { theme: "colored" });
    }
  }

  useEffect(() => {
    getSupportDetails();
    fetchPartners();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="border-b pb-3 flex items-center justify-between">
        <button
          onClick={() => handleShowSuppportDetails()}
          className="flex items-center gap-2 py-3 px-2"
        >
          <FiArrowLeft />
          <span className="text-base opacity-90 font-semibold">
            /{support?.name}/Request details
          </span>
        </button>
        <button
          onClick={handleShowStatus}
          className="relative flex items-center gap-2 bg-blue-500 px-4 py-2 rounded text-white text-xs"
        >
          Change Request Status <AiOutlineCaretDown />{" "}
          {showStatus && (
            <div className="overflow-hidden w-full bg-blue-500 z-10 absolute top-10 left-0 rounded grid">
              {requestStatus.map((status, idx) => (
                <p
                  onClick={() => handleUpdateStatus(status)}
                  className="px-5 py-2.5 hover:bg-blue-700 text-left capitalize"
                  key={idx}
                >
                  {status}
                </p>
              ))}
            </div>
          )}
        </button>
      </div>
      <div className="max-w-3xl">
        <div className="mt-7 flex items-center justify-between">
          <p className="text-lg font-semibold">
            Showing information for support request
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {}}
              className="text-xs whitespace-nowrap w-full rounded px-5 py-1.5 text-white capitalize font-semibold bg-[coral]"
            >
              {support?.status ?? "None"}
            </button>{" "}
            <button
              onClick={() => setShowPartners(!showParnters)}
              className="relative text-xs w-full rounded px-5 py-1.5 text-white capitalize font-semibold bg-blue-500"
            >
              {showParnters && (
                <div className="overflow-hidden min-w-[170px] bg-blue-500 z-10 absolute top-10 left-0 rounded grid">
                  {partners.map((partner, idx) => (
                    <p
                      onClick={() =>
                        handleAssignPartner({ assigned_body: partner })
                      }
                      className="whitespace-nowrap px-5 py-2.5 hover:bg-blue-700 text-left capitalize"
                      key={idx}
                    >
                      {partner.name}
                    </p>
                  ))}
                </div>
              )}
              Assign
            </button>
          </div>
        </div>
        <div className="grid gap-10 grid-cols-[.8fr,.2fr] shadow p-5 rounded mt-5 items-start">
          <div>
            <p className="font-semibold mb-2">About Request</p>
            <p className="text-sm">{support?.message}</p>
            <div className="mt-7">
              <p className="font-semibold mb-2">Assigned volunteer</p>
              <p className="text-sm font-medium">
                {" "}
                Name: {support?.assigned_body?.name ?? "not assigned yet"}
              </p>
              <p className="text-sm font-medium">
                Description:{" "}
                {support?.assigned_body?.description ?? "not assigned yet"}
              </p>
            </div>
            <div className="mt-10">
              <p className="font-semibold mb-2">Attached Documents</p>
              <button className="flex items-center gap-2 px-5 py-2 text-sm border border-current rounded text-primaryBlue">
                <AiOutlineCloudDownload size={22} />
                Download Attachement
              </button>
            </div>
          </div>
          <p className="mt-7 text-sm font-semibold">
            {moment(support?.createdAt).format("l") ?? "01/01/2020"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectedSupport;
