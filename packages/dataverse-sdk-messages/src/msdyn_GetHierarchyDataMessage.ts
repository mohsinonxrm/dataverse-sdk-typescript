import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetHierarchyDataResponse as msdyn_GetHierarchyDataResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetHierarchyDataResponse.fromResponse({});
    return msdyn_GetHierarchyDataResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetHierarchyData response message
 */
export class msdyn_GetHierarchyDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetHierarchyDataResponseData) {
    super("msdyn_GetHierarchyData");
  }

  static fromResponse(data: unknown): msdyn_GetHierarchyDataResponse {
    return new msdyn_GetHierarchyDataResponse(
      responseObject<msdyn_GetHierarchyDataResponseData>(data)
    );
  }
}
