import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_UpsertSellerAssignmentMapResponse as msdyn_UpsertSellerAssignmentMapResponseData } from "./types/index.js";

/**
 * msdyn_UpsertSellerAssignmentMap request message
 *
 * Web API Action: msdyn_UpsertSellerAssignmentMap
 */
export class msdyn_UpsertSellerAssignmentMapRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpsertSellerAssignmentMapResponse>
{
  constructor(public sellerAssignmentMapArray: string) {
    super("msdyn_UpsertSellerAssignmentMap");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpsertSellerAssignmentMap`;

    const body: Record<string, unknown> = {
      SellerAssignmentMapArray: this.sellerAssignmentMapArray,
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

  async parseResponse(response: Response): Promise<msdyn_UpsertSellerAssignmentMapResponse> {
    const data = await response.json();
    return msdyn_UpsertSellerAssignmentMapResponse.fromResponse(data);
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
