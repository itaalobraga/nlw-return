import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

type ScreenshotButtonProps = {
    onScreenShotTook: (screenshot: string | null) => void;
    screenshot: string | null;
};

export function ScreenshotButton({ screenshot, onScreenShotTook }: ScreenshotButtonProps) {
    const [isTakingScreenShot, setIsTakingScreenShot] = useState(false);

    async function handleTakeScreentShot() {
        setIsTakingScreenShot(true);
        const canvas = await html2canvas(document.querySelector("html")!);
        const base64img = canvas.toDataURL("image/png");

        onScreenShotTook(base64img);

        setIsTakingScreenShot(false);
    }
        return screenshot ? (
            <button type="button" className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors" style={{backgroundImage: `url(${screenshot})`, backgroundPosition: `right bottom`, backgroundSize: 180,}} onClick={() => onScreenShotTook(null)}>
                <Trash weight="fill" />
            </button>
        ) : (
            <button
                type="button"
                className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
                onClick={handleTakeScreentShot}
            >
                {isTakingScreenShot ? (
                    <Loading />
                ) : (
                    <Camera className="w-6 h-6 text-zinc-100" />
                )}
            </button>
        );
}