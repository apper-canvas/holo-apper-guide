import { useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './components/ApperIcon'
import { routeArray } from './config/routes'

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 h-16 bg-white border-b border-gray-200 z-40">
        <div className="h-full flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <ApperIcon name="Menu" size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-heading font-bold text-gray-900">
                Apper Guide
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <ApperIcon name="Search" size={16} />
              <span>Search guide...</span>
              <kbd className="px-2 py-1 text-xs bg-white rounded border">⌘K</kbd>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <ApperIcon name="Settings" size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 bg-surface border-r border-gray-200 flex-col">
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {routeArray.map((route) => (
                <NavLink
                  key={route.id}
                  to={route.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-gray-700 hover:bg-white hover:text-primary hover:shadow-sm'
                    }`
                  }
                >
                  <ApperIcon 
                    name={route.icon} 
                    size={18} 
                    className={location.pathname === route.path ? 'text-white' : ''} 
                  />
                  <span>{route.label}</span>
                </NavLink>
              ))}
            </nav>
            
            <div className="p-4 border-t border-gray-200 mt-auto">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-4 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <ApperIcon name="Lightbulb" size={16} />
                  <span className="text-sm font-medium">Pro Tip</span>
                </div>
                <p className="text-xs opacity-90">
                  Try the playground to experiment with your own app ideas!
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/50 z-50"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-gray-200 z-50 flex flex-col"
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <ApperIcon name="Zap" size={18} className="text-white" />
                    </div>
                    <h2 className="text-lg font-heading font-bold text-gray-900">
                      Apper Guide
                    </h2>
                  </div>
                </div>
                
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                  {routeArray.map((route) => (
                    <NavLink
                      key={route.id}
                      to={route.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-gray-700 hover:bg-white hover:text-primary hover:shadow-sm'
                        }`
                      }
                    >
                      <ApperIcon name={route.icon} size={18} />
                      <span>{route.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}