import React from 'react';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';

const sectionsData = [
    { id: 'reference', label: 'Quick Reference', icon: 'BookOpen' },
    { id: 'tips', label: 'Pro Tips', icon: 'Lightbulb' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: 'HelpCircle' },
    { id: 'community', label: 'Community', icon: 'Users' }
];

const ResourcesNavigation = ({ activeSection, onSelectSection }) => {
    return (
        <nav className="space-y-2 sticky top-4">
            {sectionsData.map((section) => (
                <button
                    key={section.id}
                    onClick={() => onSelectSection(section.id)}
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
    );
};

ResourcesNavigation.propTypes = {
    activeSection: PropTypes.string.isRequired,
    onSelectSection: PropTypes.func.isRequired,
};

export default ResourcesNavigation;