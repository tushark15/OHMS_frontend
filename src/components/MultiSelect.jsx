import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";

const MultiSelect = ({
  defaultOptions,
  selectedValues,
  setSelectedValues,
  name,
  style,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState(selectedValues);

  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue((prevValue) => [...prevValue, newOption]);
      setSelectedValues((prevValue) => [...prevValue, newOption]);
    }, 1000);
  };

  useEffect(() => {
    setValue(selectedValues);
  }, [setSelectedValues]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: style && style.width ? style.width : "100%", // Apply width from style prop or default to 100%
    }),
    multiValue: (provided) => {
      return {
        ...provided,
        backgroundColor: "skyblue",
      };
    },
  };

  return (
    <div>
      <CreatableSelect
        isMulti
        isClearable
        isSearchable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={(newValue) => {
          setValue(newValue);
          setSelectedValues(newValue);
        }}
        onCreateOption={handleCreate}
        options={options}
        value={value}
        name={name}
        styles={customStyles}
      />
    </div>
  );
};

export default MultiSelect;
