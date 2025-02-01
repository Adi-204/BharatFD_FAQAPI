import request from "supertest";
import app from "../app.js";
import Faqs from "../models/Faqs.js";

describe("GET /api/faqs", () => {
    it("should return a list of Faqs", async () => {
        await Faqs.create({
            question: "What is your name?",
            answer: "My name is Aditya Roy.",
            translations: new Map([
                ["question_en", { text: "What is your name?" }],
                ["answer_en", { text: "My name is John Doe." }],
            ]),
        });
        const res = await request(app).get("/api/faqs?lang=en");
        expect(res.statusCode).toBe(200);
        expect(res.body.faqs.length).toBe(1);
        expect(res.body.faqs[0].question).toBe("What is your name?");
    });

    it("should return cached data if available", async () => {
        const cacheKey = "faqs_en";
        const cachedData = {
            faqs: [{ question: "Cached Question", answer: "Cached Answer" }],
            total: 1,
        };
        await redisClient.set(cacheKey, JSON.stringify(cachedData));
        const res = await request(app).get("/api/faqs?lang=en");
        expect(res.statusCode).toBe(200);
        expect(res.body.faqs[0].question).toBe("Cached Question");
    });
});

describe("POST /api/faqs", () => {
    it("should create a new FAQ", async () => {
        const newFaq = {
            question: "What is your name?",
            answer: "My name is John Doe.",
        }
        const res = await request(app)
            .post("/api/faqs")
            .send(newFaq);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.faq.question).toBe(newFaq.question);
        const faqInDb = await Faqs.findOne({ _id: res.body.faq.id });
        expect(faqInDb).toBeTruthy();
    });
});


describe("PUT /api/faqs/:id", () => {
    it("should update an existing FAQ", async () => {
        const faq = await Faqs.create({
            question: "Old Question",
            answer: "Old Answer",
        });
        const updatedData = {
            question: "Updated Question",
            answer: "Updated Answer",
        };
        const res = await request(app)
            .put(`/api/faqs/${faq._id}`)
            .send(updatedData);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.faq.question).toBe(updatedData.question);
        const updatedFaq = await Faqs.findById(faq._id);
        expect(updatedFaq.question).toBe(updatedData.question);
    });
    it("should return 404 if FAQ is not found", async () => {
        const res = await request(app)
            .put("/api/faqs/64f8e4b1c9b1a8e4b1c9b1a8") 
            .send({ question: "Updated Question", answer: "Updated Answer" });

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("FAQ not found");
    });
});


describe("DELETE /api/faqs/:id", () => {
    it("should delete an existing FAQ", async () => {
        const faq = await Faqs.create({
            question: "Delete Me",
            answer: "This FAQ will be deleted.",
        });
        const res = await request(app).delete(`/api/faqs/${faq._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        const deletedFaq = await Faqs.findById(faq._id);
        expect(deletedFaq).toBeNull();
    });
    it("should return 404 if FAQ is not found", async () => {
        const res = await request(app).delete("/api/faqs/64f8e4b1c9b1a8e4b1c9b1a8"); 
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("FAQ not found");
    });
});