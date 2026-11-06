import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GetCallStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetCallStatusRequestParameters {
  ConversationId: string;
  ApiVersion: string;
}

/**
 * GetCallStatus request message
 *
 * Web API Action: GetCallStatus
 */
export class GetCallStatusRequest
  extends OrganizationRequest
  implements Executable<GetCallStatusResponse>
{
  declare readonly Parameters: Readonly<GetCallStatusRequestParameters>;

  constructor(parameters: GetCallStatusRequestParameters) {
    super("GetCallStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetCallStatus`;

    const body = requestBody({
      ConversationId: this.Parameters.ConversationId,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<GetCallStatusResponse> {
    // The body is the complex value, with its @odata.context
    return GetCallStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetCallStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetCallStatusResult {
  "@odata.context"?: string;
  ConversationId: string;
  Status: string;
}

/**
 * GetCallStatus response message
 *
 * `result` is the value the GetCallStatus action returns (see {@link GetCallStatusResult}).
 */
export class GetCallStatusResponse extends OrganizationResponse {
  constructor(public result: GetCallStatusResult) {
    super("GetCallStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetCallStatusResponse {
    return new GetCallStatusResponse(data as GetCallStatusResult);
  }
}
