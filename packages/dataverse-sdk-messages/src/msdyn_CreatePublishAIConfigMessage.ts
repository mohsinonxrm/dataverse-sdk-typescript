import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_CreatePublishAIConfigResponse as msdyn_CreatePublishAIConfigResponseData,
  msdyn_ocsimltraining,
} from "./types/index.js";

/**
 * msdyn_CreatePublishAIConfig request message
 *
 * Web API Action: msdyn_CreatePublishAIConfig
 */
export class msdyn_CreatePublishAIConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreatePublishAIConfigResponse>
{
  constructor(
    public msdyn_ocskillidentmlmodelId: string,
    public ocsimltraining: EntityReference | EntityPayload<msdyn_ocsimltraining>
  ) {
    super("msdyn_CreatePublishAIConfig");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_CreatePublishAIConfig`;

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

  async parseResponse(response: Response): Promise<msdyn_CreatePublishAIConfigResponse> {
    const data = await response.json();
    return msdyn_CreatePublishAIConfigResponse.fromResponse(data);
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
