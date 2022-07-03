type Props = {
  name: string,
  label?: string
};

const RangeInput = ({ name, label }: Props) => {
  return (
    <div className="relative pt-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="range"
        className="form-range w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
        min="1"
        max="7"
        step="1"
        id={name}
      />
    </div>
  );
};

export default RangeInput;
