import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_getCTandEACdisabledEntitiesResponse as msdyn_getCTandEACdisabledEntitiesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_getCTandEACdisabledEntities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getCTandEACdisabledEntitiesRequestParameters {
  msdyn_entityList: string;
  msdyn_entityName: string;
}

/**
 * msdyn_getCTandEACdisabledEntities request message
 *
 * Web API Action: msdyn_getCTandEACdisabledEntities
 */
export class msdyn_getCTandEACdisabledEntitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_getCTandEACdisabledEntitiesResponse>
{
  declare readonly Parameters: Readonly<msdyn_getCTandEACdisabledEntitiesRequestParameters>;

  constructor(parameters: msdyn_getCTandEACdisabledEntitiesRequestParameters) {
    super("msdyn_getCTandEACdisabledEntities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getCTandEACdisabledEntities`;

    const body = requestBody({
      msdyn_entityList: this.Parameters.msdyn_entityList,
      msdyn_entityName: this.Parameters.msdyn_entityName,
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

  async parseResponse(response: Response): Promise<msdyn_getCTandEACdisabledEntitiesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_getCTandEACdisabledEntitiesResponse.fromResponse({});
    return msdyn_getCTandEACdisabledEntitiesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_getCTandEACdisabledEntities response message
 */
export class msdyn_getCTandEACdisabledEntitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_getCTandEACdisabledEntitiesResponseData) {
    super("msdyn_getCTandEACdisabledEntities");
  }

  static fromResponse(data: unknown): msdyn_getCTandEACdisabledEntitiesResponse {
    return new msdyn_getCTandEACdisabledEntitiesResponse(
      responseObject<msdyn_getCTandEACdisabledEntitiesResponseData>(data)
    );
  }
}
