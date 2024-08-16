import "./upload-jobs.css";
import { useForm } from "react-hook-form";
import { Footer, JobCard, JobTypes, Navigation } from "../../components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createJob } from "../../api/job-api";
import { getCompanyById } from "../../api/company-api";

const Upload_Jobs = () => {
  const { user } = useSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const [jobType, setJobType] = useState("Full-Time");
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getCompanyById(user._id);
        setJobs(data.data?.jobPosts);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCompany();
  }, [user._id]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const jobData = {
        jobTitle: data.jobTitle,
        jobURL: data.jobURL,
        jobType: jobType,
        location: data.location,
        salary: data.salary,
        vacancies: data.vacancies,
        experience: data.experience,
        desc: data.desc,
        requirements: data.requirements,
      };
      const job = await createJob(jobData, user.token);
    } catch (error) {
      console.error("Error submitting job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Navigation />
      <div className="upload-job-container">
        <div className="job-posting-container">
          <div className="job-posting">
            <div>
              <h2>Job Post</h2>

              <form className="job-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="form-group__label">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="e.g., Software Engineer"
                    className="form-input"
                    {...register("jobTitle", {
                      required: "Job Title is required",
                    })}
                    aria-invalid={errors.jobTitle ? "true" : "false"}
                  />
                  {errors.jobTitle && (
                    <span className="form-error">
                      {errors.jobTitle.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-group__label">Job Type</label>
                  <div>
                    <JobTypes jobType={jobType} setJobType={setJobType} />
                  </div>
                </div>

                <div className="form-group-flex">
                  <div className="form-group">
                    <label className="form-group__label">Salary (USD)</label>
                    <input
                      type="number"
                      name="salary"
                      placeholder="e.g., 1500"
                      className="form-input"
                      {...register("salary", {
                        required: "Salary is required",
                      })}
                      aria-invalid={errors.salary ? "true" : "false"}
                    />
                    {errors.salary && (
                      <span className="form-error">
                        {errors.salary.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-group__label">
                      No. of Vacancies
                    </label>
                    <input
                      type="number"
                      name="vacancies"
                      placeholder="e.g., 5"
                      className="form-input"
                      {...register("vacancies", {
                        required: "Vacancies is required",
                      })}
                      aria-invalid={errors.vacancies ? "true" : "false"}
                    />
                    {errors.vacancies && (
                      <span className="form-error">
                        {errors.vacancies.message}
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
                      type="number"
                      name="experience"
                      placeholder="e.g., 3"
                      className="form-input"
                      {...register("experience", {
                        required: "Experience is required",
                      })}
                      aria-invalid={errors.experience ? "true" : "false"}
                    />
                    {errors.experience && (
                      <span className="form-error">
                        {errors.experience.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-group__label">Job Location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g., New York"
                      className="form-input"
                      {...register("location", {
                        required: "Job Location is required",
                      })}
                      aria-invalid={errors.location ? "true" : "false"}
                    />
                    {errors.location && (
                      <span className="form-error">
                        {errors.location.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-group__label">Job URL</label>
                  <input
                    type="text"
                    name="jobURL"
                    placeholder="e.g., Software Engineer"
                    className="form-input"
                    {...register("jobURL", {
                      required: "Job URL is required",
                    })}
                    aria-invalid={errors.jobURL ? "true" : "false"}
                  />
                  {errors.jobURL && (
                    <span className="form-error">{errors.jobURL.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-group__label">Job Description</label>
                  <textarea
                    rows={4}
                    cols={6}
                    name="desc"
                    placeholder="Describe the job"
                    className="form-input"
                    {...register("desc", {
                      required: "Job Description is required",
                    })}
                    aria-invalid={errors.desc ? "true" : "false"}
                  ></textarea>
                  {errors.desc && (
                    <span className="form-error">{errors.desc.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-group__label">
                    Core Responsibilities
                  </label>
                  <textarea
                    rows={4}
                    cols={6}
                    name="requirements"
                    placeholder="List the responsibilities"
                    className="form-input"
                    {...register("requirements", {
                      required: "Core Responsibilities are required",
                    })}
                    aria-invalid={errors.requirements ? "true" : "false"}
                  ></textarea>
                  {errors.requirements && (
                    <span className="form-error">
                      {errors.requirements.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="custom-button btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
          <div className="recent-jobs">
            <h2>Recent Job Post</h2>

            <div className="job-cards">
              {jobs?.slice(0, 4).map((job, index) => {
                const data = {
                  name: user?.name,
                  email: user?.email,
                  logo: user?.profileUrl,
                  ...job,
                };
                return <JobCard job={data} key={index} />;
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Upload_Jobs;
