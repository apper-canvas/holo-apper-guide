import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const CategoryFilterButton = ({ category, selected, onClick, className }) => {
    const isActive = selected === category.id;
    const buttonClass = isActive
        ? 'bg-primary text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    const iconClass = isActive ? 'text-white' : 'text-gray-600';

    return (
        <motion.button
            key={category.id}
            onClick={() => onClick(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${buttonClass} ${className || ''}`}
        >
            <ApperIcon
                name={category.icon}
                size={16}
                className={iconClass}
            />
            <span>{category.label}</span>
        </motion.button>
    );
};

CategoryFilterButton.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    }).isRequired,
    selected: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default CategoryFilterButton;