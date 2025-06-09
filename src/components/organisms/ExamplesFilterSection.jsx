import React from 'react';
import PropTypes from 'prop-types';
import CategoryFilterButton from '@/components/molecules/CategoryFilterButton';

const categoriesData = [
    { id: 'all', label: 'All Examples', icon: 'Grid3x3' },
    { id: 'productivity', label: 'Productivity', icon: 'CheckSquare' },
    { id: 'business', label: 'Business', icon: 'Briefcase' },
    { id: 'entertainment', label: 'Entertainment', icon: 'Play' },
    { id: 'utility', label: 'Utility', icon: 'Tool' },
    { id: 'social', label: 'Social', icon: 'Users' }
];

const ExamplesFilterSection = ({ selectedCategory, onSelectCategory }) => {
    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-2">
                {categoriesData.map((category) => (
                    <CategoryFilterButton
                        key={category.id}
                        category={category}
                        selected={selectedCategory}
                        onClick={onSelectCategory}
                    />
                ))}
            </div>
        </div>
    );
};

ExamplesFilterSection.propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    onSelectCategory: PropTypes.func.isRequired,
};

export default ExamplesFilterSection;