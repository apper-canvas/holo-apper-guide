import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import ExamplesFilterSection from '@/components/organisms/ExamplesFilterSection';
import ExamplesGridSection from '@/components/organisms/ExamplesGridSection';
import ExampleDetailModal from '@/components/organisms/ExampleDetailModal';
import Button from '@/components/atoms/Button';

import { exampleService } from '@/services';

const ExamplesPage = () => {
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExample, setSelectedExample] = useState(null);

  useEffect(() => {
    loadExamples();
  }, []);

  const loadExamples = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await exampleService.getAll();
      setExamples(result);
    } catch (err) {
      setError(err.message || 'Failed to load examples');
      toast.error('Failed to load examples');
    } finally {
      setLoading(false);
    }
  };

  const filteredExamples = selectedCategory === 'all'
    ? examples
    : examples.filter(example => example.category === selectedCategory);

  const copyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt);
    toast.success('Prompt copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="flex space-x-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded w-24"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Examples</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadExamples} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            App Examples
          </h1>
          <p className="text-gray-600">
            Explore real apps built with Apper. See the prompts that created them and get inspired for your own projects.
          </p>
        </div>

        <ExamplesFilterSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <ExamplesGridSection
          examples={filteredExamples}
          onSelectExample={setSelectedExample}
          onCopyPrompt={copyPrompt}
        />

        <ExampleDetailModal
          example={selectedExample}
          onClose={() => setSelectedExample(null)}
          onCopyPrompt={copyPrompt}
        />
      </div>
    </div>
  );
};

export default ExamplesPage;