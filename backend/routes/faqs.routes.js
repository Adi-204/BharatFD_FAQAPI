import { Router } from "express";
import { getFaqs, createFaq, deleteFaq, updateFaq } from "../controllers/faqs.controller.js";

const router = Router();

router.route("/").get(getFaqs);
router.route("/").post(createFaq);
router.route("/:id").put(updateFaq);
router.route("/:id").delete(deleteFaq);

export default router;