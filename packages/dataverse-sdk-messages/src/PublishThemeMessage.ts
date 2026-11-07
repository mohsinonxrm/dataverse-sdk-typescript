import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PublishTheme request message
 *
 * Web API Action: PublishTheme
 *
 * The first argument is the id of the theme record to call it on.
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
    const url = `${baseUrl}/themes(${odataLiteral.guid(this.themeId)})/Microsoft.Dynamics.CRM.PublishTheme`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<PublishThemeResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new PublishThemeResponse());
  }
}

/**
 * PublishTheme response message
 */
export class PublishThemeResponse extends OrganizationResponse {
  constructor() {
    super("PublishTheme");
  }

  static fromResponse(_data?: unknown): PublishThemeResponse {
    return new PublishThemeResponse();
  }
}
