import { useAuth } from "../AuthContext/AuthContext";
import Header from "../Components/Header";

const Welcome = () => {
  const { username } = useAuth();

  return (
    <div>
      <Header />
      <main className="pt-16 px-4 md:px-20">
        <section className="container mx-auto py-12 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-4 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                Hi <span className="text-blue-500 uppercase">{username}</span>
              </h1>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                Thanks For Joining Us!
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                We&#39;re revolutionizing the industry with innovative solutions
                tailored to your needs.
              </p>
              <a
                href="#"
                className="inline-block bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-500 transition duration-300"
              >
                Learn More
              </a>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Why Choose Us?
                </h2>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Industry-leading technology
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    24/7 customer support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Customizable solutions
                  </li>
                </ul>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="block text-center bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-500 transition duration-300"
                  >
                    Get Started
                  </a>
                  <a
                    href="#"
                    className="block text-center border border-gray-800 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Welcome;
