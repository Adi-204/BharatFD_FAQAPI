import Faqs from "../models/Faqs.js";
import redisClient from "../config/redis.js";
import translateFaq from "../utils/translateFaq.js";
import { clearCache } from "../utils/clearCache.js";
import validateFaqData from "../utils/validateFaq.js";


const createFaq = async (req, res) => {
    try {

        const { question, answer } = req.body;

        validateFaqData({ question, answer });

        const translation = await translateFaq({ question, answer });

        const translations = new Map();
        Object.entries(translation).forEach(([key, translatedText]) => {
            translations.set(key, {
                text: translatedText
            });
        });

        const faq = new Faqs({
            question,
            answer,
            translations
        });

        await faq.save();

        clearCache();

        return res.status(200).json({
            message: "FAQs created successfully",
            faqs: faq,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(
            {
                message: error.message || "Something went wrong - please try again later!",
            }
        );
    }
};

const getFaqs = async (req, res) => {
    try {
        const { lang = 'en' } = req.query;

        const cacheKey = `faqs_${lang}`;

        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            // If cache hit, return cached FAQs
            return res.status(200).json({
                message: 'FAQs fetched from cache',
                faqs: JSON.parse(cachedData),
            });
        }

        const faqs = await Faqs.find();

        const translatedFaqs = faqs.map(faq => ({
            question: faq.translations.get(`question_${lang}`)?.text || faq.question,
            answer: faq.translations.get(`answer_${lang}`)?.text || faq.answer,
        }));

        await redisClient.set(cacheKey, JSON.stringify(translatedFaqs), {
            EX: 300
        });

        return res.status(200).json({
            message: "FAQs fetched successfully",
            faqs: translatedFaqs,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(
            {
                message: error.message || "Something went wrong - please try again later!",
            }
        );
    }
};

const updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        let { question, answer } = req.body;

        validateFaqData({ question, answer });

        const faq = await Faqs.findById(id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        if (question) faq.question = question;
        if (answer) faq.answer = answer;

        if (question || answer) {
            const translatedData = await translateFaq({
                question: faq.question,
                answer: faq.answer
            });

            const translations = new Map();
            Object.entries(translatedData).forEach(([key, translatedText]) => {
                translations.set(key, {
                    text: translatedText
                });
            });

            faq.translations = translations;
        }

        const updatedFaq = await faq.save();

        clearCache();

        return res.status(200).json({
            message: 'FAQ updated successfully',
            faq: updatedFaq
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(
            {
                message: error.message || "Something went wrong - please try again later!",
            }
        );
    }
};

const deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'FAQ ID is required' });
        }

        const deletedFaq = await Faqs.findByIdAndDelete(id);

        if (!deletedFaq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        clearCache();

        return res.status(200).json({
            message: 'FAQ deleted successfully',
            faq: deleteFaq
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(
            {
                message: error.message || "Something went wrong - please try again later!",
            }
        );
    }
};

export { getFaqs, createFaq, deleteFaq, updateFaq };
