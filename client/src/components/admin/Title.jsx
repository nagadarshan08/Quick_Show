const Title = ({ text1, text2 }) => {
  return (
    <h1 className="text-2xl font-semibold text-white">
      {text1}{" "}
      <span className="text-red-500 border-b-2 border-red-500">
        {text2}
      </span>
    </h1>
  );
};

export default Title;