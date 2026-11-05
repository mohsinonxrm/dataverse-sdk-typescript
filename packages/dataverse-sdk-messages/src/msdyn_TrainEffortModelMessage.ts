import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TrainEffortModelResponse as msdyn_TrainEffortModelResponseData } from "./types/index.js";

/**
 * msdyn_TrainEffortModel request message
 *
 * Web API Action: msdyn_TrainEffortModel
 */
export class msdyn_TrainEffortModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_TrainEffortModelResponse>
{
  constructor(public trainConfig: string) {
    super("msdyn_TrainEffortModel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TrainEffortModel`;

    const body: Record<string, unknown> = {
      TrainConfig: this.trainConfig,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TrainEffortModelResponse> {
    const data = await response.json();
    return msdyn_TrainEffortModelResponse.fromResponse(data);
  }
}

/**
 * msdyn_TrainEffortModel response message
 */
export class msdyn_TrainEffortModelResponse extends OrganizationResponse {
  constructor(public result: msdyn_TrainEffortModelResponseData) {
    super("msdyn_TrainEffortModel");
  }

  static fromResponse(data: unknown): msdyn_TrainEffortModelResponse {
    return new msdyn_TrainEffortModelResponse(
      responseObject<msdyn_TrainEffortModelResponseData>(data)
    );
  }
}
