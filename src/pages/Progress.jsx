import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import { userProgressService, lessonService } from '../services'

export default function Progress() {
  const [userProgress, setUserProgress] = useState(null)
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const badges = [
    { id: 'first-app', name: 'First App', description: 'Created your first Apper application', icon: 'Zap', color: 'text-yellow-500' },
    { id: 'prompt-master', name: 'Prompt Master', description: 'Wrote 10 different prompts', icon: 'Feather', color: 'text-blue-500' },
    { id: 'tutorial-complete', name: 'Tutorial Graduate', description: 'Completed all tutorial lessons', icon: 'GraduationCap', color: 'text-green-500' },
    { id: 'explorer', name: 'Explorer', description: 'Tried all example categories', icon: 'Compass', color: 'text-purple-500' },
    { id: 'speed-builder', name: 'Speed Builder', description: 'Built 5 apps in one session', icon: 'Gauge', color: 'text-red-500' },
    { id: 'code-saver', name: 'Code Saver', description: 'Generated 1000+ lines of code', icon: 'Code', color: 'text-indigo-500' }
  ]

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = async () => {
    setLoading(true)
    setError(null)
    try {
      const [progressResult, lessonsResult] = await Promise.all([
        userProgressService.getById('current-user').catch(() => null),
        lessonService.getAll()
      ])
      
      setUserProgress(progressResult || {
        id: 'current-user',
        currentLesson: 'lesson-1',
        completedLessons: [],
        badges: ['first-app'],
        lastAccessed: new Date()
      })
      setLessons(lessonsResult)
    } catch (err) {
      setError(err.message || 'Failed to load progress')
      toast.error('Failed to load progress')
    } finally {
      setLoading(false)
    }
  }

  const resetProgress = async () => {
    try {
      const resetData = {
        id: 'current-user',
        currentLesson: 'lesson-1',
        completedLessons: [],
        badges: [],
        lastAccessed: new Date()
      }
      await userProgressService.update('current-user', resetData)
      setUserProgress(resetData)
      toast.success('Progress reset successfully')
    } catch (err) {
      toast.error('Failed to reset progress')
    }
  }

  const calculateProgress = () => {
    if (!userProgress || !lessons.length) return 0
    return Math.round((userProgress.completedLessons.length / lessons.length) * 100)
  }

  const getEarnedBadges = () => {
    if (!userProgress?.badges) return []
    return badges.filter(badge => userProgress.badges.includes(badge.id))
  }

  const getAvailableBadges = () => {
    if (!userProgress?.badges) return badges
    return badges.filter(badge => !userProgress.badges.includes(badge.id))
  }

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
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Progress</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadProgress}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const progressPercentage = calculateProgress()
  const earnedBadges = getEarnedBadges()
  const availableBadges = getAvailableBadges()

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
          <button
            onClick={resetProgress}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ApperIcon name="RotateCcw" size={16} />
            <span>Reset Progress</span>
          </button>
        </div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-bold">Overall Progress</h2>
            <div className="text-2xl font-bold">{progressPercentage}%</div>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-3 mb-4">
            <motion.div
              className="bg-white h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{userProgress?.completedLessons?.length || 0}</div>
              <div className="text-white/80">Lessons Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{earnedBadges.length}</div>
              <div className="text-white/80">Badges Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{lessons.length - (userProgress?.completedLessons?.length || 0)}</div>
              <div className="text-white/80">Lessons Remaining</div>
            </div>
          </div>
        </motion.div>

        {/* Lesson Progress */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
            Lesson Progress
          </h2>
          
          <div className="space-y-4">
            {lessons.map((lesson, index) => {
              const isCompleted = userProgress?.completedLessons?.includes(lesson.id)
              const isCurrent = userProgress?.currentLesson === lesson.id
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg border ${
                    isCompleted 
                      ? 'bg-success/5 border-success/20' 
                      : isCurrent 
                        ? 'bg-primary/5 border-primary/20' 
                        : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-success text-white' 
                      : isCurrent 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-300 text-gray-600'
                  }`}>
                    {isCompleted ? (
                      <ApperIcon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                    <p className="text-sm text-gray-600">{lesson.description}</p>
                  </div>
                  
                  {isCurrent && (
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                      Current
                    </span>
                  )}
                  
                  {isCompleted && (
                    <span className="px-2 py-1 bg-success/10 text-success rounded text-sm font-medium">
                      Completed
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Badges Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
            Achievements
          </h2>
          
          {/* Earned Badges */}
          {earnedBadges.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Earned Badges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {earnedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${badge.color}`}>
                      <ApperIcon name={badge.icon} size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{badge.name}</h4>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Available Badges */}
          {availableBadges.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Available Badges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-lg opacity-60"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <ApperIcon name={badge.icon} size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-600">{badge.name}</h4>
                      <p className="text-sm text-gray-500">{badge.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}