import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import { exampleService } from '../services'

export default function Examples() {
  const [examples, setExamples] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedExample, setSelectedExample] = useState(null)

  const categories = [
    { id: 'all', label: 'All Examples', icon: 'Grid3x3' },
    { id: 'productivity', label: 'Productivity', icon: 'CheckSquare' },
    { id: 'business', label: 'Business', icon: 'Briefcase' },
    { id: 'entertainment', label: 'Entertainment', icon: 'Play' },
    { id: 'utility', label: 'Utility', icon: 'Tool' },
    { id: 'social', label: 'Social', icon: 'Users' }
  ]

  useEffect(() => {
    loadExamples()
  }, [])

  const loadExamples = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await exampleService.getAll()
      setExamples(result)
    } catch (err) {
      setError(err.message || 'Failed to load examples')
      toast.error('Failed to load examples')
    } finally {
      setLoading(false)
    }
  }

  const filteredExamples = selectedCategory === 'all' 
    ? examples 
    : examples.filter(example => example.category === selectedCategory)

  const copyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt)
    toast.success('Prompt copied to clipboard!')
  }

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
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Examples</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadExamples}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
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

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ApperIcon 
                  name={category.icon} 
                  size={16} 
                  className={selectedCategory === category.id ? 'text-white' : 'text-gray-600'} 
                />
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Examples Grid */}
        {filteredExamples.length === 0 ? (
          <div className="text-center py-12">
            <ApperIcon name="Search" size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Examples Found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category or check back later for new examples.
            </p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredExamples.map((example, index) => (
                <motion.div
                  key={example.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedExample(example)}
                >
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {example.title}
                      </h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {example.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {example.result?.description || 'A complete application built with Apper'}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {example.result?.features?.slice(0, 3).map((feature, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                      {example.result?.features?.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{example.result.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <ApperIcon name="Code" size={14} />
                      <span>{example.result?.codeLines || '~300'} lines</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyPrompt(example.prompt)
                      }}
                      className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80"
                    >
                      <ApperIcon name="Copy" size={14} />
                      <span>Copy</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Example Detail Modal */}
        <AnimatePresence>
          {selectedExample && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setSelectedExample(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-heading font-bold text-gray-900">
                        {selectedExample.title}
                      </h2>
                      <button
                        onClick={() => setSelectedExample(null)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <ApperIcon name="X" size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* App Details */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">App Overview</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Type</h4>
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                            {selectedExample.result?.type || selectedExample.category}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Complexity</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i < 3 ? 'bg-primary' : 'bg-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">Intermediate</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedExample.result?.features?.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <ApperIcon name="Check" size={16} className="text-success" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Components */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Components</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedExample.result?.components?.map((component, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                          >
                            {component}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Original Prompt */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Original Prompt</h3>
                        <button
                          onClick={() => copyPrompt(selectedExample.prompt)}
                          className="flex items-center space-x-2 px-3 py-1 text-sm text-primary hover:text-primary/80 border border-primary/20 rounded-lg hover:bg-primary/5"
                        >
                          <ApperIcon name="Copy" size={14} />
                          <span>Copy Prompt</span>
                        </button>
                      </div>
                      <div className="code-block">
                        <pre className="whitespace-pre-wrap text-sm">
                          {selectedExample.prompt}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}