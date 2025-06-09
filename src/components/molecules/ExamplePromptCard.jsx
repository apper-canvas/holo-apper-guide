import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';

const ExamplePromptCard = ({ title, prompt, onClick, className, ...props }) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            className={`w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all ${className || ''}`}
            {...props}
        >
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{title}</h4>
                <ApperIcon name="ArrowRight" size={16} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
                {prompt.split('\n')[0]}
            </p>
        </motion.button>
    );
};

ExamplePromptCard.propTypes = {
    title: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default ExamplePromptCard;