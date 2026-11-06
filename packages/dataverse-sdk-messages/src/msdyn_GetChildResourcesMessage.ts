import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetChildResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetChildResourcesRequestParameters {
  ResourceIds: string;
  UfxParameter: string;
}

/**
 * msdyn_GetChildResources request message
 *
 * Web API Action: msdyn_GetChildResources
 */
export class msdyn_GetChildResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetChildResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetChildResourcesRequestParameters>;

  constructor(parameters: msdyn_GetChildResourcesRequestParameters) {
    super("msdyn_GetChildResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetChildResources`;

    const body = requestBody({
      ResourceIds: this.Parameters.ResourceIds,
      UfxParameter: this.Parameters.UfxParameter,
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

  async parseResponse(response: Response): Promise<msdyn_GetChildResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetChildResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetChildResources action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetChildResourcesResult {
  "@odata.context"?: string;
  ChildResources: string;
}

/**
 * msdyn_GetChildResources response message
 *
 * `result` is the value the msdyn_GetChildResources action returns (see {@link msdyn_GetChildResourcesResult}).
 */
export class msdyn_GetChildResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetChildResourcesResult) {
    super("msdyn_GetChildResources");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetChildResourcesResponse {
    return new msdyn_GetChildResourcesResponse(data as msdyn_GetChildResourcesResult);
  }
}
