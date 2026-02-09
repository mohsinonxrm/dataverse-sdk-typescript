import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_UpsertSellerAssignmentMapResponse> {
    const data = await response.json();
    return msdyn_UpsertSellerAssignmentMapResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SellerAssignmentMapArray: this.sellerAssignmentMapArray,
    };
  }
}

/**
 * msdyn_UpsertSellerAssignmentMap response message
 */
export class msdyn_UpsertSellerAssignmentMapResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpsertSellerAssignmentMapResponse) {
    super("msdyn_UpsertSellerAssignmentMap");
  }

  static fromResponse(data: unknown): msdyn_UpsertSellerAssignmentMapResponse {
    return new msdyn_UpsertSellerAssignmentMapResponse((data as any).value);
  }
}
