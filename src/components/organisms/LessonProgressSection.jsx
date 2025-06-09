import React from 'react';
import PropTypes from 'prop-types';
import LessonProgressItem from '@/components/molecules/LessonProgressItem';

const LessonProgressSection = ({ lessons, userProgress }) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                Lesson Progress
            </h2>

            <div className="space-y-4">
                {lessons.map((lesson, index) => {
                    const isCompleted = userProgress?.completedLessons?.includes(lesson.id);
                    const isCurrent = userProgress?.currentLesson === lesson.id;

                    return (
                        <LessonProgressItem
                            key={lesson.id}
                            lesson={lesson}
                            index={index}
                            isCompleted={isCompleted}
                            isCurrent={isCurrent}
                        />
                    );
                })}
            </div>
        </div>
    );
};

LessonProgressSection.propTypes = {
    lessons: PropTypes.arrayOf(PropTypes.object).isRequired,
    userProgress: PropTypes.object,
};

export default LessonProgressSection;