import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ocsimltraining } from "./types/index.js";

/**
 * msdyn_CreateTrainConfig request message
 *
 * Web API Action: msdyn_CreateTrainConfig
 */
export class msdyn_CreateTrainConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateTrainConfigResponse>
{
  constructor(public msdyn_ocskillidentmlmodelId: string) {
    super("msdyn_CreateTrainConfig");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_CreateTrainConfig`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreateTrainConfigResponse> {
    const data = await response.json();
    return msdyn_CreateTrainConfigResponse.fromResponse(data);
  }
}

/**
 * msdyn_CreateTrainConfig response message
 */
export class msdyn_CreateTrainConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_ocsimltraining) {
    super("msdyn_CreateTrainConfig");
  }

  static fromResponse(data: unknown): msdyn_CreateTrainConfigResponse {
    return new msdyn_CreateTrainConfigResponse(responseObject<msdyn_ocsimltraining>(data));
  }
}
