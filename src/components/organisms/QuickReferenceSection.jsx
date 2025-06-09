import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const QuickReferenceSection = ({ data }) => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                    Quick Reference
                </h2>
                <p className="text-gray-600 mb-6">
                    Common prompts and patterns to help you build apps faster.
                </p>
            </div>

            {data.map((section, index) => (
                <motion.div
                    key={section.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {section.category}
                    </h3>
                    <div className="space-y-4">
                        {section.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <div className="flex-1">
                                    <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mb-1 inline-block">
                                        {item.prompt}
                                    </div>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

QuickReferenceSection.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
            prompt: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })).isRequired,
    })).isRequired,
};

export default QuickReferenceSection;