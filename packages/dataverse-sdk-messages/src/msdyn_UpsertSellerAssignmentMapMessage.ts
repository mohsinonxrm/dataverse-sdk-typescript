import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_UpsertSellerAssignmentMapResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpsertSellerAssignmentMap action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpsertSellerAssignmentMapResult {
  "@odata.context"?: string;
  Error: string;
  UpdatedSellerAssignmentMaps: string;
}

/**
 * msdyn_UpsertSellerAssignmentMap response message
 *
 * `result` is the value the msdyn_UpsertSellerAssignmentMap action returns (see {@link msdyn_UpsertSellerAssignmentMapResult}).
 */
export class msdyn_UpsertSellerAssignmentMapResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpsertSellerAssignmentMapResult) {
    super("msdyn_UpsertSellerAssignmentMap");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpsertSellerAssignmentMapResponse {
    return new msdyn_UpsertSellerAssignmentMapResponse(
      data as msdyn_UpsertSellerAssignmentMapResult
    );
  }
}
