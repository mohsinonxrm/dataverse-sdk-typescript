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
    // No return value (204 No Content)
    return {};
  }
}
