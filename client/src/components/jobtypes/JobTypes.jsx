import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsCheck2, BsChevronExpand } from "react-icons/bs";
import "./jobtypes.css";

const types = ["Full-Time", "Part-Time", "Contract", "Intern"];

export default function JobTypes({ jobType, setJobType }) {
  return (
    <div className="job-select">
      <Listbox value={jobType} onChange={setJobType}>
        <div className="relative">
          <Listbox.Button className="job-select-btn">
            <span className="truncate-text">{jobType}</span>
            <span className="">
              <BsChevronExpand className="job-select-icon" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="options-list">
              {types.map((type, index) => (
                <Listbox.Option key={index} className={`option`} value={type}>
                  {({ selected }) => (
                    <>
                      <span className={`truncate-text`}>{type}</span>
                      {selected ? (
                        <span className="">
                          <BsCheck2
                            className="option-icon"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
