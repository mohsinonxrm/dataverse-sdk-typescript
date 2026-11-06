import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetHierarchyData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetHierarchyDataRequestParameters {
  input: string;
}

/**
 * msdyn_GetHierarchyData request message
 *
 * Web API Action: msdyn_GetHierarchyData
 */
export class msdyn_GetHierarchyDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetHierarchyDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetHierarchyDataRequestParameters>;

  constructor(parameters: msdyn_GetHierarchyDataRequestParameters) {
    super("msdyn_GetHierarchyData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetHierarchyData`;

    const body = requestBody({
      input: this.Parameters.input,
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

  async parseResponse(response: Response): Promise<msdyn_GetHierarchyDataResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetHierarchyDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetHierarchyData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetHierarchyDataResult {
  "@odata.context"?: string;
  output: string;
}

/**
 * msdyn_GetHierarchyData response message
 *
 * `result` is the value the msdyn_GetHierarchyData action returns (see {@link msdyn_GetHierarchyDataResult}).
 */
export class msdyn_GetHierarchyDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetHierarchyDataResult) {
    super("msdyn_GetHierarchyData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetHierarchyDataResponse {
    return new msdyn_GetHierarchyDataResponse(data as msdyn_GetHierarchyDataResult);
  }
}
