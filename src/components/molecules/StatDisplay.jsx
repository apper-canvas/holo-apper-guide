import React from 'react';
import PropTypes from 'prop-types';

const StatDisplay = ({ value, label, className }) => {
    return (
        <div className={`text-center ${className || ''}`}>
            <div className="text-2xl font-bold mb-2">{value}</div>
            <div className="text-white/80">{label}</div>
        </div>
    );
};

StatDisplay.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default StatDisplay;