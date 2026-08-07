import { errorExtractor } from "error-extractor";
import iziToast, { IziToastSettings } from "izitoast";
import "izitoast/dist/css/iziToast.css"
class Notify {


    private settings: IziToastSettings = {
        position: "topCenter",
        transitionIn: "fadeInRight",
        transitionOut: "fadeOutLeft",
        timeout: 2000

    };
    public success(message: string): void {
        this.settings.message = message;
        iziToast.success(this.settings);
    }

    public error(err: any): void {
        this.settings.message = errorExtractor.getMessage(err);
        iziToast.error(this.settings);
    }
}

export const notify = new Notify();
