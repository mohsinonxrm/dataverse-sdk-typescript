import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { UnscheduleTrainingResponse as UnscheduleTrainingResponseData } from "./types/index.js";

/**
 * Parameters of the UnscheduleTraining message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnscheduleTrainingRequestParameters {
  version: string;
}

/**
 * UnscheduleTraining request message
 *
 * Web API Action: UnscheduleTraining
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class UnscheduleTrainingRequest
  extends OrganizationRequest
  implements Executable<UnscheduleTrainingResponse>
{
  declare readonly Parameters: Readonly<UnscheduleTrainingRequestParameters>;

  constructor(
    public msdyn_aiconfigurationId: string,
    parameters: UnscheduleTrainingRequestParameters
  ) {
    super("UnscheduleTraining", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.UnscheduleTraining`;

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

  async parseResponse(response: Response): Promise<UnscheduleTrainingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return UnscheduleTrainingResponse.fromResponse({});
    return UnscheduleTrainingResponse.fromResponse(await response.json());
  }
}

/**
 * UnscheduleTraining response message
 */
export class UnscheduleTrainingResponse extends OrganizationResponse {
  constructor(public result: UnscheduleTrainingResponseData) {
    super("UnscheduleTraining");
  }

  static fromResponse(data: unknown): UnscheduleTrainingResponse {
    return new UnscheduleTrainingResponse(responseObject<UnscheduleTrainingResponseData>(data));
  }
}
