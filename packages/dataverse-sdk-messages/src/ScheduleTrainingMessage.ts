import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ScheduleTrainingResponse as ScheduleTrainingResponseData } from "./types/index.js";

/**
 * Parameters of the ScheduleTraining message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ScheduleTrainingRequestParameters {
  version: string;
}

/**
 * ScheduleTraining request message
 *
 * Web API Action: ScheduleTraining
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class ScheduleTrainingRequest
  extends OrganizationRequest
  implements Executable<ScheduleTrainingResponse>
{
  declare readonly Parameters: Readonly<ScheduleTrainingRequestParameters>;

  constructor(
    public msdyn_aiconfigurationId: string,
    parameters: ScheduleTrainingRequestParameters
  ) {
    super("ScheduleTraining", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.ScheduleTraining`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<ScheduleTrainingResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return ScheduleTrainingResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * ScheduleTraining response message
 */
export class ScheduleTrainingResponse extends OrganizationResponse {
  constructor(public result: ScheduleTrainingResponseData) {
    super("ScheduleTraining");
  }

  static fromResponse(data: unknown): ScheduleTrainingResponse {
    return new ScheduleTrainingResponse(responseObject<ScheduleTrainingResponseData>(data));
  }
}
