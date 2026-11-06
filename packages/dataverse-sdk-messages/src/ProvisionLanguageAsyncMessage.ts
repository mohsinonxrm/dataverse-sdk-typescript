import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ProvisionLanguageAsyncResponse as ProvisionLanguageAsyncResponseData } from "./types/index.js";

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
}

/**
 * ProvisionLanguageAsync response message
 */
export class ProvisionLanguageAsyncResponse extends OrganizationResponse {
  constructor(public result: ProvisionLanguageAsyncResponseData) {
    super("ProvisionLanguageAsync");
  }

  static fromResponse(data: unknown): ProvisionLanguageAsyncResponse {
    return new ProvisionLanguageAsyncResponse(
      responseObject<ProvisionLanguageAsyncResponseData>(data)
    );
  }
}
