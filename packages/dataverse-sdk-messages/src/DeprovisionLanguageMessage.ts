import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DeprovisionLanguage request message
 *
 * Web API Action: DeprovisionLanguage
 */
export class DeprovisionLanguageRequest
  extends OrganizationRequest
  implements Executable<DeprovisionLanguageResponse>
{
  constructor(
    public language: number,
    public cleanupLanguageRows: boolean
  ) {
    super("DeprovisionLanguage");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeprovisionLanguage`;

    const body: Record<string, unknown> = {
      Language: this.language,
      CleanupLanguageRows: this.cleanupLanguageRows,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<DeprovisionLanguageResponse> {
    // No return value (204 No Content)
    return new DeprovisionLanguageResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Language: this.language,
      CleanupLanguageRows: this.cleanupLanguageRows,
    };
  }
}

/**
 * DeprovisionLanguage response message
 */
export class DeprovisionLanguageResponse extends OrganizationResponse {
  constructor() {
    super("DeprovisionLanguage");
  }

  static fromResponse(_data: unknown): DeprovisionLanguageResponse {
    return new DeprovisionLanguageResponse();
  }
}
