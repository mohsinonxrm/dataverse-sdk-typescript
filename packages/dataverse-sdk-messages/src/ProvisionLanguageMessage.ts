import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ProvisionLanguage request message
 *
 * Web API Action: ProvisionLanguage
 */
export class ProvisionLanguageRequest
  extends OrganizationRequest
  implements Executable<ProvisionLanguageResponse>
{
  constructor(public language: number) {
    super("ProvisionLanguage");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionLanguage`;

    const body: Record<string, unknown> = {
      Language: this.language,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ProvisionLanguageResponse> {
    // No return value (204 No Content)
    return new ProvisionLanguageResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Language: this.language,
    };
  }
}

/**
 * ProvisionLanguage response message
 */
export class ProvisionLanguageResponse extends OrganizationResponse {
  constructor() {
    super("ProvisionLanguage");
  }

  static fromResponse(_data: unknown): ProvisionLanguageResponse {
    return new ProvisionLanguageResponse();
  }
}
