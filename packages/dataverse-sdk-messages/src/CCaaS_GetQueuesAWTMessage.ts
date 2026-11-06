import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_GetQueuesAWT message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetQueuesAWTRequestParameters {
  ApiVersion: string;
  QueueIds: string[];
}

/**
 * CCaaS_GetQueuesAWT request message
 *
 * Web API Action: CCaaS_GetQueuesAWT
 */
export class CCaaS_GetQueuesAWTRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetQueuesAWTResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetQueuesAWTRequestParameters>;

  constructor(parameters: CCaaS_GetQueuesAWTRequestParameters) {
    super("CCaaS_GetQueuesAWT", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetQueuesAWT`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      QueueIds: this.Parameters.QueueIds,
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

  async parseResponse(response: Response): Promise<CCaaS_GetQueuesAWTResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_GetQueuesAWTResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_GetQueuesAWT action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetQueuesAWTResult {
  "@odata.context"?: string;
  Queues: string;
}

/**
 * CCaaS_GetQueuesAWT response message
 *
 * `result` is the value the CCaaS_GetQueuesAWT action returns (see {@link CCaaS_GetQueuesAWTResult}).
 */
export class CCaaS_GetQueuesAWTResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetQueuesAWTResult) {
    super("CCaaS_GetQueuesAWT");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_GetQueuesAWTResponse {
    return new CCaaS_GetQueuesAWTResponse(data as CCaaS_GetQueuesAWTResult);
  }
}
