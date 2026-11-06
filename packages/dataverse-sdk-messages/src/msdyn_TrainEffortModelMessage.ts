import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TrainEffortModelResponse as msdyn_TrainEffortModelResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TrainEffortModel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TrainEffortModelRequestParameters {
  TrainConfig: string;
}

/**
 * msdyn_TrainEffortModel request message
 *
 * Web API Action: msdyn_TrainEffortModel
 */
export class msdyn_TrainEffortModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_TrainEffortModelResponse>
{
  declare readonly Parameters: Readonly<msdyn_TrainEffortModelRequestParameters>;

  constructor(parameters: msdyn_TrainEffortModelRequestParameters) {
    super("msdyn_TrainEffortModel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TrainEffortModel`;

    const body = requestBody({
      TrainConfig: this.Parameters.TrainConfig,
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

  async parseResponse(response: Response): Promise<msdyn_TrainEffortModelResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_TrainEffortModelResponse.fromResponse(text ? JSON.parse(text) : {});
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
