import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import FeatureCard from '@/components/molecules/FeatureCard';

const featuresData = [
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
];

const FeatureGrid = () => {
    return (
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
                {featuresData.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        iconName={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        index={index}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default FeatureGrid;