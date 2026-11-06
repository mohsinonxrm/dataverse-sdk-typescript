import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ScheduleRetrainResponse as ScheduleRetrainResponseData } from "./types/index.js";

/**
 * Parameters of the ScheduleRetrain message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ScheduleRetrainRequestParameters {
  recurrence: string;
  version: string;
}

/**
 * ScheduleRetrain request message
 *
 * Web API Action: ScheduleRetrain
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class ScheduleRetrainRequest
  extends OrganizationRequest
  implements Executable<ScheduleRetrainResponse>
{
  declare readonly Parameters: Readonly<ScheduleRetrainRequestParameters>;

  constructor(
    public msdyn_aimodelId: string,
    parameters: ScheduleRetrainRequestParameters
  ) {
    super("ScheduleRetrain", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.ScheduleRetrain`;

    const body = requestBody({
      recurrence: this.Parameters.recurrence,
      version: this.Parameters.version,
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

  async parseResponse(response: Response): Promise<ScheduleRetrainResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return ScheduleRetrainResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * ScheduleRetrain response message
 */
export class ScheduleRetrainResponse extends OrganizationResponse {
  constructor(public result: ScheduleRetrainResponseData) {
    super("ScheduleRetrain");
  }

  static fromResponse(data: unknown): ScheduleRetrainResponse {
    return new ScheduleRetrainResponse(responseObject<ScheduleRetrainResponseData>(data));
  }
}
