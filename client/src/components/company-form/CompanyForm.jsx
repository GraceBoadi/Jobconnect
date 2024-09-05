import "./company-form.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { updateCompanyProfile } from "../../api/company-api";
import { Login } from "../../redux/userSlice";
import { handleFileUpload } from "../../utils";
import { toast } from "react-toastify";

const CompanyForm = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeModal = () => setOpen(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const completeData = {
      name: data.name,
      location: data.location,
      contact: data.contact,
      about: data.about,
      profileUrl: profileImage
        ? await handleFileUpload(profileImage)
        : data.profileUrl,
    };

    try {
      const token = user?.token;
      await updateCompanyProfile(completeData, token)
        .then((response) => {
          toast.success(response?.message, {
            position: toast.TOP_RIGHT,
          });
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(response.company)
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
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Transition appear show={open ?? false} as={Fragment}>
        <Dialog
          as="div"
          className="company-profile-form-dialog"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="company-profile-form-overlay" />
          </Transition.Child>

          <div className="company-profile-form-content">
            <div className="company-profile-form-container">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="company-profile-form">
                  <Dialog.Title as="h3" className="company-profile-form-title">
                    Edit Company Profile
                  </Dialog.Title>

                  <form
                    className="company-profile-form_"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group">
                      <label className="form-group__label">Company Name</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="Company name"
                        className="form-input"
                        {...register("name", {
                          required: "Company Name is required",
                        })}
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                      {errors.name && (
                        <span className="form-error">
                          {errors.name?.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-group__label">
                        Location/Address
                      </label>
                      <input
                        name="location"
                        type="text"
                        placeholder="e.g. California"
                        className="form-input"
                        {...register("location", {
                          required: "Address is required",
                        })}
                        aria-invalid={errors.location ? "true" : "false"}
                      />
                      {errors.location && (
                        <span className="form-error">
                          {errors.location?.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group-flex">
                      <div className="form-group">
                        <label className="form-group__label">Contact</label>
                        <input
                          name="contact"
                          type="text"
                          placeholder="Phone Number"
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

                      <div className="form-group upload-form">
                        <label className="company-profile-form-label">
                          Company Logo
                        </label>
                        <input
                          type="file"
                          className="custom-file-input"
                          onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="company-profile-form-label">
                        About Company
                      </label>
                      <textarea
                        className="company-profile-form-textarea"
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required: "Write a little bit about your company.",
                        })}
                        aria-invalid={errors.about ? "true" : "false"}
                      ></textarea>
                      {errors.about && (
                        <span className="company-profile-form-error">
                          {errors.about?.message}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="form-submit-button"
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

export default CompanyForm;
