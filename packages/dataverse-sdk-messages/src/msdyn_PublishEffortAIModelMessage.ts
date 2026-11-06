import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_PublishEffortAIModelResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_PublishEffortAIModel action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_PublishEffortAIModelResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_PublishEffortAIModel response message
 *
 * `result` is the value the msdyn_PublishEffortAIModel action returns (see {@link msdyn_PublishEffortAIModelResult}).
 */
export class msdyn_PublishEffortAIModelResponse extends OrganizationResponse {
  constructor(public result: msdyn_PublishEffortAIModelResult) {
    super("msdyn_PublishEffortAIModel");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_PublishEffortAIModelResponse {
    return new msdyn_PublishEffortAIModelResponse(data as msdyn_PublishEffortAIModelResult);
  }
}
