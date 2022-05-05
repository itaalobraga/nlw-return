import { FeedBackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

type FeedbackTypeStep = {
    toogleFeedbackType: (type: FeedBackType) => void;
};

export function FeedbackTypeStep({ toogleFeedbackType }: FeedbackTypeStep) {
    return (
        <>
            <header>
                <span className="text-xl leading-6">Deixe seu feedback</span>
                <CloseButton />
            </header>
            <div className="flex py-8 gap-2 w-full">
                {Object.entries(feedbackTypes).map(([key, value]) => {
                    return (
                        <button
                            className="bg-zinc-800 rounded-lg py-5 w-24 flex flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus::outline-none"
                            type="button"
                            key={key}
                            onClick={() => toogleFeedbackType(key as FeedBackType)}
                        >
                            <img src={value.image.source} alt={value.image.alt} />
                            <span>{value.title}</span>
                        </button>
                    );
                })}
            </div>
        </>
    );
}