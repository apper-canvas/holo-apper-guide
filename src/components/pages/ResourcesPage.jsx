import { useState } from 'react';
import { motion } from 'framer-motion';
import ResourcesNavigation from '@/components/organisms/ResourcesNavigation';
import QuickReferenceSection from '@/components/organisms/QuickReferenceSection';
import ProTipsSection from '@/components/organisms/ProTipsSection';
import TroubleshootingSection from '@/components/organisms/TroubleshootingSection';
import CommunityResourcesSection from '@/components/organisms/CommunityResourcesSection';

const quickReferenceData = [
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
];

const proTipsData = [
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
];

const troubleshootingData = [
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
];

const communityResourcesData = [
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
];

const ResourcesPage = () => {
  const [activeSection, setActiveSection] = useState('reference');

  const renderContent = () => {
    switch (activeSection) {
      case 'reference':
        return <QuickReferenceSection data={quickReferenceData} />;
      case 'tips':
        return <ProTipsSection data={proTipsData} />;
      case 'troubleshooting':
        return <TroubleshootingSection data={troubleshootingData} />;
      case 'community':
        return <CommunityResourcesSection data={communityResourcesData} />;
      default:
        return null;
    }
  };

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
            <ResourcesNavigation activeSection={activeSection} onSelectSection={setActiveSection} />
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
  );
};

export default ResourcesPage;