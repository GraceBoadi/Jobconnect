import "./upload-jobs.css";
import { useForm } from "react-hook-form";
import { Footer, JobCard, JobTypes, Navigation } from "../../components";
import { jobs } from "../../utils/data";
import { useState } from "react";

const Upload_Jobs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const [jobTitle, setJobTitle] = useState("Full-Time");

  const onSubmit = async (data) => {};
  return (
    <>
      <Navigation />
      <div className="upload-job-container">
        <div className="job-posting">
          <div>
            <h2>Job Post</h2>

            <form className="job-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="form-group__label">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="eg. Software Engineer"
                  className="form-input"
                  {...register("jobTitle", {
                    required: "Job Title is required",
                  })}
                  aria-invalid={errors.jobTitle ? "true" : "false"}
                />
                {errors.jobTitle && (
                  <span className="form-error">{errors.jobTitle?.message}</span>
                )}
              </div>
              <div>
                <label>Job Type</label>
                <JobTypes jobTitle={jobTitle} setJobTitle={setJobTitle} />
              </div>

              <div className="form-group-flex">
                <div className="form-group">
                  <label className="form-group__label">Salary (USD)</label>
                  <input
                    name="salary"
                    type="number"
                    placeholder="eg. 1500"
                    className="form-input"
                    register={register("salary", {
                      required: "Salary is required",
                    })}
                    aria-invalid={errors.salary ? "true" : "false"}
                  />
                  {errors.salary && (
                    <span className="form-error">{errors.salary?.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-group__label">No. of Vacancies</label>
                  <input
                    name="vacancies"
                    type="number"
                    placeholder="vacancies"
                    className="form-input"
                    register={register("vacancies", {
                      required: "Vacancies is required!",
                    })}
                    aria-invalid={errors.vacancies ? "true" : "false"}
                  />
                  {errors.vacancies && (
                    <span className="form-error">
                      {errors.vacancies?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group-flex">
                <div className="form-group">
                  <label className="form-group__label">
                    Years of Experience
                  </label>
                  <input
                    name="experience"
                    type="number"
                    placeholder="experience"
                    className="form-input"
                    register={register("experience", {
                      required: "Experience is required",
                    })}
                    aria-invalid={errors.experience ? "true" : "false"}
                  />
                  {errors.experience && (
                    <span className="form-error">
                      {errors.experience?.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-group__label">Job Location</label>
                  <input
                    name="location"
                    type="text"
                    placeholder="eg. New York"
                    className="form-input"
                    register={register("location", {
                      required: "Job Location is required",
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

              <div>
                <label>Job Description</label>
                <textarea
                  rows={4}
                  cols={6}
                  {...register("desc", {
                    required: "Job Description is required!",
                  })}
                  aria-invalid={errors.desc ? "true" : "false"}
                ></textarea>
                {errors.desc && (
                  <span role="alert">{errors.desc?.message}</span>
                )}
              </div>

              <div>
                <label>Core Responsibilities</label>
                <textarea
                  rows={4}
                  cols={6}
                  {...register("resposibilities")}
                ></textarea>
              </div>

              <div>
                <button type="submit" className="custom-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="recent-jobs">
          <h2>Recent Job Post</h2>

          <div className="job-cards">
            {jobs.slice(0, 3).map((job, index) => {
              return <JobCard job={job} key={index} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Upload_Jobs;
