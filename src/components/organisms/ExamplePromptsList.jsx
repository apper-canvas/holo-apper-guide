import React from 'react';
import PropTypes from 'prop-types';
import ExamplePromptCard from '@/components/molecules/ExamplePromptCard';

const ExamplePromptsList = ({ examples, onLoadExample }) => {
    return (
        <div className="bg-surface rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
                Try These Examples
            </h3>
            <div className="space-y-3">
                {examples.map((example, index) => (
                    <ExamplePromptCard
                        key={index}
                        title={example.title}
                        prompt={example.prompt}
                        onClick={() => onLoadExample(example)}
                    />
                ))}
            </div>
        </div>
    );
};

ExamplePromptsList.propTypes = {
    examples: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        prompt: PropTypes.string.isRequired,
    })).isRequired,
    onLoadExample: PropTypes.func.isRequired,
};

export default ExamplePromptsList;