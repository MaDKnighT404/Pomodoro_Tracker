type SelectInputProps = {
  options: {
    value: string | number;
    name: string;
  }[];
  value: string | number;
  // eslint-disable-next-line react/require-default-props
  defaultValue?: string | number;
  onChange: (value: string | number) => void;
};

const SelectInput = ({ options, defaultValue, value, onChange }: SelectInputProps) => {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {defaultValue && (
        <option disabled value="">
          {defaultValue}
        </option>
      )}
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
