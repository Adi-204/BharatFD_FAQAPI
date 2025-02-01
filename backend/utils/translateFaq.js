import translate from 'translate-google';

const translateFaq = async ({ question, answer }) => {
    const allTranslations = {};
    const languages = ['en', 'hi', 'bn'];

    try {
        if (!question || typeof question !== 'string' || question.trim().length === 0) {
            throw new Error('Invalid question input');
        }
        if (!answer || typeof answer !== 'string' || answer.trim().length === 0) {
            throw new Error('Invalid answer input');
        }

        // Parallel translation calls for efficiency
        const translatedQuestions = await Promise.all(
            languages.map(lang => translate(question, { to: lang }))
        );

        const translatedAnswers = await Promise.all(
            languages.map(lang => translate(answer, { to: lang }))
        );

        // Assign translations to the result object
        languages.forEach((lang, index) => {
            allTranslations[`question_${lang}`] = translatedQuestions[index];
            allTranslations[`answer_${lang}`] = translatedAnswers[index];
        });
        
        return allTranslations;
    } catch (error) {
        console.error("Translation error:", error);
        throw new Error(`Failed to translate content: ${error.message}`);
    }
};

export default translateFaq;
