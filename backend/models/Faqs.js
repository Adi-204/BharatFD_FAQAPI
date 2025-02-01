import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// FAQ Schema Fields:
// i) question: (The question being asked) - string - required
// ii) answer: (The answer to the FAQ) - string - required
// iii) translations: a Map containing translations for different languages

const faqsSchema = new Schema({
    question: {
        type: String,
        required: [true, "Please provide a question."],
    },
    answer: {
        type: String,
        required: [true, "Please provide an answer to FAQ."],
    },
    translations: {
        type: Map,
        of: new Schema({
            text: { type: String, required: true }
        }),
        default: {}
    }
});

const Faqs = models.Faqs || model("Faqs", faqsSchema);
export default Faqs;
