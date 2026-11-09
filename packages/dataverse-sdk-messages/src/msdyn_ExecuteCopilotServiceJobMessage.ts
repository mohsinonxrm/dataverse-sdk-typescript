import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ExecuteCopilotServiceJob message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteCopilotServiceJobRequestParameters {
  msdyn_AuthFlowType?: number;
  msdyn_JobPayload?: string;
  msdyn_JobType: number;
}

/**
 * msdyn_ExecuteCopilotServiceJob request message
 *
 * Web API Action: msdyn_ExecuteCopilotServiceJob
 */
export class msdyn_ExecuteCopilotServiceJobRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteCopilotServiceJobResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteCopilotServiceJobRequestParameters>;

  constructor(parameters: msdyn_ExecuteCopilotServiceJobRequestParameters) {
    super("msdyn_ExecuteCopilotServiceJob", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteCopilotServiceJob`;

    const body = requestBody({
      msdyn_AuthFlowType: this.Parameters.msdyn_AuthFlowType,
      msdyn_JobPayload: this.Parameters.msdyn_JobPayload,
      msdyn_JobType: this.Parameters.msdyn_JobType,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteCopilotServiceJobResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ExecuteCopilotServiceJobResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExecuteCopilotServiceJob action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteCopilotServiceJobResult {
  "@odata.context"?: string;
  msdyn_Response: string;
}

/**
 * msdyn_ExecuteCopilotServiceJob response message
 *
 * `result` is the value the msdyn_ExecuteCopilotServiceJob action returns (see {@link msdyn_ExecuteCopilotServiceJobResult}).
 */
export class msdyn_ExecuteCopilotServiceJobResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteCopilotServiceJobResult) {
    super("msdyn_ExecuteCopilotServiceJob");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExecuteCopilotServiceJobResponse {
    return new msdyn_ExecuteCopilotServiceJobResponse(data as msdyn_ExecuteCopilotServiceJobResult);
  }
}
