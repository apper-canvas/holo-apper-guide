import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';

const AchievementBadgeItem = ({ badge, index, isEarned = true }) => {
    const opacityClass = isEarned ? '' : 'opacity-60';
    const bgClass = isEarned ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-50 border border-gray-200';
    const textColorClass = isEarned ? 'text-gray-900' : 'text-gray-600';
    const descColorClass = isEarned ? 'text-gray-600' : 'text-gray-500';
    const iconBgClass = isEarned ? 'bg-gray-100' : 'bg-gray-200';
    const iconColorClass = isEarned ? (badge.color || '') : 'text-gray-400';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center space-x-3 p-4 rounded-lg ${bgClass} ${opacityClass}`}
        >
            <div className={`w-12 h-12 rounded-full ${iconBgClass} flex items-center justify-center`}>
                <ApperIcon name={badge.icon} size={24} className={iconColorClass} />
            </div>
            <div>
                <h4 className={`font-medium ${textColorClass}`}>{badge.name}</h4>
                <p className={`text-sm ${descColorClass}`}>{badge.description}</p>
            </div>
        </motion.div>
    );
};

AchievementBadgeItem.propTypes = {
    badge: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        color: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    isEarned: PropTypes.bool,
};

export default AchievementBadgeItem;