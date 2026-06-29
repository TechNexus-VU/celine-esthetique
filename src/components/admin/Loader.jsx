
const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-[350px] items-center justify-center">
      <div className="text-center">
        
        {/* Spinner */}
        <div
          className="
            mx-auto
            h-14
            w-14
            animate-spin
            rounded-full
            border-4
            border-softPink
            border-t-primaryPink
          "
        ></div>

        {/* Text */}
        <p className="mt-5 font-body text-sm md:text-base text-greyText">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Loader;