import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import "./jobs.css";

const fitlerData = [
  {
    fitlerType: "Location",
    array: [
      "Accra",
      "Tema",
      "Kumasi",
      "Eastern Region",
      "Northern Region",
      "Western Region",
      "Volta Region",
    ],
  },
  {
    fitlerType: "Job Type",
    array: ["Full time", "Contract", "Internship", "Hybrid", "Remote"],
  },

  {
    fitlerType: "Experience",
    array: ["Entry level", "mid level", "senior level"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="filter-panel">
      <h1 className="filter-title">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {fitlerData.map((data, index) => (
          <div>
            <h1 className="filter-title">{data.fitlerType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="filter-item">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
