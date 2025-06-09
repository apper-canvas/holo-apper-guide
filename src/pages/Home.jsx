import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'
import { userProgressService } from '../services'

export default function Home() {
  const navigate = useNavigate()
  const [userProgress, setUserProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserProgress()
  }, [])

  const loadUserProgress = async () => {
    try {
      const progress = await userProgressService.getById('current-user')
      setUserProgress(progress)
    } catch (err) {
      // First time user, create initial progress
      const newProgress = {
        id: 'current-user',
        currentLesson: 'lesson-1',
        completedLessons: [],
        badges: [],
        lastAccessed: new Date()
      }
      setUserProgress(newProgress)
    } finally {
      setLoading(false)
    }
  }

  const handleGetStarted = () => {
    navigate('/tutorial')
  }

  const handleTryPlayground = () => {
    navigate('/playground')
  }

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
    )
  }

  const isNewUser = !userProgress?.completedLessons?.length

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                <ApperIcon name="Zap" size={32} className="text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              Welcome to <span className="text-primary">Apper</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Learn to build complete web applications without writing a single line of code. 
              Just describe what you want, and watch Apper bring your ideas to life.
            </p>
          </div>

          {/* Progress Banner for Returning Users */}
          {!isNewUser && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-lg p-4 mb-8 inline-block"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <ApperIcon name="Trophy" size={16} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">
                    Welcome back! You've completed {userProgress.completedLessons.length} lessons
                  </p>
                  <p className="text-sm text-gray-600">
                    Ready to continue your journey?
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <span>{isNewUser ? 'Start Learning' : 'Continue Tutorial'}</span>
              <ApperIcon name="ArrowRight" size={16} />
            </motion.button>
            
            <motion.button
              onClick={handleTryPlayground}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <ApperIcon name="Code" size={16} />
              <span>Try Playground</span>
            </motion.button>
          </div>
        </motion.div>

        {/* What You'll Learn */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-heading font-bold text-gray-900 text-center mb-8">
            What You'll Learn
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'MessageSquare',
                title: 'Natural Language Prompts',
                description: 'Learn to describe your app ideas in plain English and watch Apper understand exactly what you want.'
              },
              {
                icon: 'Layers',
                title: 'App Architecture',
                description: 'Discover how Apper automatically creates components, layouts, and navigation for your applications.'
              },
              {
                icon: 'Palette',
                title: 'Design & Styling',
                description: 'Master the art of describing visual designs and user interfaces through simple, descriptive prompts.'
              },
              {
                icon: 'Database',
                title: 'Data Management',
                description: 'Understand how to specify data structures and user interactions without databases or APIs.'
              },
              {
                icon: 'Smartphone',
                title: 'Responsive Design',
                description: 'Learn how Apper creates mobile-friendly apps that work perfectly on any device.'
              },
              {
                icon: 'Zap',
                title: 'Advanced Features',
                description: 'Explore powerful capabilities like animations, complex interactions, and custom functionality.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name={feature.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white text-center"
        >
          <h2 className="text-2xl font-heading font-bold mb-6">
            Join Thousands of Builders
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-white/80">Apps Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5,000+</div>
              <div className="text-white/80">Happy Builders</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Support Available</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}