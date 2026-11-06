import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_CreatePublishAIConfigResponse as msdyn_CreatePublishAIConfigResponseData,
  msdyn_ocsimltraining,
} from "./types/index.js";

/**
 * Parameters of the msdyn_CreatePublishAIConfig message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreatePublishAIConfigRequestParameters {
  ocsimltraining: EntityReference | EntityPayload<msdyn_ocsimltraining>;
}

/**
 * msdyn_CreatePublishAIConfig request message
 *
 * Web API Action: msdyn_CreatePublishAIConfig
 *
 * The first argument is the id of the msdyn_ocskillidentmlmodel record to call it on.
 */
export class msdyn_CreatePublishAIConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreatePublishAIConfigResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreatePublishAIConfigRequestParameters>;

  constructor(
    public msdyn_ocskillidentmlmodelId: string,
    parameters: msdyn_CreatePublishAIConfigRequestParameters
  ) {
    super("msdyn_CreatePublishAIConfig", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_CreatePublishAIConfig`;

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

  async parseResponse(response: Response): Promise<msdyn_CreatePublishAIConfigResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreatePublishAIConfigResponse.fromResponse({});
    return msdyn_CreatePublishAIConfigResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreatePublishAIConfig response message
 */
export class msdyn_CreatePublishAIConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreatePublishAIConfigResponseData) {
    super("msdyn_CreatePublishAIConfig");
  }

  static fromResponse(data: unknown): msdyn_CreatePublishAIConfigResponse {
    return new msdyn_CreatePublishAIConfigResponse(
      responseObject<msdyn_CreatePublishAIConfigResponseData>(data)
    );
  }
}
