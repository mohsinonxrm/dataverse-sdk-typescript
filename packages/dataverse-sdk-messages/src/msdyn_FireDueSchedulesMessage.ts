import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FireDueSchedulesResponse as msdyn_FireDueSchedulesResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_FireDueSchedulesResponse.fromResponse({});
    return msdyn_FireDueSchedulesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_FireDueSchedules response message
 */
export class msdyn_FireDueSchedulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_FireDueSchedulesResponseData) {
    super("msdyn_FireDueSchedules");
  }

  static fromResponse(data: unknown): msdyn_FireDueSchedulesResponse {
    return new msdyn_FireDueSchedulesResponse(
      responseObject<msdyn_FireDueSchedulesResponseData>(data)
    );
  }
}
