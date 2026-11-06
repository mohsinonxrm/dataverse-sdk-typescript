import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PublishTheme action
 */
export interface PublishThemeResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<PublishThemeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PublishThemeResponse;
    return (await response.json()) as PublishThemeResponse;
  }
}
