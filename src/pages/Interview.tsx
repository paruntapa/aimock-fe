import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import getToken from '../hooks/getToken';
import { BACKEND_URL } from '../config';

const languages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
];

export default function Interview() {
  const token = getToken();
  if (!token) return <Navigate to="/signin" />;

  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].id);
  const [code, setCode] = useState('// Write your code here\n');
  const [question, setQuestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/interview/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setQuestion(data.question); // Directly set the question string
        } else {
          console.error('Failed to fetch interview:', data.message);
        }
      } catch (error) {
        console.error('Error fetching interview:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [id, token]);

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert("Please write some code before submitting.");
      return;
    }
  
    try {
      const response = await fetch(`${BACKEND_URL}/api/interview/${id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userCode: code,
          language: selectedLanguage,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        navigate(`/dashboard/interview/${id}/feedback`);
      } else {
        console.error("Submission failed:", data.message);
      }
    } catch (error) {
      console.error("Error submitting code:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Question Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Interview Question</h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : question ? (
            <div className="border-b pb-4">
              <p className="text-gray-600">{question}</p> {/* Display question directly */}
            </div>
          ) : (
            <p className="text-red-500">Failed to load question</p>
          )}
        </div>

        {/* Code Editor Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4 flex justify-between items-center">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="border rounded-md px-3 py-1"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="h-[500px] border rounded-lg overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage={selectedLanguage}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{ minimap: { enabled: false }, fontSize: 14 }}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
}
