import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import OverallProgressSection from '@/components/organisms/OverallProgressSection';
import LessonProgressSection from '@/components/organisms/LessonProgressSection';
import BadgesSection from '@/components/organisms/BadgesSection';
import Button from '@/components/atoms/Button';

import { userProgressService, lessonService } from '@/services';

const badgesData = [
  { id: 'first-app', name: 'First App', description: 'Created your first Apper application', icon: 'Zap', color: 'text-yellow-500' },
  { id: 'prompt-master', name: 'Prompt Master', description: 'Wrote 10 different prompts', icon: 'Feather', color: 'text-blue-500' },
  { id: 'tutorial-complete', name: 'Tutorial Graduate', description: 'Completed all tutorial lessons', icon: 'GraduationCap', color: 'text-green-500' },
  { id: 'explorer', name: 'Explorer', description: 'Tried all example categories', icon: 'Compass', color: 'text-purple-500' },
  { id: 'speed-builder', name: 'Speed Builder', description: 'Built 5 apps in one session', icon: 'Gauge', color: 'text-red-500' },
  { id: 'code-saver', name: 'Code Saver', description: 'Generated 1000+ lines of code', icon: 'Code', color: 'text-indigo-500' }
];

const ProgressPage = () => {
  const [userProgress, setUserProgress] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    setLoading(true);
    setError(null);
    try {
      const [progressResult, lessonsResult] = await Promise.all([
        userProgressService.getById('current-user').catch(() => null),
        lessonService.getAll()
      ]);

      setUserProgress(progressResult || {
        id: 'current-user',
        currentLesson: 'lesson-1',
        completedLessons: [],
        badges: ['first-app'], // Default badge for new users
        lastAccessed: new Date()
      });
      setLessons(lessonsResult);
    } catch (err) {
      setError(err.message || 'Failed to load progress');
      toast.error('Failed to load progress');
    } finally {
      setLoading(false);
    }
  };

  const resetProgress = async () => {
    try {
      const resetData = {
        id: 'current-user',
        currentLesson: 'lesson-1',
        completedLessons: [],
        badges: [],
        lastAccessed: new Date()
      };
      await userProgressService.update('current-user', resetData);
      setUserProgress(resetData);
      toast.success('Progress reset successfully');
    } catch (err) {
      toast.error('Failed to reset progress');
    }
  };

  const calculateProgress = () => {
    if (!userProgress || !lessons.length) return 0;
    return Math.round((userProgress.completedLessons.length / lessons.length) * 100);
  };

  const getEarnedBadges = () => {
    if (!userProgress?.badges) return [];
    return badgesData.filter(badge => userProgress.badges.includes(badge.id));
  };

  const getAvailableBadges = () => {
    if (!userProgress?.badges) return badgesData;
    return badgesData.filter(badge => !userProgress.badges.includes(badge.id));
  };

  if (loading) {
    return (
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Progress</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadProgress} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = calculateProgress();
  const earnedBadges = getEarnedBadges();
  const availableBadges = getAvailableBadges();
  const completedLessonsCount = userProgress?.completedLessons?.length || 0;
  const lessonsRemaining = lessons.length - completedLessonsCount;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              Your Progress
            </h1>
            <p className="text-gray-600">
              Track your learning journey and celebrate your achievements
            </p>
          </div>
          <Button onClick={resetProgress} variant="border" icon={ApperIcon} iconProps={{ name: 'RotateCcw', size: 16 }}>
            Reset Progress
          </Button>
        </div>

        <OverallProgressSection
          progressPercentage={progressPercentage}
          completedLessonsCount={completedLessonsCount}
          earnedBadgesCount={earnedBadges.length}
          lessonsRemaining={lessonsRemaining}
        />

        <LessonProgressSection lessons={lessons} userProgress={userProgress} />

        <BadgesSection earnedBadges={earnedBadges} availableBadges={availableBadges} />
      </div>
    </div>
  );
};

export default ProgressPage;