import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsCheck2, BsChevronExpand } from "react-icons/bs";
import "./listbox.css";

const options = ["Newest", "Oldest", "A-Z", "Z-A"];

const ListBox = ({ sort, setSort }) => {
  return (
    <div className="listbox">
      <Listbox value={sort} onChange={setSort}>
        <div className="relative">
          <Listbox.Button className={"select-button"}>
            <span className="truncate-text">{sort}</span>

            <span className="">
              <BsChevronExpand className="select-btn-icon" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="options">
              {options.map((op, index) => (
                <Listbox.Option
                  key={index}
                  className={`option-item`}
                  value={op}
                >
                  {({ selected }) => (
                    <>
                      <span className={`truncate-text`}>{op}</span>
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
};

export default ListBox;
