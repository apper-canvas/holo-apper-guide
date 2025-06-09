import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';

const FeatureCard = ({ iconName, title, description, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <ApperIcon name={iconName} size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-gray-600 text-sm">
                {description}
            </p>
        </motion.div>
    );
};

FeatureCard.propTypes = {
    iconName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

export default FeatureCard;