import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourcesRequestParameters {
  Page: number;
  PageSize: number;
  QueryString: string;
}

/**
 * msdyn_GetResources request message
 *
 * Web API Action: msdyn_GetResources
 */
export class msdyn_GetResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetResourcesRequestParameters>;

  constructor(parameters: msdyn_GetResourcesRequestParameters) {
    super("msdyn_GetResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResources`;

    const body = requestBody({
      Page: this.Parameters.Page,
      PageSize: this.Parameters.PageSize,
      QueryString: this.Parameters.QueryString,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetResources action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourcesResult {
  "@odata.context"?: string;
  ResourceData: string;
}

/**
 * msdyn_GetResources response message
 *
 * `result` is the value the msdyn_GetResources action returns (see {@link msdyn_GetResourcesResult}).
 */
export class msdyn_GetResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourcesResult) {
    super("msdyn_GetResources");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetResourcesResponse {
    return new msdyn_GetResourcesResponse(data as msdyn_GetResourcesResult);
  }
}
