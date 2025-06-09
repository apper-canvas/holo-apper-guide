import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const HeroSection = ({ isNewUser, completedLessonsCount, onStartLearning, onTryPlayground }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
        >
            <div className="mb-6">
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="inline-block"
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                        <ApperIcon name="Zap" size={32} className="text-white" />
                    </div>
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
                    Welcome to <span className="text-primary">Apper</span>
                </h1>

                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                    Learn to build complete web applications without writing a single line of code.
                    Just describe what you want, and watch Apper bring your ideas to life.
                </p>
            </div>

            {/* Progress Banner for Returning Users */}
            {!isNewUser && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-lg p-4 mb-8 inline-block"
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                            <ApperIcon name="Trophy" size={16} className="text-white" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-gray-900">
                                Welcome back! You've completed {completedLessonsCount} lessons
                            </p>
                            <p className="text-sm text-gray-600">
                                Ready to continue your journey?
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={onStartLearning} icon={ApperIcon} iconProps={{ name: 'ArrowRight' }}>
                    {isNewUser ? 'Start Learning' : 'Continue Tutorial'}
                </Button>

                <Button onClick={onTryPlayground} variant="secondary" icon={ApperIcon} iconProps={{ name: 'Code' }}>
                    Try Playground
                </Button>
            </div>
        </motion.div>
    );
};

HeroSection.propTypes = {
    isNewUser: PropTypes.bool.isRequired,
    completedLessonsCount: PropTypes.number,
    onStartLearning: PropTypes.func.isRequired,
    onTryPlayground: PropTypes.func.isRequired,
};

export default HeroSection;