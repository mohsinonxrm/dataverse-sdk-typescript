import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetRequirementDemand request message
 *
 * Web API Action: msdyn_GetRequirementDemand
 */
export class msdyn_GetRequirementDemandRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementDemandResponse>
{
  constructor(public requirementIds: string) {
    super("msdyn_GetRequirementDemand");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDemand`;

    const body: Record<string, unknown> = {
      RequirementIds: this.requirementIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDemandResponse> {
    const data = await response.json();
    return msdyn_GetRequirementDemandResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RequirementIds: this.requirementIds,
    };
  }
}

/**
 * msdyn_GetRequirementDemand response message
 */
export class msdyn_GetRequirementDemandResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementDemandResponse) {
    super("msdyn_GetRequirementDemand");
  }

  static fromResponse(data: unknown): msdyn_GetRequirementDemandResponse {
    return new msdyn_GetRequirementDemandResponse((data as any).value);
  }
}
