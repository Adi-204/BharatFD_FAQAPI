const validateFaqData = ({ question, answer }) => {
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
        throw new Error('Question is required and must be a non-empty string');
    }

    if (!answer || typeof answer !== 'string' || answer.trim().length === 0) {
        throw new Error('Answer is required and must be a non-empty string');
    }
};

export default validateFaqData;