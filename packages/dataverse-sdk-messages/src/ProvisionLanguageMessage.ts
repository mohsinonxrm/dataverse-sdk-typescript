import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ProvisionLanguage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ProvisionLanguageRequestParameters {
  Language: number;
}

/**
 * ProvisionLanguage request message
 *
 * Web API Action: ProvisionLanguage
 */
export class ProvisionLanguageRequest
  extends OrganizationRequest
  implements Executable<ProvisionLanguageResponse>
{
  declare readonly Parameters: Readonly<ProvisionLanguageRequestParameters>;

  constructor(parameters: ProvisionLanguageRequestParameters) {
    super("ProvisionLanguage", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionLanguage`;

    const body = requestBody({
      Language: this.Parameters.Language,
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

  parseResponse(_response: Response): Promise<ProvisionLanguageResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ProvisionLanguageResponse());
  }
}

/**
 * ProvisionLanguage response message
 */
export class ProvisionLanguageResponse extends OrganizationResponse {
  constructor() {
    super("ProvisionLanguage");
  }

  static fromResponse(_data?: unknown): ProvisionLanguageResponse {
    return new ProvisionLanguageResponse();
  }
}
