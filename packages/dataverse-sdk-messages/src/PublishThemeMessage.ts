import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PublishTheme request message
 *
 * Web API Action: PublishTheme
 */
export class PublishThemeRequest
  extends OrganizationRequest
  implements Executable<PublishThemeResponse>
{
  constructor(public themeId: string) {
    super("PublishTheme");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/themes(${this.themeId})/Microsoft.Dynamics.CRM.PublishTheme`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PublishThemeResponse> {
    // No return value (204 No Content)
    return new PublishThemeResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.themeId,
    };
  }
}

/**
 * PublishTheme response message
 */
export class PublishThemeResponse extends OrganizationResponse {
  constructor() {
    super("PublishTheme");
  }

  static fromResponse(_data: unknown): PublishThemeResponse {
    return new PublishThemeResponse();
  }
}
