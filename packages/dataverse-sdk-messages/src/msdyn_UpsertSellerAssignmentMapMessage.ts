import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpsertSellerAssignmentMapResponse as msdyn_UpsertSellerAssignmentMapResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UpsertSellerAssignmentMap message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpsertSellerAssignmentMapRequestParameters {
  SellerAssignmentMapArray: string;
}

/**
 * msdyn_UpsertSellerAssignmentMap request message
 *
 * Web API Action: msdyn_UpsertSellerAssignmentMap
 */
export class msdyn_UpsertSellerAssignmentMapRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpsertSellerAssignmentMapResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpsertSellerAssignmentMapRequestParameters>;

  constructor(parameters: msdyn_UpsertSellerAssignmentMapRequestParameters) {
    super("msdyn_UpsertSellerAssignmentMap", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpsertSellerAssignmentMap`;

    const body = requestBody({
      SellerAssignmentMapArray: this.Parameters.SellerAssignmentMapArray,
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

  async parseResponse(response: Response): Promise<msdyn_UpsertSellerAssignmentMapResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_UpsertSellerAssignmentMapResponse.fromResponse({});
    return msdyn_UpsertSellerAssignmentMapResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_UpsertSellerAssignmentMap response message
 */
export class msdyn_UpsertSellerAssignmentMapResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpsertSellerAssignmentMapResponseData) {
    super("msdyn_UpsertSellerAssignmentMap");
  }

  static fromResponse(data: unknown): msdyn_UpsertSellerAssignmentMapResponse {
    return new msdyn_UpsertSellerAssignmentMapResponse(
      responseObject<msdyn_UpsertSellerAssignmentMapResponseData>(data)
    );
  }
}
