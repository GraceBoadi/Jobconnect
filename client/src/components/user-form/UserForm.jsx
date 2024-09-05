import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import "./user-form.css";
import { updateUser } from "../../api/auth-api";
import { Login } from "../../redux/userSlice";
import { handleFileUpload } from "../../utils";
import { toast } from "react-toastify";

const UserForm = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const closeModal = () => setOpen(false);

  const [profileImage, setProfileImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const completeData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contact: data.contact,
      location: data.location,
      jobTitle: data.jobTitle,
      about: data.about,
      profileUrl: profileImage
        ? await handleFileUpload(profileImage)
        : data.profileUrl,
    };

    try {
      await updateUser(completeData, user?.token)
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
          closeModal();
        })
        .catch((e) => {
          toast.error(e?.response?.data?.message, {
            position: toast.TOP_RIGHT,
          });
        });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setProfileImage(selectedFile);
    }
  };

  return (
    <div>
      <Transition appear show={open ?? false} as={Fragment}>
        <Dialog as="div" className="dialog" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="dialog-backdrop" />
          </Transition.Child>

          <div className="dialog-content-wrapper">
            <div className="dialog-content">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="dialog-panel">
                  <Dialog.Title as="h3" className="dialog-title">
                    Edit Profile
                  </Dialog.Title>

                  <form
                    className="dialog-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="dialog-form-input-group">
                      <div className="dialog-form-input">
                        <div className="form-group">
                          <label className="form-group__label">
                            First Name
                          </label>
                          <input
                            name="firstName"
                            placeholder="James"
                            type="text"
                            className="form-input"
                            {...register("firstName", {
                              required: "First Name is required",
                            })}
                            aria-invalid={errors.firstName ? "true" : "false"}
                          />
                          {errors.firstName && (
                            <span className="form-error">
                              {errors.firstName?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="dialog-form-input">
                        <div className="form-group">
                          <label className="form-group__label">Last Name</label>
                          <input
                            name="lastName"
                            placeholder="Doe"
                            type="text"
                            className="form-input"
                            {...register("lastName", {
                              required: "Last Name is required",
                            })}
                            aria-invalid={errors.lastName ? "true" : "false"}
                          />
                          {errors.lastName && (
                            <span className="form-error">
                              {errors.lastName?.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="dialog-form-input-group">
                      <div className="dialog-form-input">
                        <div className="form-group">
                          <label className="form-group__label">Contact</label>
                          <input
                            name="contact"
                            placeholder="Phone Number"
                            type="text"
                            className="form-input"
                            {...register("contact", {
                              required: "Contact is required!",
                            })}
                            aria-invalid={errors.contact ? "true" : "false"}
                          />
                          {errors.contact && (
                            <span className="form-error">
                              {errors.contact?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="dialog-form-input">
                        <div className="form-group">
                          <label className="form-group__label">Location</label>
                          <input
                            name="location"
                            placeholder="Location"
                            type="text"
                            className="form-input"
                            {...register("location", {
                              required: "Location is required",
                            })}
                            aria-invalid={errors.location ? "true" : "false"}
                          />
                          {errors.location && (
                            <span className="form-error">
                              {errors.location?.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="dialog-form-input-group">
                      <div className="form-group">
                        <label className="form-group__label">Job Title</label>
                        <input
                          name="jobTitle"
                          placeholder="Software Engineer"
                          type="text"
                          className="form-input"
                          {...register("jobTitle", {
                            required: "Job Title is required",
                          })}
                          aria-invalid={errors.jobTitle ? "true" : "false"}
                        />
                        {errors.jobTitle && (
                          <span className="form-error">
                            {errors.jobTitle?.message}
                          </span>
                        )}
                      </div>
                      <div className="upload-form">
                        <label className="text-gray-600 text-sm mb-1">
                          Profile Picture
                        </label>
                        <input
                          className="custom-file-input"
                          type="file"
                          accept="image/*"
                          onChange={handleChange}
                        />
                      </div>
                      {/* <div className="upload-form">
                        <label className="text-gray-600 text-sm mb-1">
                          Resume
                        </label>
                        <input
                          className="custom-file-input"
                          type="file"
                          onChange={(e) => setUploadCv(e.target.files[0])}
                        />
                      </div> */}
                    </div>
                    <div className="form-group">
                      <label className="text-gray-600 text-sm mb-1">
                        About
                      </label>
                      <textarea
                        className="dialog-form-textarea"
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required:
                            "Write a little bit about yourself and your projects",
                        })}
                        aria-invalid={errors.about ? "true" : "false"}
                      ></textarea>
                      {errors.about && (
                        <span role="alert" className="dialog-form-error">
                          {errors.about?.message}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="dialog-form-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UserForm;
