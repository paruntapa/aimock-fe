import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import InterviewCard from '../components/InterviewCard';
import InterviewModal from '../components/InterviewModal';
import getToken from '../hooks/getToken';
import { BACKEND_URL } from '../config';

const mockInterviews = [
  {
    id: 1,
    title: 'Frontend Developer Interview',
    yearsOfExperience: 2,
    description: 'Test your React and JavaScript skills with real-world scenarios.',
  },
  {
    id: 2,
    title: 'Backend Developer Interview',
    yearsOfExperience: 3,
    description: 'Focus on system design and API development concepts.',
  },
  {
    id: 3,
    title: 'Full Stack Developer Interview',
    yearsOfExperience: 4,
    description: 'Comprehensive assessment of both frontend and backend skills.',
  },
  {
    id: 4,
    title: 'Devops Engineer Interview',
    yearsOfExperience: 2,
    description: 'Test your React and JavaScript skills with real-world scenarios.',
  },
  {
    id: 5,
    title: 'Backend Developer Interview',
    yearsOfExperience: 3,
    description: 'Focus on system design and API development concepts.',
  },
  {
    id: 6,
    title: 'Full Stack Developer Interview',
    yearsOfExperience: 4,
    description: 'Comprehensive assessment of both frontend and backend skills.',
  },
];

export default function Dashboard() {
  const token = getToken();
  if (!token) return <Navigate to="/signin" />;

  const navigate = useNavigate();
  const [selectedInterview, setSelectedInterview] = useState<typeof mockInterviews[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStartInterview = (interview: typeof mockInterviews[0]) => {
    setSelectedInterview(interview);
  };

  const handleStartActualInterview = async () => {
    if (!selectedInterview) return;

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/interview/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobTitle: selectedInterview.title,
          jobDescription: selectedInterview.description,
          experienceRequired: selectedInterview.yearsOfExperience,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate(`/dashboard/interview/${data.interviewId}`);
      } else {
        console.error('Failed to start interview:', data.message);
      }
    } catch (error) {
      console.error('Error starting interview:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-xl text-gray-600">Start your AI mockup interview</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              title={interview.title}
              yearsOfExperience={interview.yearsOfExperience}
              feedback={interview.description}
              onStart={() => handleStartInterview(interview)}
            />
          ))}
        </div>

        {selectedInterview && (
          <InterviewModal
            title={selectedInterview.title}
            description={selectedInterview.description}
            yearsOfExperience={selectedInterview.yearsOfExperience}
            onCancel={() => setSelectedInterview(null)}
            onStart={handleStartActualInterview}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}