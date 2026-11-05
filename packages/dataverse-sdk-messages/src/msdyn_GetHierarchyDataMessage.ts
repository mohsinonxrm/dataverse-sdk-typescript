import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetHierarchyDataResponse as msdyn_GetHierarchyDataResponseData } from "./types/index.js";

/**
 * msdyn_GetHierarchyData request message
 *
 * Web API Action: msdyn_GetHierarchyData
 */
export class msdyn_GetHierarchyDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetHierarchyDataResponse>
{
  constructor(public input: string) {
    super("msdyn_GetHierarchyData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetHierarchyData`;

    const body: Record<string, unknown> = {
      input: this.input,
    };

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
    const data = await response.json();
    return msdyn_GetHierarchyDataResponse.fromResponse(data);
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
