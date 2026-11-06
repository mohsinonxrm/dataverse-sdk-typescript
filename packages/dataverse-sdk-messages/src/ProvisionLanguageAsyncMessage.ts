import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ProvisionLanguageAsyncResponse as ProvisionLanguageAsyncResponseData } from "./types/index.js";

/**
 * Parameters of the ProvisionLanguageAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ProvisionLanguageAsyncRequestParameters {
  Language: number;
}

/**
 * ProvisionLanguageAsync request message
 *
 * Web API Action: ProvisionLanguageAsync
 */
export class ProvisionLanguageAsyncRequest
  extends OrganizationRequest
  implements Executable<ProvisionLanguageAsyncResponse>
{
  declare readonly Parameters: Readonly<ProvisionLanguageAsyncRequestParameters>;

  constructor(parameters: ProvisionLanguageAsyncRequestParameters) {
    super("ProvisionLanguageAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionLanguageAsync`;

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

  async parseResponse(response: Response): Promise<ProvisionLanguageAsyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return ProvisionLanguageAsyncResponse.fromResponse({});
    return ProvisionLanguageAsyncResponse.fromResponse(await response.json());
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
