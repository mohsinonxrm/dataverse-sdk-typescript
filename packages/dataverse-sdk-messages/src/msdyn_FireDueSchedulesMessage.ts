import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_FireDueSchedules message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FireDueSchedulesRequestParameters {
  MaxSchedules?: number;
  WorkflowRunId?: string;
}

/**
 * msdyn_FireDueSchedules request message
 *
 * Web API Action: msdyn_FireDueSchedules
 */
export class msdyn_FireDueSchedulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_FireDueSchedulesResponse>
{
  declare readonly Parameters: Readonly<msdyn_FireDueSchedulesRequestParameters>;

  constructor(parameters: msdyn_FireDueSchedulesRequestParameters = {}) {
    super("msdyn_FireDueSchedules", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FireDueSchedules`;

    const body = requestBody({
      MaxSchedules: this.Parameters.MaxSchedules,
      WorkflowRunId: this.Parameters.WorkflowRunId,
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

  async parseResponse(response: Response): Promise<msdyn_FireDueSchedulesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_FireDueSchedulesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_FireDueSchedules action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FireDueSchedulesResult {
  "@odata.context"?: string;
  ResultJson: string;
}

/**
 * msdyn_FireDueSchedules response message
 *
 * `result` is the value the msdyn_FireDueSchedules action returns (see {@link msdyn_FireDueSchedulesResult}).
 */
export class msdyn_FireDueSchedulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_FireDueSchedulesResult) {
    super("msdyn_FireDueSchedules");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_FireDueSchedulesResponse {
    return new msdyn_FireDueSchedulesResponse(data as msdyn_FireDueSchedulesResult);
  }
}
