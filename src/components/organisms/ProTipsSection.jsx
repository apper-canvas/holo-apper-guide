import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import InfoBox from '@/components/molecules/InfoBox';

const ProTipsSection = ({ data }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                    Pro Tips
                </h2>
                <p className="text-gray-600 mb-6">
                    Advanced techniques to get better results from your prompts.
                </p>
            </div>

            {data.map((tip, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                >
                    <div className="flex items-start space-x-3 mb-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ApperIcon name="Lightbulb" size={16} className="text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {tip.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{tip.description}</p>
                            {tip.example && (
                                <InfoBox variant="success" className="p-3">
                                    <div className="text-sm">
                                        <strong>Example:</strong> {tip.example}
                                    </div>
                                </InfoBox>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

ProTipsSection.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        example: PropTypes.string,
    })).isRequired,
};

export default ProTipsSection;