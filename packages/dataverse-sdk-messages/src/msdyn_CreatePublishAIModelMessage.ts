import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_CreatePublishAIModelResponse as msdyn_CreatePublishAIModelResponseData,
  msdyn_ocsimltraining,
} from "./types/index.js";

/**
 * msdyn_CreatePublishAIModel request message
 *
 * Web API Action: msdyn_CreatePublishAIModel
 */
export class msdyn_CreatePublishAIModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreatePublishAIModelResponse>
{
  constructor(
    public msdyn_ocskillidentmlmodelId: string,
    public ocsimltraining: EntityReference | EntityPayload<msdyn_ocsimltraining>
  ) {
    super("msdyn_CreatePublishAIModel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_CreatePublishAIModel`;

    const body: Record<string, unknown> = {
      ocsimltraining: this.ocsimltraining,
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

  async parseResponse(response: Response): Promise<msdyn_CreatePublishAIModelResponse> {
    const data = await response.json();
    return msdyn_CreatePublishAIModelResponse.fromResponse(data);
  }
}

/**
 * msdyn_CreatePublishAIModel response message
 */
export class msdyn_CreatePublishAIModelResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreatePublishAIModelResponseData) {
    super("msdyn_CreatePublishAIModel");
  }

  static fromResponse(data: unknown): msdyn_CreatePublishAIModelResponse {
    return new msdyn_CreatePublishAIModelResponse(
      responseObject<msdyn_CreatePublishAIModelResponseData>(data)
    );
  }
}
