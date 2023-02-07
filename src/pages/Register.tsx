import { useState } from "react";
import registerWoman from "../assets/images/register-woman.png";
import google from "../assets/images/google.png";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";
import { apiEndpoints, BASE_URL } from "../config/Endpoints";

interface InputProps {
  label?: string;
  type?: string;
}

interface ErrorProps {
  text: string;
}

//@ts-ignore
const CustomInput = ({ label, type, ...rest }: InputProps) => {
  return (
    <div className="flex items-end gap-3 border-b border-b-black pb-2 mt-4">
      <label className="text-sm font-medium whitespace-nowrap" htmlFor="name">
        {label}
      </label>
      <input
        autoComplete="off"
        className="bg-transparent w-full outline-none border-none "
        type={type ? type : "text"}
        {...rest}
      />
    </div>
  );
};

const Error = ({ text }: ErrorProps) => (
  <span className="text-[coral] text-xs">{text}</span>
);

const Register = () => {
  const [iAgree, setIAgree] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name field is required"),
    phone: Yup.string().required("Phone Number is required"),
    location: Yup.string().required("This field is required"),
    email: Yup.string()
      .required("Email field is required")
      .email("Please enter a valid email"),
    password: Yup.string().required("Email field is required"),
    confirm_password: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
      location: ""
    },
    validationSchema,
    onSubmit(values) {
      setLoading(true);
      axios
        .post(`${BASE_URL}/${apiEndpoints.REGISTER}`, values)
        .then((res) => {
          toast.success("User registration successfull", { theme: "colored" });
          navigate("/login");
        })
        .catch((err) =>
          toast.error(`Error occurred ${err?.message}`, { theme: "colored" })
        )
        .finally(() => setLoading(false));
    }
  });

  return (
    <section className="px-[5%] overflow-hidden grid md:grid-cols-2 gap-10 h-[calc(100vh-80px)]">
      <form
        onSubmit={formik.handleSubmit}
        className="h-[90%] overflow-auto px-5 sm:px-10 p-10 my-auto bg-[#cbccda] bg-opacity-75"
      >
        <p className="text-primaryBlue text-2xl font-bold">Ten Network</p>
        <div className="my-6">
          <p className="font-semibold text-xl ">Create Account</p>
          <p>Please enter your details</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="">
            <CustomInput label={"Name"} {...formik.getFieldProps("name")} />
            {formik.touched.name && formik.errors.name && (
              <Error text={formik.errors.name} />
            )}
          </div>
          <div className="">
            <CustomInput label={"Email"} {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email && (
              <Error text={formik.errors.email} />
            )}
          </div>
          <div className="">
            <CustomInput label={"Phone"} {...formik.getFieldProps("phone")} />
            {formik.touched.phone && formik.errors.phone && (
              <Error text={formik.errors.phone} />
            )}
          </div>
          <div className="">
            <CustomInput
              label={"Location"}
              {...formik.getFieldProps("location")}
            />
            {formik.touched.location && formik.errors.location && (
              <Error text={formik.errors.location} />
            )}
          </div>
          <div className="">
            <CustomInput
              label={"Password"}
              type="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <Error text={formik.errors.password} />
            )}
          </div>
          <div className="">
            <CustomInput
              label={"Confirm Password"}
              type="password"
              {...formik.getFieldProps("confirm_password")}
            />
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <Error text={formik.errors.confirm_password} />
              )}
          </div>
        </div>
        <div className="flex gap-5 mt-10 mb-5">
          <div
            onClick={() => setIAgree(!iAgree)}
            className="cursor-pointer flex gap-2 items-start sm:items-center "
          >
            <div
              className={`${
                iAgree && "mt-[5px] sm:mt-[unset] bg-[orange]"
              } w-[10px] h-[10px] border-2 border-[orange]`}
            ></div>
            <p className="text-sm sm:text-sm">
              I agree to the Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="disabled:bg-opacity-50 bg-primaryBlue text-white w-full py-[10px]"
        >
          {loading ? (
            <ImSpinner2 size={22} className="animate-spin mx-auto" />
          ) : (
            "Sign Up"
          )}
        </button>
        <button
          type="button"
          className="justify-center bg-white flex items-center gap-2 mt-5 w-full py-3"
        >
          <img className="w-5" src={google} alt="google" />
          <p>Continue with Google</p>
        </button>
        <p className="text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-900 underline font-medium cursor-pointer"
          >
            Log In
          </span>
        </p>
      </form>
      <div className="hidden md:flex h-[90%] my-auto overflow-hidden bg-[#cbccda] bg-opacity-75">
        <img
          className="my-auto -translate-y-16"
          src={registerWoman}
          alt="register woman"
        />
      </div>
    </section>
  );
};

export default Register;
