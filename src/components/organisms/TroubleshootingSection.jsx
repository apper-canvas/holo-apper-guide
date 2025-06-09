import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';

const TroubleshootingSection = ({ data }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                    Troubleshooting
                </h2>
                <p className="text-gray-600 mb-6">
                    Common issues and how to solve them.
                </p>
            </div>

            {data.map((issue, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                >
                    <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ApperIcon name="AlertTriangle" size={16} className="text-warning" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                                {issue.problem}
                            </h3>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">Solutions:</h4>
                                <ul className="space-y-2">
                                    {issue.solutions.map((solution, solutionIndex) => (
                                        <li key={solutionIndex} className="flex items-start space-x-2">
                                            <ApperIcon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">{solution}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

TroubleshootingSection.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        problem: PropTypes.string.isRequired,
        solutions: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
};

export default TroubleshootingSection;