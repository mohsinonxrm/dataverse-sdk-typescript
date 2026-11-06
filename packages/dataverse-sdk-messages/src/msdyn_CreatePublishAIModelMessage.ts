import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_CreatePublishAIModelResponse as msdyn_CreatePublishAIModelResponseData,
  msdyn_ocsimltraining,
} from "./types/index.js";

/**
 * Parameters of the msdyn_CreatePublishAIModel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreatePublishAIModelRequestParameters {
  ocsimltraining: EntityReference | EntityPayload<msdyn_ocsimltraining>;
}

/**
 * msdyn_CreatePublishAIModel request message
 *
 * Web API Action: msdyn_CreatePublishAIModel
 *
 * The first argument is the id of the msdyn_ocskillidentmlmodel record to call it on.
 */
export class msdyn_CreatePublishAIModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreatePublishAIModelResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreatePublishAIModelRequestParameters>;

  constructor(
    public msdyn_ocskillidentmlmodelId: string,
    parameters: msdyn_CreatePublishAIModelRequestParameters
  ) {
    super("msdyn_CreatePublishAIModel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_CreatePublishAIModel`;

    const body = requestBody({
      ocsimltraining: this.Parameters.ocsimltraining,
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

  async parseResponse(response: Response): Promise<msdyn_CreatePublishAIModelResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreatePublishAIModelResponse.fromResponse({});
    return msdyn_CreatePublishAIModelResponse.fromResponse(await response.json());
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
