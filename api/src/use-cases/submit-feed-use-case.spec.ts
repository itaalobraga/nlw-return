import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const submitFeedback = new SubmitFeedbackUseCase(
    { create: async () => {} },
    { sendMail: async () => {} }
);

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: ''
        })).resolves.not.toThrow();
    })

    it("should be able to submit a feedback without type", async () => {
        await expect(
            submitFeedback.execute({
                type: "",
                comment: "example comment",
                screenshot: "",
            })
        ).rejects.toThrow();
    });

    it("should be able to submit a feedback without comment", async () => {
        await expect(
            submitFeedback.execute({
                type: "BUG",
                comment: "",
                screenshot: "",
            })
        ).rejects.toThrow();
    });

    it("should be able to submit a feedback without an invalid screenshot", async () => {
        await expect(
            submitFeedback.execute({
                type: "BUG",
                comment: "ta tudo bugado",
                screenshot: "test.jpeg",
            })
        ).rejects.toThrow();
    });
})