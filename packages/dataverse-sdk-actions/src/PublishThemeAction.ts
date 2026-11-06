import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the PublishTheme action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type PublishThemeResponse = void;

/**
 * PublishTheme action
 *
 * Bound action
 * Binding parameter: entity (mscrm.theme)
 *
 * The first argument is the id of the theme record to call it on.
 */
export class PublishThemeAction implements Executable<PublishThemeResponse> {
  constructor(public readonly themeId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/themes(${this.themeId})/Microsoft.Dynamics.CRM.PublishTheme`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<PublishThemeResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
