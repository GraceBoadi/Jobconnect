import "./company-form.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const CompanyForm = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user?.user },
  });

  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [uploadCv, setUploadCv] = useState("");

  const onSubmit = () => {};

  const closeModal = () => setOpen(false);
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
                    className="company-profile-form-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group">
                      <label className="form-group__label">Company Name</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="company name"
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
                        placeholder="eg. Califonia"
                        type="text"
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

                    <div className="flex flex-col">
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
                        <span
                          role="alert"
                          className="company-profile-form-error"
                        >
                          {errors.about?.message}
                        </span>
                      )}
                    </div>

                    <button type="submit">Submit</button>
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
