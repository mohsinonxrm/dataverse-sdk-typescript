import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSubjectHierarchyData request message
 *
 * Web API Action: msdyn_GetSubjectHierarchyData
 */
export class msdyn_GetSubjectHierarchyDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSubjectHierarchyDataResponse>
{
  constructor(public input: string) {
    super("msdyn_GetSubjectHierarchyData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSubjectHierarchyData`;

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

  async parseResponse(response: Response): Promise<msdyn_GetSubjectHierarchyDataResponse> {
    const data = await response.json();
    return msdyn_GetSubjectHierarchyDataResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      input: this.input,
    };
  }
}

/**
 * msdyn_GetSubjectHierarchyData response message
 */
export class msdyn_GetSubjectHierarchyDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSubjectHierarchyDataResponse) {
    super("msdyn_GetSubjectHierarchyData");
  }

  static fromResponse(data: unknown): msdyn_GetSubjectHierarchyDataResponse {
    return new msdyn_GetSubjectHierarchyDataResponse((data as any).value);
  }
}
