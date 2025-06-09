import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types'; // Added for prop type validation

const Button = ({ children, onClick, className, disabled, variant = 'primary', icon: Icon, whileHover, whileTap, ...props }) => {
    const baseStyle = 'flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary/90',
        secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
        link: 'text-primary hover:text-primary/80',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        ghost: 'text-gray-600 hover:text-gray-900',
        filter: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        filterActive: 'bg-primary text-white',
        border: 'border border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50',
        textOnly: 'text-gray-500 hover:text-gray-700 p-1',
    };

    const combinedClassName = `${baseStyle} ${variants[variant] || variants.primary} ${className || ''}`;

    return (
        <motion.button
            onClick={onClick}
            className={combinedClassName}
            disabled={disabled}
            whileHover={whileHover || (disabled ? {} : { scale: 1.02 })}
            whileTap={whileTap || (disabled ? {} : { scale: 0.98 })}
            {...props}
        >
            {Icon && <Icon size={16} />}
            {children}
        </motion.button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'link', 'danger', 'ghost', 'filter', 'filterActive', 'border', 'textOnly']),
    icon: PropTypes.elementType, // Icon component from ApperIcon
    whileHover: PropTypes.object,
    whileTap: PropTypes.object,
};

export default Button;