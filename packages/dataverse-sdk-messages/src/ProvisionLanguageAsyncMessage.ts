import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return ProvisionLanguageAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ProvisionLanguageAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ProvisionLanguageAsyncResult {
  "@odata.context"?: string;
  AsyncOperationId: string;
}

/**
 * ProvisionLanguageAsync response message
 *
 * `result` is the value the ProvisionLanguageAsync action returns (see {@link ProvisionLanguageAsyncResult}).
 */
export class ProvisionLanguageAsyncResponse extends OrganizationResponse {
  constructor(public result: ProvisionLanguageAsyncResult) {
    super("ProvisionLanguageAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ProvisionLanguageAsyncResponse {
    return new ProvisionLanguageAsyncResponse(data as ProvisionLanguageAsyncResult);
  }
}
