/**
 * Generate daily practice questions based on user's weak topics.
 * Replace the body of this function with your real question-bank DB query.
 *
 * @param {Array}  weakTopics  - Array of { subject, topic, confidence }
 * @param {number} count       - Number of questions to generate
 * @returns {Array}            - Array of question objects
 */
function generateDailyQuestions(weakTopics = [], count = 10) {
  const questions = [];

  for (let i = 0; i < count; i++) {
    const topicEntry = weakTopics[i % (weakTopics.length || 1)] || {};

    questions.push({
      id: i + 1,
      topic: topicEntry.topic || 'General',
      subject: topicEntry.subject || 'Physics',
      // TODO: replace with real question from DB
      question: `Practice question ${i + 1} on ${topicEntry.topic || 'General'}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: 'Detailed explanation goes here.',
      difficulty: 'medium',
    });
  }

  return questions;
}

/**
 * Format a score out of 300 as a percentage string.
 */
function formatScore(score, total = 300) {
  return `${score}/${total} (${((score / total) * 100).toFixed(1)}%)`;
}

module.exports = { generateDailyQuestions, formatScore };
