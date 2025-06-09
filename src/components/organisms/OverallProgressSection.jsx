import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ProgressBar from '@/components/atoms/ProgressBar';
import StatDisplay from '@/components/molecules/StatDisplay';

const OverallProgressSection = ({ progressPercentage, completedLessonsCount, earnedBadgesCount, lessonsRemaining }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white mb-8"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold">Overall Progress</h2>
                <div className="text-2xl font-bold">{progressPercentage}%</div>
            </div>

            <ProgressBar progress={progressPercentage} className="h-3 mb-4" barClassName="bg-white" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <StatDisplay value={completedLessonsCount} label="Lessons Completed" />
                <StatDisplay value={earnedBadgesCount} label="Badges Earned" />
                <StatDisplay value={lessonsRemaining} label="Lessons Remaining" />
            </div>
        </motion.div>
    );
};

OverallProgressSection.propTypes = {
    progressPercentage: PropTypes.number.isRequired,
    completedLessonsCount: PropTypes.number.isRequired,
    earnedBadgesCount: PropTypes.number.isRequired,
    lessonsRemaining: PropTypes.number.isRequired,
};

export default OverallProgressSection;