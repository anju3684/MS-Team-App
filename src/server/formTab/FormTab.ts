import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/formTab/index.html")
@PreventIframe("/formTab/config.html")
@PreventIframe("/formTab/remove.html")
export class FormTab {
}
