import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

export default function Playground() {
  const [prompt, setPrompt] = useState('')
  const [generatedApp, setGeneratedApp] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [history, setHistory] = useState([])

  const examplePrompts = [
    {
      title: 'Task Manager',
      prompt: 'Create a simple todo app with:\n- Add new tasks\n- Mark tasks as complete\n- Delete tasks\n- Filter by status\n- Clean, modern design with purple colors'
    },
    {
      title: 'Weather Dashboard',
      prompt: 'Build a weather app that shows:\n- Current weather conditions\n- 5-day forecast\n- Temperature charts\n- Location search\n- Beautiful weather icons'
    },
    {
      title: 'Recipe Collection',
      prompt: 'Design a recipe app with:\n- Recipe cards with images\n- Ingredient lists\n- Cooking instructions\n- Search and filter\n- Rating system'
    },
    {
      title: 'Expense Tracker',
      prompt: 'Create a personal finance app:\n- Add income and expenses\n- Category-based organization\n- Monthly summaries\n- Visual charts\n- Budget tracking'
    }
  ]

  const generateApp = async () => {
    if (!prompt.trim()) {
      toast.warning('Please enter a prompt to generate your app')
      return
    }

    setIsGenerating(true)
    
    // Simulate app generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    try {
      const result = simulateApperGeneration(prompt)
      setGeneratedApp(result)
      
      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        prompt: prompt,
        result: result,
        timestamp: new Date()
      }
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]) // Keep last 10
      
      toast.success('App generated successfully!')
    } catch (err) {
      toast.error('Failed to generate app. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const simulateApperGeneration = (userPrompt) => {
    const lowerPrompt = userPrompt.toLowerCase()
    
    // Analyze prompt and generate realistic app structure
    let appType = 'generic'
    let features = []
    let components = ['App', 'Header', 'MainContent']
    
    if (lowerPrompt.includes('todo') || lowerPrompt.includes('task')) {
      appType = 'Task Manager'
      features = ['Add tasks', 'Mark complete', 'Delete tasks', 'Filter by status']
      components = ['TaskList', 'AddTask', 'TaskItem', 'FilterBar']
    } else if (lowerPrompt.includes('weather')) {
      appType = 'Weather App'
      features = ['Current weather', 'Forecast', 'Location search', 'Weather icons']
      components = ['WeatherCard', 'Forecast', 'SearchBar', 'WeatherIcon']
    } else if (lowerPrompt.includes('recipe') || lowerPrompt.includes('cooking')) {
      appType = 'Recipe App'
      features = ['Recipe cards', 'Ingredients', 'Instructions', 'Search', 'Ratings']
      components = ['RecipeCard', 'IngredientList', 'Instructions', 'SearchBar']
    } else if (lowerPrompt.includes('expense') || lowerPrompt.includes('finance') || lowerPrompt.includes('budget')) {
      appType = 'Finance Tracker'
      features = ['Add expenses', 'Categories', 'Charts', 'Budget tracking']
      components = ['ExpenseForm', 'ExpenseList', 'Chart', 'BudgetTracker']
    }
    
    return {
      type: appType,
      features: features,
      components: components,
      description: `A fully functional ${appType.toLowerCase()} with modern design and responsive layout`,
      codeLines: Math.floor(Math.random() * 500) + 200,
      buildTime: '2.3s'
    }
  }

  const loadExample = (example) => {
    setPrompt(example.prompt)
  }

  const clearPlayground = () => {
    setPrompt('')
    setGeneratedApp(null)
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Playground
          </h1>
          <p className="text-gray-600">
            Experiment with Apper by describing your app ideas. See how your prompts translate into real applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Prompt Editor */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Describe Your App
                </h2>
                <button
                  onClick={clearPlayground}
                  className="text-gray-500 hover:text-gray-700 p-1"
                  title="Clear"
                >
                  <ApperIcon name="RotateCcw" size={16} />
                </button>
              </div>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the app you want to build... Be specific about features, design, and functionality."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {prompt.length} characters
                </span>
                <motion.button
                  onClick={generateApp}
                  disabled={isGenerating || !prompt.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Zap" size={16} />
                      <span>Generate App</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Example Prompts */}
            <div className="bg-surface rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Try These Examples
              </h3>
              <div className="space-y-3">
                {examplePrompts.map((example, index) => (
                  <motion.button
                    key={index}
                    onClick={() => loadExample(example)}
                    whileHover={{ scale: 1.02 }}
                    className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{example.title}</h4>
                      <ApperIcon name="ArrowRight" size={16} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {example.prompt.split('\n')[0]}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="tip-box info">
              <div className="flex items-start space-x-2">
                <ApperIcon name="Lightbulb" size={16} className="text-info mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Pro Tips</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Be specific about features and functionality</li>
                    <li>• Mention design preferences (colors, style)</li>
                    <li>• Include user interactions and data flow</li>
                    <li>• Specify responsive behavior if needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Generated App Display */}
            {generatedApp ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Generated App
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <ApperIcon name="Clock" size={14} />
                    <span>Built in {generatedApp.buildTime}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">App Type</h3>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {generatedApp.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Features</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {generatedApp.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <ApperIcon name="Check" size={14} className="text-success" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Components</h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedApp.components.map((component, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                        >
                          {component}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                    <p className="text-sm text-gray-600">{generatedApp.description}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{generatedApp.codeLines} lines of code generated</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Ready to deploy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <ApperIcon name="Sparkles" size={32} className="mx-auto mb-3 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ready to Build?
                </h3>
                <p className="text-gray-500">
                  Enter your app description and click "Generate App" to see the magic happen!
                </p>
              </div>
            )}

            {/* Recent History */}
            {history.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Recent Generations
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {history.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setPrompt(item.prompt)
                        setGeneratedApp(item.result)
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900">
                          {item.result.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {item.prompt}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}