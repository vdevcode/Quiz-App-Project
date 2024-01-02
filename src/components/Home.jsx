import { useState } from "react";
import banner from "../../public/images/banner.png";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/quiz");
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="pt-12 lg:w-9/12 md:w-[90%] mx-auto px-4 mt-12 flex flex-col md:flex-row-reverse justify-between items-center">
      {loading && <Loading />}

      {/* right */}
      <div className="md:w-1/2 w-full">
        <img className="w-full mx-auto" src={banner} alt="" />
      </div>
      {/* let */}
      <div className="md:w-1/2 w-full">
        <h2 className="my-8 lg:text-4xl text-3xl font-medium text-[#333] md:w-4/6 lg:leading-normal mb-3">
          Ngẫu nhiên câu hỏi do chúng tôi chọn lọc
        </h2>
        <p className="py-2 mb-6 text-gray-500 pl-2 border-l-4 border-primary ext-base">
          Câu hỏi hay, chọn lọc, hấp dẫn.
        </p>
        <div className="text-lg font-medium flex flex-col sm:flex-row gap-4 mb-4">
          <button
            onClick={handleStartQuiz}
            to="/quiz"
            className="bg-primary px-6 py-2 md:text-[1rem] text-[.9rem] text-white rounded text-center"
          >
            Bắt đầu
          </button>
          <button className="text-center md:text-[1rem] text-[.9rem] inline-flex items-center px-6 py-2 text-primary rounded ml-3 hover:bg-primary hover:text-white transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            Xem thêm
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
