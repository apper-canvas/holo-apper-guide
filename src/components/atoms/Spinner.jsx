import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ size = 4, color = 'white', className, ...props }) => {
    return (
        <div
            className={`w-${size} h-${size} border-2 border-${color} border-t-transparent rounded-full animate-spin ${className || ''}`}
            role="status"
            aria-label="loading"
            {...props}
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

Spinner.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
};

export default Spinner;