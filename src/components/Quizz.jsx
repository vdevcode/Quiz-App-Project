import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Quizz = () => {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState({});

  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [timerIntervalId, setTimerIntervalId] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    fetch("./quiz.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
      });
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        prevTimer - 1;
      });
    }, 1000);

    setTimerIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
      if (timer === 0) {
        alert("Hết thời gian!!!");
      }
    };
  }, [timer]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    const updateAnswer = { ...answer, [questionId]: selectedOption };
    setAnswer(updateAnswer);
  };

  const handleSubmit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    clearInterval(timerIntervalId);
    setTimeout(() => {
      const quizScore = calculateScore(answer);
      setScore(quizScore);
      const percentage = (quizScore / question.length) * 100;
      console.log(percentage);
      const newStatus = percentage >= 50 ? "Vượt qua bài kiểm tra" : "Thất bại";
      setStatus(newStatus);
      setShowResult(true);
      setLoading(false);
    }, 5000);
  };

  const calculateScore = (userAnswer) => {
    const correctAnswer = question.map((items) => items.answer);
    let score = 0;
    for (const questionId in userAnswer) {
      if (userAnswer[questionId] === correctAnswer[questionId - 1]) {
        score++;
      }
    }
    return score;
  };

  const restartQuiz = () => {
    setAnswer([])
    setScore(0)
    setShowResult(false)
    setLoading(false)
    setTimer(60)
    navigate("/quiz")

  }

  return (
    <section className="pt-12 mt-12 md:w-9/12 w-[90%] mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start">
      {/* <div>Làm bài ngay! thời gian đang đếm ngược {timer}</div> */}
      <div className="md:w-[70%] w-full">
        <div>
          {question.map((items, index) => (
            <div
              key={items.id}
              className="mt-3 py-3 px-4 shadow-sm border border-gray-200 rounded"
            >
              <p className="flex items-center rounded text-xs p-2 cursor-pointer">
                <span className="h-8 w-8 bg-primary rounded-full flex items-center text-green-800 justify-center mr-3">
                  {index + 1}{" "}
                </span>
                <span className="text-base block">{items.question}</span>
              </p>

              {/* show options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                {items.options.map((option, index) => (
                  <div
                    onClick={() => handleAnswerSelect(items.id, option)}
                    key={index}
                    className={`border border-gray-200 rounded text-xs cursor-pointer  p-2 ${
                      answer[items.id] === option ? "bg-gray-300" : ""
                    }`}
                  >
                    <p className="text-[10px] mb-1">Lựa chọn {index + 1}</p>
                    <p>{option}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="bg-primary px-6 md:text-[1rem] mt-3 text-[.9rem] py-2 text-white rounded text-center"
          >
            Kết thúc & xem điểm
          </button>
        </div>
      </div>

      <div className="md:w-[30%] w-full p-4">
        {showResult && (
          <div>
            <h3 className="text-xl sm:text-2xl font-medium">Điểm của bạn</h3>
            <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2">
              <h3
                className={`text-xs ${
                  status === "Vượt qua bài kiểm tra"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {status}
              </h3>
              <h1>
                {score * 10} <span className="text-slate-800">/ 60</span>
              </h1>
              <p>Thời gian: </p>
              <button onClick={restartQuiz} className="bg-primary px-6 md:text-[1rem] mt-3 text-[.9rem] py-2 text-white rounded text-center">
                Làm lại
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Quizz;
