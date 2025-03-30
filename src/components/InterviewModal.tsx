import { Loader2, X } from 'lucide-react';

interface InterviewModalProps {
  title: string;
  description: string;
  yearsOfExperience: number;
  onCancel: () => void;
  onStart: () => void;
  loading: boolean;
}

export default function InterviewModal({
  title,
  description,
  yearsOfExperience,
  onCancel,
  onStart,
  loading
}: InterviewModalProps) {
  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">{title}</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-6">
          <p className="text-gray-600 mb-4">{description}</p>
          <p className="text-sm text-gray-500">Experience Required: {yearsOfExperience} years</p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={onStart}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {loading ? <Loader2/>  : 'Start Interview'}
          </button>
        </div>
      </div>
    </div>
  );
}