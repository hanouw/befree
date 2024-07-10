import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">오류가 발생했습니다</h1>
        <p className="text-center text-gray-600">잠시 뒤에 다시 시도해주세요</p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-2) }
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            이전 화면으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;