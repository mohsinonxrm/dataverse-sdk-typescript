import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_KnowledgeHarvestFetchDataResponse as msdyn_KnowledgeHarvestFetchDataResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_KnowledgeHarvestFetchData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_KnowledgeHarvestFetchDataRequestParameters {
  msdyn_additionalInformation?: string;
  msdyn_entityName: string;
  msdyn_entityId: string;
}

/**
 * msdyn_KnowledgeHarvestFetchData request message
 *
 * Web API Action: msdyn_KnowledgeHarvestFetchData
 */
export class msdyn_KnowledgeHarvestFetchDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_KnowledgeHarvestFetchDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_KnowledgeHarvestFetchDataRequestParameters>;

  constructor(parameters: msdyn_KnowledgeHarvestFetchDataRequestParameters) {
    super("msdyn_KnowledgeHarvestFetchData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_KnowledgeHarvestFetchData`;

    const body = requestBody({
      msdyn_additionalInformation: this.Parameters.msdyn_additionalInformation,
      msdyn_entityName: this.Parameters.msdyn_entityName,
      msdyn_entityId: this.Parameters.msdyn_entityId,
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

  async parseResponse(response: Response): Promise<msdyn_KnowledgeHarvestFetchDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_KnowledgeHarvestFetchDataResponse.fromResponse({});
    return msdyn_KnowledgeHarvestFetchDataResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_KnowledgeHarvestFetchData response message
 */
export class msdyn_KnowledgeHarvestFetchDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_KnowledgeHarvestFetchDataResponseData) {
    super("msdyn_KnowledgeHarvestFetchData");
  }

  static fromResponse(data: unknown): msdyn_KnowledgeHarvestFetchDataResponse {
    return new msdyn_KnowledgeHarvestFetchDataResponse(
      responseObject<msdyn_KnowledgeHarvestFetchDataResponseData>(data)
    );
  }
}
