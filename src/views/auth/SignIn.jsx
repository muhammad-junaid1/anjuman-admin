import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import { useState } from "react";
import { toast } from "react-toastify";
import { postApi } from "services/api";
import { AiFillQuestionCircle } from "react-icons/ai";

export default function SignIn() {
  const [values, setValues] = useState({
    password: ""
  })
  const handleSignIn = async (e) => {
    e.preventDefault();
    
    try {
      const response = await postApi("api/auth/login?isAdmin=true", {
        password: values.password
      });  
      console.log(response); 
      if(response.status === 200) {
        localStorage.setItem("admin_anjuman_token", response.data?.token); 
        document.location.href = "/admin/default";
      } else {
        toast.error("Invalid password. Please try again."); 
      }
    } catch (error) {
      console.log(error); 
      toast.error("Something went wrong"); 
    }
  }
  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <form onSubmit={handleSignIn} className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your password to sign in!
        </p>

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-1"
          label="Password*"
          required={true}
          placeholder=""
          id="password"
          value={values.password}
          onInput={(e) => setValues({...values, password: e.target.value})}
          type="password"
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
       
    
        </div>
        <button className="linear w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Sign In
        </button>

      </form>
    </div>
  );
}
