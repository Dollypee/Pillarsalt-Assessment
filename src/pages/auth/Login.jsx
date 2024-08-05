import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdDataUsage } from "react-icons/md";
import { Logo } from "../../assets/images/images";
import Button from "../../components/button/Button";
import CustomTextField from "../../components/inputs/CustomTextField";
import { useLoginMutation } from "../../redux/services/auth.api";
import { setUser } from "../../redux/features/Auth.slice";

const Login = () => {

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [loginuser, { isLoading }] = useLoginMutation()


  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async () => {
    if (input.email && input.password) {
      if (isEmailValid) {
        await loginuser({
          "emailAddress": input.email,
          "password": input.password
        }).unwrap().then((res) => {
          dispatch(setUser({ token: res?.token, user: res?.details }));
          navigate('/dashboard/wallet');
        }).catch(err => {
          toast.error(err?.data?.errorMessage)
      })
    } else {
      toast.error('Enter a valid email address')
    }
  } else {
    toast.error('Kindly fill in all fields')
}
  }

return (
  <div className="app-login-container flex justify-center items-center animated slideInUpTiny animation-duration-3 h-screen">
    <div className="app-login-main-content flex w-full flex-col-reverse md:flex-row">
      <div className="app-logo-content flex items-center justify-center">
        <Link className="logo-lg" to="/" title="pillarsalt">
          <img
            src={Logo}
            alt="pillarsalt Logo"
            title="pillarsalt Logo"
          />
        </Link>
      </div>

      <div className="app-login-content">
        <div className="app-login-header mb-4">
          <h1 className="font-title text-3xl pt-2 text-white">Login</h1>
        </div>

        <div className="app-login-form">
          <form>
            <fieldset>

              <CustomTextField
                label={'Email Address'}
                variant={'outlined'}
                value={input.email}
                onChange={(e) => {
                  const emailValue = e.target.value;
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setIsEmailValid(emailRegex.test(emailValue));
                  setInput({ ...input, email: e.target.value })
                }}
                type='email'
              />
              <CustomTextField
                label={'Password'}
                variant={'outlined'}
                value={input.password}
                onChange={(e) => setInput({ ...input, password: e.target.value })}
                type='password'
              />
            </fieldset>
            <div className="mb-3 flex items-center justify-between">
              <Button
                title={ !isLoading ? 'Login' : <span className="text-center w-full flex gap-3 items-center justify-center">Logging in... <MdDataUsage className="animate-spin" /></span>}
                className={`cursor-pointer pillarsalt-subtitle-three flex justify-center items-center w-full  font-bold border border-primary bg-white text-primary rounded-md text-center p-2 disabled:bg-[rgba(206,217,224,0.5)] disabled:border-none disabled:text-primary`}
                onClick={() => handleSubmit()}
                type="button"
                disabled={!input.email || !input.password}
              />

            </div>
            <div className="mb-3 text-white">
              <p>{"Don't have an account?"} <span className="underline cursor-pointer" onClick={() => navigate('/signup')}>Register here</span></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

)
}

export default Login