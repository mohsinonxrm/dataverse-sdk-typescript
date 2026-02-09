import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateRequirementDemand request message
 *
 * Web API Action: msdyn_UpdateRequirementDemand
 */
export class msdyn_UpdateRequirementDemandRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateRequirementDemandResponse>
{
  constructor(public requirementDemandContext: string) {
    super("msdyn_UpdateRequirementDemand");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRequirementDemand`;

    const body: Record<string, unknown> = {
      RequirementDemandContext: this.requirementDemandContext,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateRequirementDemandResponse> {
    const data = await response.json();
    return msdyn_UpdateRequirementDemandResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RequirementDemandContext: this.requirementDemandContext,
    };
  }
}

/**
 * msdyn_UpdateRequirementDemand response message
 */
export class msdyn_UpdateRequirementDemandResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateRequirementDemandResponse) {
    super("msdyn_UpdateRequirementDemand");
  }

  static fromResponse(data: unknown): msdyn_UpdateRequirementDemandResponse {
    return new msdyn_UpdateRequirementDemandResponse((data as any).value);
  }
}
