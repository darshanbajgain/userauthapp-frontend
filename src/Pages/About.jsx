import Header from "../Components/Header";

const About = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-10 p-4 px-20">
        <h1 className="text-2xl font-bold">About Us</h1>
        <p className="mt-4 text-lg text-gray-700">
          This is the about page of the application.
        </p>
      </div>
    </div>
  );
};

export default About;
