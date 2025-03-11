const InputField = ({ type = "text", placeholder, value, onChange, className }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    );
  };
  
  export default InputField;
  