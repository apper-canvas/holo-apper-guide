import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress, className, barClassName }) => {
    return (
        <div className={`w-full bg-gray-200 rounded-full h-2 ${className || ''}`}>
            <motion.div
                className={`h-2 rounded-full ${barClassName || 'bg-accent'}`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
            />
        </div>
    );
};

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
    className: PropTypes.string,
    barClassName: PropTypes.string,
};

export default ProgressBar;