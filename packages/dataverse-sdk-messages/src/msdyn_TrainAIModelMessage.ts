import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TrainAIModelResponse as msdyn_TrainAIModelResponseData } from "./types/index.js";

/**
 * msdyn_TrainAIModel request message
 *
 * Web API Action: msdyn_TrainAIModel
 */
export class msdyn_TrainAIModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_TrainAIModelResponse>
{
  constructor(public msdyn_ocskillidentmlmodelId: string) {
    super("msdyn_TrainAIModel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_TrainAIModel`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TrainAIModelResponse> {
    const data = await response.json();
    return msdyn_TrainAIModelResponse.fromResponse(data);
  }
}

/**
 * msdyn_TrainAIModel response message
 */
export class msdyn_TrainAIModelResponse extends OrganizationResponse {
  constructor(public result: msdyn_TrainAIModelResponseData) {
    super("msdyn_TrainAIModel");
  }

  static fromResponse(data: unknown): msdyn_TrainAIModelResponse {
    return new msdyn_TrainAIModelResponse(responseObject<msdyn_TrainAIModelResponseData>(data));
  }
}
