import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '../ApperIcon';
import Pill from '../atoms/Pill';
const GeneratedAppDisplay = ({ generatedApp }) => {
    if (!generatedApp) {
        return (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <ApperIcon name="Sparkles" size={32} className="mx-auto mb-3 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Ready to Build?
                </h3>
                <p className="text-gray-500">
                    Enter your app description and click "Generate App" to see the magic happen!
                </p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-6"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                    Generated App
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <ApperIcon name="Clock" size={14} />
                    <span>Built in {generatedApp.buildTime}</span>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="font-medium text-gray-900 mb-2">App Type</h3>
                    <Pill variant="primary">{generatedApp.type}</Pill>
                </div>

                <div>
                    <h3 className="font-medium text-gray-900 mb-2">Features</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {generatedApp.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <ApperIcon name="Check" size={14} className="text-success" />
                                <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-medium text-gray-900 mb-2">Components</h3>
                    <div className="flex flex-wrap gap-2">
                        {generatedApp.components.map((component, index) => (
                            <Pill key={index} variant="default">{component}</Pill>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                    <p className="text-sm text-gray-600">{generatedApp.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{generatedApp.codeLines} lines of code generated</span>
                        <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-success rounded-full"></div>
                            <span>Ready to deploy</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

GeneratedAppDisplay.propTypes = {
    generatedApp: PropTypes.shape({
        type: PropTypes.string,
        features: PropTypes.arrayOf(PropTypes.string),
        components: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string,
        codeLines: PropTypes.number,
        buildTime: PropTypes.string,
    }),
};

export default GeneratedAppDisplay;