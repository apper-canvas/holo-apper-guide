import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Spinner from '@/components/atoms/Spinner';

const AppPromptEditor = ({ prompt, setPrompt, isGenerating, onGenerateApp, onClearPlayground }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                    Describe Your App
                </h2>
                <Button
                    onClick={onClearPlayground}
                    variant="textOnly"
                    title="Clear"
                    icon={ApperIcon}
                    iconProps={{ name: 'RotateCcw', size: 16 }}
                >
                    <span className="sr-only">Clear</span>
                </Button>
            </div>

            <Input
                type="textarea"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the app you want to build... Be specific about features, design, and functionality."
                rows={10}
                className="h-40"
            />

            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                    {prompt.length} characters
                </span>
                <Button
                    onClick={onGenerateApp}
                    disabled={isGenerating || !prompt.trim()}
                    icon={ApperIcon}
                    iconProps={{ name: isGenerating ? undefined : 'Zap', size: 16 }}
                >
                    {isGenerating ? (
                        <>
                            <Spinner />
                            <span>Generating...</span>
                        </>
                    ) : (
                        <span>Generate App</span>
                    )}
                </Button>
            </div>
        </div>
    );
};

AppPromptEditor.propTypes = {
    prompt: PropTypes.string.isRequired,
    setPrompt: PropTypes.func.isRequired,
    isGenerating: PropTypes.bool.isRequired,
    onGenerateApp: PropTypes.func.isRequired,
    onClearPlayground: PropTypes.func.isRequired,
};

export default AppPromptEditor;