export default function SelectBase({
  name,
  value,
  onChange,
  options = [],
  className = "",
  ...props
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
