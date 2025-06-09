import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userProgressService } from '@/services';
import HeroSection from '@/components/organisms/HeroSection';
import FeatureGrid from '@/components/organisms/FeatureGrid';
import HomeStatsOverview from '@/components/organisms/HomeStatsOverview';
import ApperIcon from '@/components/ApperIcon';

const HomePage = () => {
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProgress();
  }, []);

  const loadUserProgress = async () => {
    try {
      const progress = await userProgressService.getById('current-user');
      setUserProgress(progress);
    } catch (err) {
      // First time user, create initial progress
      const newProgress = {
        id: 'current-user',
        currentLesson: 'lesson-1',
        completedLessons: [],
        badges: [],
        lastAccessed: new Date()
      };
      setUserProgress(newProgress);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    navigate('/tutorial');
  };

  const handleTryPlayground = () => {
    navigate('/playground');
  };

  if (loading) {
    return (
      <div className="h-full p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isNewUser = !userProgress?.completedLessons?.length;
  const completedLessonsCount = userProgress?.completedLessons?.length || 0;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        <HeroSection
          isNewUser={isNewUser}
          completedLessonsCount={completedLessonsCount}
          onStartLearning={handleGetStarted}
          onTryPlayground={handleTryPlayground}
        />

        <FeatureGrid />

        <HomeStatsOverview />
      </div>
    </div>
  );
};

export default HomePage;