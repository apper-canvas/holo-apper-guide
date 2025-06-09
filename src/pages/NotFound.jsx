import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto p-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block mb-6"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
            <ApperIcon name="Search" size={40} className="text-white" />
          </div>
        </motion.div>
        
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8">
          Looks like this page doesn't exist in our guide. Let's get you back on track!
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/home')}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ApperIcon name="Home" size={16} />
            <span>Go Home</span>
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}