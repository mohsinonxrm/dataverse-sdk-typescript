import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSubjectHierarchyData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSubjectHierarchyDataRequestParameters {
  input: string;
}

/**
 * msdyn_GetSubjectHierarchyData request message
 *
 * Web API Action: msdyn_GetSubjectHierarchyData
 */
export class msdyn_GetSubjectHierarchyDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSubjectHierarchyDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSubjectHierarchyDataRequestParameters>;

  constructor(parameters: msdyn_GetSubjectHierarchyDataRequestParameters) {
    super("msdyn_GetSubjectHierarchyData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSubjectHierarchyData`;

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

  async parseResponse(response: Response): Promise<msdyn_GetSubjectHierarchyDataResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSubjectHierarchyDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSubjectHierarchyData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSubjectHierarchyDataResult {
  "@odata.context"?: string;
  output: string;
}

/**
 * msdyn_GetSubjectHierarchyData response message
 *
 * `result` is the value the msdyn_GetSubjectHierarchyData action returns (see {@link msdyn_GetSubjectHierarchyDataResult}).
 */
export class msdyn_GetSubjectHierarchyDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSubjectHierarchyDataResult) {
    super("msdyn_GetSubjectHierarchyData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSubjectHierarchyDataResponse {
    return new msdyn_GetSubjectHierarchyDataResponse(data as msdyn_GetSubjectHierarchyDataResult);
  }
}
