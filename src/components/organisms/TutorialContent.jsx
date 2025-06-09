import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ProgressBar from '@/components/atoms/ProgressBar';
import { lessonService } from '@/services';

const TutorialContent = () => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [previewResult, setPreviewResult] = useState(null);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await lessonService.getAll();
      setLessons(result);
      if (result.length > 0) {
        setCurrentLesson(result[0]);
        setUserCode(result[0].exercises?.[0]?.startingCode || '');
      }
    } catch (err) {
      setError(err.message || 'Failed to load lessons');
      toast.error('Failed to load lessons');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (code) => {
    setUserCode(code);
    // Simulate live preview
    try {
      const result = simulateApperExecution(code);
      setPreviewResult(result);
    } catch (err) {
      setPreviewResult({ error: err.message });
    }
  };

  const simulateApperExecution = (code) => {
    // Simulate Apper's app generation based on the prompt
    const lines = code.toLowerCase().split('\n').filter(line => line.trim());

    if (lines.some(line => line.includes('todo') || line.includes('task'))) {
      return {
        type: 'todo-app',
        components: ['Header', 'TodoList', 'AddTodo'],
        description: 'A task management app with add, complete, and delete functionality'
      };
    } else if (lines.some(line => line.includes('calculator'))) {
      return {
        type: 'calculator',
        components: ['Display', 'ButtonGrid', 'Calculator'],
        description: 'A functional calculator with basic arithmetic operations'
      };
    } else if (lines.some(line => line.includes('blog') || line.includes('article'))) {
      return {
        type: 'blog',
        components: ['Header', 'PostList', 'PostDetail'],
        description: 'A blog application with posts, comments, and navigation'
      };
    } else {
      return {
        type: 'generic',
        components: ['App', 'MainContent'],
        description: 'A basic web application based on your description'
      };
    }
  };

  const completeLesson = async () => {
    if (!currentLesson) return;

    try {
      await lessonService.update(currentLesson.id, {
        ...currentLesson,
        completed: true,
        progress: 100
      });
      toast.success('Lesson completed! 🎉');

      // Move to next lesson
      const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
      if (currentIndex < lessons.length - 1) {
        const nextLesson = lessons[currentIndex + 1];
        setCurrentLesson(nextLesson);
        setUserCode(nextLesson.exercises?.[0]?.startingCode || '');
      }
    } catch (err) {
      toast.error('Failed to save progress');
    }
  };

  const goToPreviousLesson = () => {
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex">
        <div className="w-1/2 p-6 border-r border-gray-200">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="w-1/2 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Tutorial</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadLessons} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="BookOpen" size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Lessons Available</h3>
          <p className="text-gray-600">Check back later for new tutorial content.</p>
        </div>
      </div>
    );
  }

  const currentLessonIndex = lessons.findIndex(l => l.id === currentLesson.id);

  return (
    <div className="h-full flex max-w-full overflow-hidden">
      {/* Lesson Content */}
      <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-heading font-bold text-gray-900">
                {currentLesson.title}
              </h1>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {currentLessonIndex + 1}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  of {lessons.length}
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{currentLesson.description}</p>

            {/* Progress Bar */}
            <ProgressBar progress={currentLesson.progress || 0} className="mb-6" />
          </div>

          {/* Lesson Content */}
          <div className="prose prose-sm max-w-none mb-6">
            <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
          </div>

          {/* Exercise Section */}
          {currentLesson.exercises && currentLesson.exercises.length > 0 && (
            <div className="bg-surface rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <ApperIcon name="Code" size={20} className="mr-2" />
                Try It Yourself
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {currentLesson.exercises[0].instruction}
              </p>

              <div className="bg-gray-900 rounded-lg p-4">
                <Input
                  type="textarea"
                  value={userCode}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className="!bg-transparent text-green-400 font-mono text-sm resize-none border-none outline-none !p-0 h-32"
                  placeholder="Type your Apper prompt here..."
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              onClick={goToPreviousLesson}
              disabled={currentLessonIndex === 0}
              variant="ghost"
              icon={ApperIcon}
              iconProps={{ name: 'ChevronLeft', size: 16 }}
            >
              Previous
            </Button>

            <Button onClick={completeLesson} variant="primary" icon={ApperIcon} iconProps={{ name: 'Check', size: 16 }}>
              Complete Lesson
            </Button>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="w-1/2 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-bold text-gray-900">
              Live Preview
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Real-time</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {previewResult ? (
              <motion.div
                key={JSON.stringify(previewResult)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                {previewResult.error ? (
                  <div className="text-center text-gray-500">
                    <ApperIcon name="AlertTriangle" size={32} className="mx-auto mb-2 text-warning" />
                    <p className="text-sm">{previewResult.error}</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900">
                        App Generated Successfully
                      </span>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">App Type:</h4>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {previewResult.type}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Components:</h4>
                      <div className="flex flex-wrap gap-2">
                        {previewResult.components?.map((component, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                          >
                            {component}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">
                      {previewResult.description}
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <ApperIcon name="Eye" size={32} className="mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500">
                  Start typing in the exercise area to see your app come to life!
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TutorialContent;