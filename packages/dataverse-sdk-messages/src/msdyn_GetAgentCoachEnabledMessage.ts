import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetAgentCoachEnabled message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAgentCoachEnabledRequestParameters {
  msdyn_RecordType: string;
}

/**
 * msdyn_GetAgentCoachEnabled request message
 *
 * Web API Action: msdyn_GetAgentCoachEnabled
 */
export class msdyn_GetAgentCoachEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAgentCoachEnabledResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAgentCoachEnabledRequestParameters>;

  constructor(parameters: msdyn_GetAgentCoachEnabledRequestParameters) {
    super("msdyn_GetAgentCoachEnabled", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAgentCoachEnabled`;

    const body = requestBody({
      msdyn_RecordType: this.Parameters.msdyn_RecordType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAgentCoachEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetAgentCoachEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAgentCoachEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAgentCoachEnabledResult {
  "@odata.context"?: string;
  msdyn_ErrorResult: string;
  msdyn_IsEnabled: string;
}

/**
 * msdyn_GetAgentCoachEnabled response message
 *
 * `result` is the value the msdyn_GetAgentCoachEnabled action returns (see {@link msdyn_GetAgentCoachEnabledResult}).
 */
export class msdyn_GetAgentCoachEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAgentCoachEnabledResult) {
    super("msdyn_GetAgentCoachEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAgentCoachEnabledResponse {
    return new msdyn_GetAgentCoachEnabledResponse(data as msdyn_GetAgentCoachEnabledResult);
  }
}
