import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedBackType, feedbackTypes } from "..";
import { api } from "../../../services/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

type FeedbackContentStep = {
    feedbackType: FeedBackType;
    handleRestartFeedback: () => void;
    onFeedbackSent: () => void;
};

export function FeedbackContentStep({
    feedbackType,
    handleRestartFeedback,
    onFeedbackSent,
}: FeedbackContentStep) {
    const feedbackTypesInfos = feedbackTypes[feedbackType];
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState("");
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();
        setIsSendingFeedback(true);
        
        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        })
        onFeedbackSent()
        setIsSendingFeedback(false)
    }

    return (
        <>
            <header>
                <button
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={handleRestartFeedback}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                <span className="text-xl leading-4 flex items-center gap-2">
                    <img
                        src={feedbackTypesInfos.image.source}
                        alt={feedbackTypesInfos.image.alt}
                        className="w-6 h-6"
                    />
                    {feedbackTypesInfos.title}
                </span>
                <CloseButton />
            </header>
            <form
                className="my-4 w-full"
                onSubmit={(event) => handleSubmitFeedback(event)}
            >
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100  border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes oque está acontecendo..."
                    onChange={(event) => setComment(event.target.value)}
                ></textarea>
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        onScreenShotTook={setScreenshot}
                        screenshot={screenshot}
                    />
                    <button
                        type="submit"
                        disabled={!comment || isSendingFeedback}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendingFeedback ? <Loading /> : "Enviar feedback"}
                    </button>
                </footer>
            </form>
        </>
    );
}
