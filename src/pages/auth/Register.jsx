/* eslint-disable no-useless-escape */
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { MdDataUsage } from "react-icons/md";
import { Logo } from "../../assets/images/images";
import Button from "../../components/button/Button";
import CustomTextField from "../../components/inputs/CustomTextField";
import { useSignupMutation } from "../../redux/services/auth.api";

const Register = () => {

  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    phoneNumber: '',
    email: "",
    password: "",
    confirmPassword: ''
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const [signupUser, { isLoading }] = useSignupMutation();



  const navigate = useNavigate();

  
  const handleSubmit = async () => {
    if (!disabled) {
      if (input.password !== input.confirmPassword) {
        toast.error('Password and Confirm Password do not match')
        return;
      } if (!isPhoneValid) {
        toast.error('Enter a valid phone number');
        return;
      }
      if (input)
        await signupUser(
          {
            firstname: input.firstName,
            lastname: input.lastName,
            middlename: input.middleName,
            emailaddress: input.email,
            phonenumber: input.phoneNumber,
            role: 32,
            password: input.password
          }
        ).unwrap().then((res) => {
          toast.success(res?.message);
          navigate('/verifyaccount', {state: {email: input.email}});
        }).catch((err => {
          toast.error(err?.data?.message)
        }))
    } else {
      toast.error('Kindly fill in all fields')
    }
  }

  const disabled =
    !isEmailValid ||
    isLoading ||
    !input.email ||
    !input.phoneNumber ||
    !input.password ||
    !input.confirmPassword ||
    !input.firstName ||
    !input.lastName ||
    input.password !== input.confirmPassword;


  return (
    <div className="app-signup-container flex justify-center items-center animated slideInUpTiny animation-duration-3 min-h-screen">
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
            <h1 className="font-title text-3xl pt-2 text-white">Register</h1>
          </div>

          <div className="app-login-form">
            <form>
              <fieldset>
                <div className="grid md:grid-cols-2 gap-x-4 grid-cols-1">
                  <CustomTextField
                    label={'First Name'}
                    variant={'outlined'}
                    value={input.firstName}
                    onChange={(e) => setInput({ ...input, firstName: e.target.value })}
                    type='text'
                  />
                  <CustomTextField
                    label={'Last Name'}
                    variant={'outlined'}
                    value={input.lastName}
                    onChange={(e) => setInput({ ...input, lastName: e.target.value })}
                    type='text'
                  />
                  <CustomTextField
                    label={'Middle Name'}
                    variant={'outlined'}
                    value={input.middleName}
                    onChange={(e) => setInput({ ...input, middleName: e.target.value })}
                    type='text'
                  />
                  <CustomTextField
                    label={'Phone Number'}
                    variant={'outlined'}
                    value={input.phoneNumber}
                    // onChange={(e) => setInput({ ...input, phoneNumber: e.target.value })}
                    onChange={(e) => {
                      const phoneValue = e.target.value;
                      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/;
                      setIsPhoneValid(phoneRegex.test(phoneValue));
                      setInput({ ...input, phoneNumber: phoneValue });
                    }}
                    type='tel'
                  />
                </div>
                <div className="">
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
                </div>
                <div className="grid md:grid-cols-2 gap-x-4 grid-cols-1">
                  <CustomTextField
                    label={'Password'}
                    variant={'outlined'}
                    value={input.password}
                    onChange={(e) => setInput({ ...input, password: e.target.value })}
                    type='password'
                  />
                  <CustomTextField
                    label={'Confirm Password'}
                    variant={'outlined'}
                    value={input.confirmPassword}
                    onChange={(e) => setInput({ ...input, confirmPassword: e.target.value })}
                    type='password'
                  />
                </div>
              </fieldset>
              <div className="mb-3 flex items-center justify-between">
                <Button
                  title={<span className="text-center w-full flex justify-center gap-3 items-center">Sign Up {isLoading ? <MdDataUsage className="animate-spin" /> : ''}</span>}
                  className={`cursor-pointer pillarsalt-subtitle-three flex justify-center items-center w-full  font-bold border border-primary bg-white text-primary rounded-md text-center p-2 disabled:bg-[rgba(206,217,224,0.5)] disabled:border-none disabled:text-primary`}
                  onClick={() => handleSubmit()}
                  type="button"
                  disabled={disabled}
                />

              </div>
              <div className="mb-3 text-white">
                <p>{"Already have an account?"} <span className="underline cursor-pointer" onClick={() => navigate('/login')}>Login</span></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Register