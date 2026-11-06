import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_PublishEffortAIModelResponse as msdyn_PublishEffortAIModelResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_PublishEffortAIModel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PublishEffortAIModelRequestParameters {
  AiModelId: string;
  TrainConfigId: string;
}

/**
 * msdyn_PublishEffortAIModel request message
 *
 * Web API Action: msdyn_PublishEffortAIModel
 */
export class msdyn_PublishEffortAIModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_PublishEffortAIModelResponse>
{
  declare readonly Parameters: Readonly<msdyn_PublishEffortAIModelRequestParameters>;

  constructor(parameters: msdyn_PublishEffortAIModelRequestParameters) {
    super("msdyn_PublishEffortAIModel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PublishEffortAIModel`;

    const body = requestBody({
      AiModelId: this.Parameters.AiModelId,
      TrainConfigId: this.Parameters.TrainConfigId,
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

  async parseResponse(response: Response): Promise<msdyn_PublishEffortAIModelResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_PublishEffortAIModelResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_PublishEffortAIModel response message
 */
export class msdyn_PublishEffortAIModelResponse extends OrganizationResponse {
  constructor(public result: msdyn_PublishEffortAIModelResponseData) {
    super("msdyn_PublishEffortAIModel");
  }

  static fromResponse(data: unknown): msdyn_PublishEffortAIModelResponse {
    return new msdyn_PublishEffortAIModelResponse(
      responseObject<msdyn_PublishEffortAIModelResponseData>(data)
    );
  }
}
