import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

export default function Resources() {
  const [activeSection, setActiveSection] = useState('reference')

  const sections = [
    { id: 'reference', label: 'Quick Reference', icon: 'BookOpen' },
    { id: 'tips', label: 'Pro Tips', icon: 'Lightbulb' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: 'HelpCircle' },
    { id: 'community', label: 'Community', icon: 'Users' }
  ]

  const quickReference = [
    {
      category: 'Basic App Types',
      items: [
        { prompt: 'Create a todo app', description: 'Simple task management with add, complete, delete' },
        { prompt: 'Build a calculator', description: 'Basic arithmetic operations with buttons' },
        { prompt: 'Make a blog', description: 'Articles with reading, writing, commenting' },
        { prompt: 'Design a dashboard', description: 'Analytics with charts and metrics' }
      ]
    },
    {
      category: 'Layout & Design',
      items: [
        { prompt: 'with clean modern design', description: 'Minimalist, professional appearance' },
        { prompt: 'using purple color scheme', description: 'Purple primary with complementary colors' },
        { prompt: 'with dark theme', description: 'Dark backgrounds with light text' },
        { prompt: 'responsive mobile-first', description: 'Mobile-optimized with desktop enhancement' }
      ]
    },
    {
      category: 'Functionality',
      items: [
        { prompt: 'with search and filtering', description: 'Find and sort content easily' },
        { prompt: 'include user authentication', description: 'Login, signup, user profiles' },
        { prompt: 'with real-time updates', description: 'Live data synchronization' },
        { prompt: 'export to PDF/CSV', description: 'Download data in various formats' }
      ]
    }
  ]

  const proTips = [
    {
      title: 'Be Specific About Features',
      description: 'Instead of "make it interactive", say "clicking items should mark them complete with a green checkmark"',
      example: 'Good: "Create a recipe app where users can search recipes, save favorites, and rate dishes 1-5 stars"'
    },
    {
      title: 'Describe User Flows',
      description: 'Explain what happens when users perform actions to get better interactions',
      example: 'Good: "When adding a new task, show a form with title and description, then add it to the top of the list"'
    },
    {
      title: 'Mention Visual Preferences',
      description: 'Include colors, layout style, and visual elements you want',
      example: 'Good: "Use a card-based layout with blue headers and icons for each action button"'
    },
    {
      title: 'Specify Data Structure',
      description: 'Describe what information each item should contain',
      example: 'Good: "Each contact should have name, email, phone, company, and profile photo"'
    }
  ]

  const troubleshooting = [
    {
      problem: 'App looks different than expected',
      solutions: [
        'Add more specific design descriptions',
        'Mention exact colors using names (blue, green) or hex codes',
        'Describe layout preferences (grid, list, cards)',
        'Include spacing and sizing preferences'
      ]
    },
    {
      problem: 'Missing functionality',
      solutions: [
        'List all features explicitly in your prompt',
        'Describe user interactions step by step',
        'Mention edge cases and error handling',
        'Include any special behaviors or rules'
      ]
    },
    {
      problem: 'App too simple/complex',
      solutions: [
        'Adjust the level of detail in your prompt',
        'For simpler: focus on core features only',
        'For complex: add advanced features and integrations',
        'Use examples from similar apps you like'
      ]
    }
  ]

  const communityResources = [
    {
      title: 'Official Discord',
      description: 'Join our community for real-time help and inspiration',
      action: 'Join Discord',
      icon: 'MessageCircle'
    },
    {
      title: 'App Gallery',
      description: 'Browse apps made by other users and get inspired',
      action: 'View Gallery',
      icon: 'Image'
    },
    {
      title: 'Weekly Challenges',
      description: 'Participate in themed app-building challenges',
      action: 'See Challenges',
      icon: 'Target'
    },
    {
      title: 'Documentation',
      description: 'Comprehensive guides and API references',
      action: 'Read Docs',
      icon: 'FileText'
    }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'reference':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                Quick Reference
              </h2>
              <p className="text-gray-600 mb-6">
                Common prompts and patterns to help you build apps faster.
              </p>
            </div>

            {quickReference.map((section, index) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {section.category}
                </h3>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mb-1 inline-block">
                          {item.prompt}
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'tips':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                Pro Tips
              </h2>
              <p className="text-gray-600 mb-6">
                Advanced techniques to get better results from your prompts.
              </p>
            </div>

            {proTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ApperIcon name="Lightbulb" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{tip.description}</p>
                    {tip.example && (
                      <div className="tip-box success">
                        <div className="text-sm">
                          <strong>Example:</strong> {tip.example}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'troubleshooting':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                Troubleshooting
              </h2>
              <p className="text-gray-600 mb-6">
                Common issues and how to solve them.
              </p>
            </div>

            {troubleshooting.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ApperIcon name="AlertTriangle" size={16} className="text-warning" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      {issue.problem}
                    </h3>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Solutions:</h4>
                      <ul className="space-y-2">
                        {issue.solutions.map((solution, solutionIndex) => (
                          <li key={solutionIndex} className="flex items-start space-x-2">
                            <ApperIcon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'community':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                Community & Support
              </h2>
              <p className="text-gray-600 mb-6">
                Connect with other Apper users and get additional help.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityResources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ApperIcon name={resource.icon} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      <button className="flex items-center space-x-2 text-primary hover:text-primary/80 font-medium">
                        <span>{resource.action}</span>
                        <ApperIcon name="ExternalLink" size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Resources
          </h1>
          <p className="text-gray-600">
            Everything you need to master Apper and build amazing applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2 sticky top-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ApperIcon 
                    name={section.icon} 
                    size={18} 
                    className={activeSection === section.id ? 'text-white' : 'text-gray-600'} 
                  />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}