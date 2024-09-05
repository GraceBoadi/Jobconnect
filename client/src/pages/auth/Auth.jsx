import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Office } from "../../assets";
import "./auth.css";
import { registerUser, signInUser } from "../../api/auth-api";
import { Login } from "../../redux/userSlice";
import { registerCompany, signInCompany } from "../../api/company-api";
import { Navigation } from "../../components";
import { toast } from "react-toastify";

const Auth = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const loginParam = searchParams.get("login");

  const [isRegister, setIsRegister] = useState(!loginParam);
  const [accountType, setAccountType] = useState("seeker");
  const [open, setOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  let from = location.state?.from?.pathname || "/";

  const closeModal = () => setOpen(true);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (accountType === "seeker") {
        if (isRegister) {
          await registerUser(data)
            .then((response) => {
              toast.success(response?.message, {
                position: toast.TOP_RIGHT,
              });
              setIsRegister(false);
            })
            .catch((e) => {
              toast.error(e?.response?.data?.message, {
                position: toast.TOP_RIGHT,
              });
            });
        } else {
          await signInUser(data)
            .then((response) => {
              window.localStorage.setItem(
                "userInfo",
                JSON.stringify(response.user)
              );
              window.localStorage.setItem("token", response.token);
              toast.success(response?.message, {
                position: toast.TOP_RIGHT,
              });

              dispatch(Login());
              navigate("/");
            })
            .catch((e) => {
              toast.error(e?.response?.data?.message, {
                position: toast.TOP_RIGHT,
              });
            });
        }
      } else {
        if (isRegister) {
          await registerCompany(data)
            .then((response) => {
              toast.success(response?.message, {
                position: toast.TOP_RIGHT,
              });
              setIsRegister(false);
            })
            .catch((e) => {
              console.log(e);
              toast.error(e?.response?.data?.message, {
                position: toast.TOP_RIGHT,
              });
            });
        } else {
          await signInCompany(data)
            .then((response) => {
              toast.success(response?.message, {
                position: toast.TOP_RIGHT,
              });
              window.localStorage.setItem(
                "userInfo",
                JSON.stringify(response.user)
              );
              window.localStorage.setItem("token", response.token);

              dispatch(Login());
              navigate("/");
            })
            .catch((e) => {
              toast.error(e?.response?.data?.message, {
                position: toast.TOP_RIGHT,
              });
            });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {user?.token ? (
        <Navigate to={from} />
      ) : (
        <div>
          <Navigation isAuth={true} />
          <img src={Office} alt="Office" className="object-img" />
          <Transition appear show={open || false}>
            <Dialog as="div" className="" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="modal-overlay" />
              </Transition.Child>

              <div className="modal-open">
                <div className="modal-content">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="modal-dialog">
                      <Dialog.Title as="h3" className="modal-title">
                        {isRegister ? "Create Account" : "Account Sign In"}
                      </Dialog.Title>

                      <div className="account-buttons">
                        <button
                          className={`account-button ${
                            accountType === "seeker" ? "seeker" : "company"
                          }`}
                          onClick={() => setAccountType("seeker")}
                        >
                          Seeker
                        </button>
                        <button
                          className={`account-button ${
                            accountType !== "seeker" ? "seeker" : "company"
                          }`}
                          onClick={() => setAccountType("company")}
                        >
                          Company
                        </button>
                      </div>

                      <form
                        className="form-wrapper"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="form-group">
                          <label className="form-group__label">
                            Email Address
                          </label>
                          <input
                            name="email"
                            placeholder="email@example.com"
                            type="email"
                            className="form-input"
                            {...register("email", {
                              required: "Email Address is required!",
                            })}
                            aria-invalid={errors.email ? "true" : "false"}
                          />
                          {errors.email && (
                            <span className="form-error">
                              {errors.email.message}
                            </span>
                          )}
                        </div>

                        {isRegister && (
                          <div className="form-group-flex">
                            <div className="form-group">
                              <label className="form-group__label">
                                {accountType === "seeker"
                                  ? "First Name"
                                  : "Company Name"}
                              </label>
                              <input
                                name={
                                  accountType === "seeker"
                                    ? "firstName"
                                    : "name"
                                }
                                placeholder={
                                  accountType === "seeker"
                                    ? "eg. James"
                                    : "Company name"
                                }
                                type="text"
                                className="form-input"
                                {...register(
                                  accountType === "seeker"
                                    ? "firstName"
                                    : "name",
                                  {
                                    required:
                                      accountType === "seeker"
                                        ? "First Name is required"
                                        : "Company Name is required",
                                  }
                                )}
                                aria-invalid={
                                  errors.firstName || errors.name
                                    ? "true"
                                    : "false"
                                }
                              />
                              {accountType === "seeker"
                                ? errors.firstName && (
                                    <span className="form-error">
                                      {errors.firstName.message}
                                    </span>
                                  )
                                : errors.name && (
                                    <span className="form-error">
                                      {errors.name.message}
                                    </span>
                                  )}
                            </div>

                            {accountType === "seeker" && isRegister && (
                              <div className="form-group">
                                <label className="form-group__label">
                                  Last Name
                                </label>
                                <input
                                  name="lastName"
                                  type="text"
                                  placeholder="eg. Doe"
                                  className="form-input"
                                  {...register("lastName", {
                                    required: "Last Name is required",
                                  })}
                                  aria-invalid={
                                    errors.lastName ? "true" : "false"
                                  }
                                />
                                {errors.lastName && (
                                  <span className="form-error">
                                    {errors.lastName.message}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="form-group-flex">
                          <div className="form-group">
                            <label className="form-group__label">
                              Password
                            </label>
                            <input
                              name="password"
                              placeholder="Password"
                              type="password"
                              className="form-input"
                              {...register("password", {
                                required: "Password is required!",
                              })}
                              aria-invalid={errors.password ? "true" : "false"}
                            />
                            {errors.password && (
                              <span className="form-error">
                                {errors.password.message}
                              </span>
                            )}
                          </div>

                          {isRegister && (
                            <div className="form-group">
                              <label className="form-group__label">
                                Confirm Password
                              </label>
                              <input
                                name="cPassword"
                                placeholder="Password"
                                type="password"
                                className="form-input"
                                {...register("cPassword", {
                                  validate: (value) => {
                                    const { password } = getValues();
                                    return (
                                      password === value ||
                                      "Passwords do not match"
                                    );
                                  },
                                })}
                                aria-invalid={
                                  errors.cPassword ? "true" : "false"
                                }
                              />
                              {errors.cPassword && (
                                <span className="form-error">
                                  {errors.cPassword.message}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="auth-button-area">
                          <button
                            className="submit-button"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting
                              ? "Submitting..."
                              : isRegister
                              ? "Create Account"
                              : "Login Account"}
                          </button>
                        </div>
                      </form>

                      <div className="switch-text">
                        <p className="">
                          {isRegister
                            ? "Already has an account?"
                            : "Do not have an account"}

                          <span
                            className="switch-link"
                            onClick={() => setIsRegister((prev) => !prev)}
                          >
                            {isRegister ? "Login" : "Create Account"}
                          </span>
                        </p>
                        <p className="">
                          <Link className="switch-link" to={"/all-jobs"}>
                            Home
                          </Link>
                        </p>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
    </>
  );
};

export default Auth;
