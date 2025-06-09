import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';

const LessonProgressItem = ({ lesson, index, isCompleted, isCurrent }) => {
    const statusBg = isCompleted
        ? 'bg-success/5 border-success/20'
        : isCurrent
            ? 'bg-primary/5 border-primary/20'
            : 'bg-gray-50 border-gray-200';

    const iconBg = isCompleted
        ? 'bg-success text-white'
        : isCurrent
            ? 'bg-primary text-white'
            : 'bg-gray-300 text-gray-600';

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center space-x-4 p-4 rounded-lg border ${statusBg}`}
        >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconBg}`}>
                {isCompleted ? (
                    <ApperIcon name="Check" size={16} />
                ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                )}
            </div>

            <div className="flex-1">
                <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                <p className="text-sm text-gray-600">{lesson.description}</p>
            </div>

            {isCurrent && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                    Current
                </span>
            )}

            {isCompleted && (
                <span className="px-2 py-1 bg-success/10 text-success rounded text-sm font-medium">
                    Completed
                </span>
            )}
        </motion.div>
    );
};

LessonProgressItem.propTypes = {
    lesson: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isCurrent: PropTypes.bool.isRequired,
};

export default LessonProgressItem;