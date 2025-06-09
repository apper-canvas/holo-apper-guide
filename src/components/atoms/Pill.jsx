import React from 'react';
import PropTypes from 'prop-types';

const Pill = ({ children, className, variant = 'default', ...props }) => {
    const baseStyle = 'inline-block px-3 py-1 rounded-full text-sm font-medium';

    const variants = {
        default: 'bg-gray-100 text-gray-700',
        primary: 'bg-primary/10 text-primary',
        success: 'bg-success/10 text-success',
        info: 'bg-info/10 text-info',
        warning: 'bg-warning/10 text-warning',
    };

    const combinedClassName = `${baseStyle} ${variants[variant] || variants.default} ${className || ''}`;

    return (
        <span className={combinedClassName} {...props}>
            {children}
        </span>
    );
};

Pill.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning']),
};

export default Pill;