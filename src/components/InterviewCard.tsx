import { ArrowRight } from 'lucide-react';

interface InterviewCardProps {
  title: string;
  yearsOfExperience: number;
  feedback: string;
  onStart: () => void;
}

export default function InterviewCard({ title, yearsOfExperience, feedback, onStart }: InterviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="text-gray-600 mb-2">Experience Required: {yearsOfExperience} years</div>
      <p className="text-gray-700 mb-4">{feedback}</p>
      <button
        onClick={onStart}
        className="flex items-center justify-center w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Start Interview <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
}