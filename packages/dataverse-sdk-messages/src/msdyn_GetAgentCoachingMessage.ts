import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetAgentCoaching message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAgentCoachingRequestParameters {
  msdyn_RecordType: string;
  msdyn_RegardingId: string;
}

/**
 * msdyn_GetAgentCoaching request message
 *
 * Web API Action: msdyn_GetAgentCoaching
 */
export class msdyn_GetAgentCoachingRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAgentCoachingResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAgentCoachingRequestParameters>;

  constructor(parameters: msdyn_GetAgentCoachingRequestParameters) {
    super("msdyn_GetAgentCoaching", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAgentCoaching`;

    const body = requestBody({
      msdyn_RecordType: this.Parameters.msdyn_RecordType,
      msdyn_RegardingId: this.Parameters.msdyn_RegardingId,
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

  async parseResponse(response: Response): Promise<msdyn_GetAgentCoachingResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetAgentCoachingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAgentCoaching action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAgentCoachingResult {
  "@odata.context"?: string;
  msdyn_CoachingResult: string;
  msdyn_ErrorResult: string;
}

/**
 * msdyn_GetAgentCoaching response message
 *
 * `result` is the value the msdyn_GetAgentCoaching action returns (see {@link msdyn_GetAgentCoachingResult}).
 */
export class msdyn_GetAgentCoachingResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAgentCoachingResult) {
    super("msdyn_GetAgentCoaching");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAgentCoachingResponse {
    return new msdyn_GetAgentCoachingResponse(data as msdyn_GetAgentCoachingResult);
  }
}
