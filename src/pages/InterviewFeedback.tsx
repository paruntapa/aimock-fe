import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import getToken from '../hooks/getToken';
import { useParams, Navigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';


export default function InterviewFeedback() {
  const token = getToken();
  if (!token) return <Navigate to="/signin" />;

  const { id } = useParams();
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSuggestion, setExpandedSuggestion] = useState<number | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/interview/${id}/feedback`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setFeedback(data);
        } else {
          console.error('Failed to fetch feedback:', data.message);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id, token]);

  if (loading) return <p className="text-center">Loading feedback...</p>;
  if (!feedback) return <p className="text-center text-red-500">No feedback available</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Congratulations! Here is your interview feedback
          </h1>

          {/* Rating */}
          <div className="flex justify-center mb-8">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-8 w-8 ${index < Math.round(feedback.reviewScore / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>

          {/* Suggestions */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Suggestions</h2>
            <div className="space-y-4">
              {feedback.improvementSuggestions.map((suggestion: string, index: number) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => setExpandedSuggestion(expandedSuggestion === index ? null : index)}
                  >
                    <span className="font-medium">Suggestion {index + 1}</span>
                    <span className="text-gray-500">{expandedSuggestion === index ? '−' : '+'}</span>
                  </button>
                  {expandedSuggestion === index && (
                    <div className="px-6 py-4 bg-white">
                      <p className="text-gray-600">{suggestion}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Better Solution */}
          {feedback.alternativeSolution && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Optimal Solution</h2>
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
                <code>{feedback.alternativeSolution}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}