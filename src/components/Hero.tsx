import hero from "../assets/Hero.jpg";

const Hero = () => {
  return (
    <div>
      <img
        src={hero}
        alt="food image"
        className="w-full max-h-[500px] object-cover"
      />
    </div>
  );
};

export default Hero;
