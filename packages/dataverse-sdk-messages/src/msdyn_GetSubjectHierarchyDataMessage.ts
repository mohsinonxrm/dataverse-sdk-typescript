import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSubjectHierarchyDataResponse as msdyn_GetSubjectHierarchyDataResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSubjectHierarchyDataResponse.fromResponse({});
    return msdyn_GetSubjectHierarchyDataResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetSubjectHierarchyData response message
 */
export class msdyn_GetSubjectHierarchyDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSubjectHierarchyDataResponseData) {
    super("msdyn_GetSubjectHierarchyData");
  }

  static fromResponse(data: unknown): msdyn_GetSubjectHierarchyDataResponse {
    return new msdyn_GetSubjectHierarchyDataResponse(
      responseObject<msdyn_GetSubjectHierarchyDataResponseData>(data)
    );
  }
}
