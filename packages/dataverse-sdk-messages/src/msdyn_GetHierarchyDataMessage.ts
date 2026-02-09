import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetHierarchyDataResponse> {
    const data = await response.json();
    return msdyn_GetHierarchyDataResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      input: this.input,
    };
  }
}

/**
 * msdyn_GetHierarchyData response message
 */
export class msdyn_GetHierarchyDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetHierarchyDataResponse) {
    super("msdyn_GetHierarchyData");
  }

  static fromResponse(data: unknown): msdyn_GetHierarchyDataResponse {
    return new msdyn_GetHierarchyDataResponse((data as any).value);
  }
}
