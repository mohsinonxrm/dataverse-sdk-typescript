import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSalesAcceleratedSeller message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesAcceleratedSellerRequestParameters {
  IsTeamsRequest: boolean;
  ExpandDetails?: boolean;
}

/**
 * msdyn_GetSalesAcceleratedSeller request message
 *
 * Web API Action: msdyn_GetSalesAcceleratedSeller
 */
export class msdyn_GetSalesAcceleratedSellerRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesAcceleratedSellerResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSalesAcceleratedSellerRequestParameters>;

  constructor(parameters: msdyn_GetSalesAcceleratedSellerRequestParameters) {
    super("msdyn_GetSalesAcceleratedSeller", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesAcceleratedSeller`;

    const body = requestBody({
      IsTeamsRequest: this.Parameters.IsTeamsRequest,
      ExpandDetails: this.Parameters.ExpandDetails,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesAcceleratedSellerResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return msdyn_GetSalesAcceleratedSellerResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_GetSalesAcceleratedSellerResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSalesAcceleratedSeller action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetSalesAcceleratedSellerResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_GetSalesAcceleratedSeller response message
 *
 * `result` is the value the msdyn_GetSalesAcceleratedSeller action returns (see {@link msdyn_GetSalesAcceleratedSellerResult}).
 */
export class msdyn_GetSalesAcceleratedSellerResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesAcceleratedSellerResult) {
    super("msdyn_GetSalesAcceleratedSeller");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSalesAcceleratedSellerResponse {
    return new msdyn_GetSalesAcceleratedSellerResponse(
      data === undefined ? [] : (data as { value: msdyn_GetSalesAcceleratedSellerResult }).value
    );
  }
}
