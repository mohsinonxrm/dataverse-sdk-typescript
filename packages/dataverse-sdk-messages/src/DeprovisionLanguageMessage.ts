import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DeprovisionLanguage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeprovisionLanguageRequestParameters {
  Language: number;
  CleanupLanguageRows?: boolean;
}

/**
 * DeprovisionLanguage request message
 *
 * Web API Action: DeprovisionLanguage
 */
export class DeprovisionLanguageRequest
  extends OrganizationRequest
  implements Executable<DeprovisionLanguageResponse>
{
  declare readonly Parameters: Readonly<DeprovisionLanguageRequestParameters>;

  constructor(parameters: DeprovisionLanguageRequestParameters) {
    super("DeprovisionLanguage", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeprovisionLanguage`;

    const body = requestBody({
      Language: this.Parameters.Language,
      CleanupLanguageRows: this.Parameters.CleanupLanguageRows,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  parseResponse(_response: Response): Promise<DeprovisionLanguageResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new DeprovisionLanguageResponse());
  }
}

/**
 * DeprovisionLanguage response message
 */
export class DeprovisionLanguageResponse extends OrganizationResponse {
  constructor() {
    super("DeprovisionLanguage");
  }

  static fromResponse(_data?: unknown): DeprovisionLanguageResponse {
    return new DeprovisionLanguageResponse();
  }
}
