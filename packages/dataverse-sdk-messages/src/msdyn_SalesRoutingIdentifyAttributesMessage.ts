import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesRoutingIdentifyAttributes request message
 *
 * Web API Action: msdyn_SalesRoutingIdentifyAttributes
 */
export class msdyn_SalesRoutingIdentifyAttributesRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesRoutingIdentifyAttributesResponse>
{
  constructor() {
    super("msdyn_SalesRoutingIdentifyAttributes");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesRoutingIdentifyAttributes`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesRoutingIdentifyAttributesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesRoutingIdentifyAttributesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesRoutingIdentifyAttributes action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesRoutingIdentifyAttributesResult {
  "@odata.context"?: string;
  JobId: string;
  JobStatus: boolean;
}

/**
 * msdyn_SalesRoutingIdentifyAttributes response message
 *
 * `result` is the value the msdyn_SalesRoutingIdentifyAttributes action returns (see {@link msdyn_SalesRoutingIdentifyAttributesResult}).
 */
export class msdyn_SalesRoutingIdentifyAttributesResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesRoutingIdentifyAttributesResult) {
    super("msdyn_SalesRoutingIdentifyAttributes");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesRoutingIdentifyAttributesResponse {
    return new msdyn_SalesRoutingIdentifyAttributesResponse(
      data as msdyn_SalesRoutingIdentifyAttributesResult
    );
  }
}
