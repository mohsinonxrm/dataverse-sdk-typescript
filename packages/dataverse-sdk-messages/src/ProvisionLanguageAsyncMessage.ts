import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ProvisionLanguageAsync request message
 *
 * Web API Action: ProvisionLanguageAsync
 */
export class ProvisionLanguageAsyncRequest
  extends OrganizationRequest
  implements Executable<ProvisionLanguageAsyncResponse>
{
  constructor(public language: number) {
    super("ProvisionLanguageAsync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionLanguageAsync`;

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

  async parseResponse(response: Response): Promise<ProvisionLanguageAsyncResponse> {
    const data = await response.json();
    return ProvisionLanguageAsyncResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Language: this.language,
    };
  }
}

/**
 * ProvisionLanguageAsync response message
 */
export class ProvisionLanguageAsyncResponse extends OrganizationResponse {
  constructor(public result: ProvisionLanguageAsyncResponse) {
    super("ProvisionLanguageAsync");
  }

  static fromResponse(data: unknown): ProvisionLanguageAsyncResponse {
    return new ProvisionLanguageAsyncResponse((data as any).value);
  }
}
