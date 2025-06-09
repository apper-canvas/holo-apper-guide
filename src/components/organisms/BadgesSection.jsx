import React from 'react';
import PropTypes from 'prop-types';
import AchievementBadgeItem from '@/components/molecules/AchievementBadgeItem';

const BadgesSection = ({ earnedBadges, availableBadges }) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                Achievements
            </h2>

            {/* Earned Badges */}
            {earnedBadges.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Earned Badges</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {earnedBadges.map((badge, index) => (
                            <AchievementBadgeItem key={badge.id} badge={badge} index={index} isEarned={true} />
                        ))}
                    </div>
                </div>
            )}

            {/* Available Badges */}
            {availableBadges.length > 0 && (
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Available Badges</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {availableBadges.map((badge, index) => (
                            <AchievementBadgeItem key={badge.id} badge={badge} index={index} isEarned={false} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

BadgesSection.propTypes = {
    earnedBadges: PropTypes.arrayOf(PropTypes.object).isRequired,
    availableBadges: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BadgesSection;