import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDataUsage } from "react-icons/md";
import { Logo } from "../../assets/images/images";
import Button from "../../components/button/Button";
import { useVerifyaccountMutation } from "../../redux/services/auth.api";
import DigitInput from "../../components/inputs/DigitInput";

const VerifyAccount = () => {

  const [email, setEmail] = useState(false);

  const [code, setCode] = useState('');

  const handleCodeChange = (value) => {
    setCode(value);
  };
  const [verifyAccount, { isLoading }] = useVerifyaccountMutation();



  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.email) {
      setEmail(location?.state?.email);
    } else {
      navigate('/signup')
    }

  }, [location?.state, navigate])



  const handleSubmit = async () => {
    if (email && code?.length === 6) {
      await verifyAccount({
        "activationCode": code,
        "emailAddress": email
      }).unwrap().then((res) => {
        toast.success(res?.message);
        navigate('/login')
      }).catch((err) => toast.error(err?.data?.message))
    } else {
      toast.error('Enter all 6 digits')
    }
  }

  const disabled = !email || code?.length !== 6

  return (
    <div className="max-w-[500px] mx-auto flex justify-center items-center animated slideInUpTiny animation-duration-3 h-screen">
      <div className="app-login-main-content flex w-full flex-col">
        <div className="bg-white py-[35px] px-[20px] w-full flex items-center justify-center">
          <Link className="logo-lg" to="/" title="pillarsalt">
            <img
              src={Logo}
              alt="pillarsalt Logo"
              title="pillarsalt Logo"
            />
          </Link>
        </div>

        <div className="py-[35px] px-[20px] w-full mx-auto">
          <div className="app-login-header mb-4 text-center">
            <h1 className="font-title text-3xl pt-2 text-white">Verify Account</h1>
            <p className="text-white mt-3 pillarsalt-normal-text-three">A code has been sent to {email}. Please enter the code to continue</p>
          </div>

          <div className="mt-4">
            <DigitInput onChange={handleCodeChange} />
          </div>

          <div className="mt-7 mb-3 flex items-center justify-center">
            <Button
              title={!isLoading ? 'Verify' : <span className="text-center w-full flex gap-3 items-center justify-center">Verifying... <MdDataUsage className="animate-spin" /></span>}
              className={`cursor-pointer pillarsalt-subtitle-three flex justify-center items-center px-8 font-bold border border-primary bg-white text-primary rounded-md text-center p-2 disabled:bg-[rgba(206,217,224,0.5)] disabled:border-none disabled:text-primary`}
              onClick={() => handleSubmit()}
              type="button"
              disabled={disabled}
            />

          </div>
        </div>
      </div>
    </div>

  )
}

export default VerifyAccount