import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckForCustomizedAppModule request message
 *
 * Web API Action: msdyn_CheckForCustomizedAppModule
 */
export class msdyn_CheckForCustomizedAppModuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForCustomizedAppModuleResponse>
{
  constructor(
    public entityIds: string,
    public solutionId: string,
    public excludeSolutionIds: string
  ) {
    super("msdyn_CheckForCustomizedAppModule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedAppModule`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      SolutionId: this.solutionId,
      ExcludeSolutionIds: this.excludeSolutionIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedAppModuleResponse> {
    const data = await response.json();
    return msdyn_CheckForCustomizedAppModuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityIds: this.entityIds,
      SolutionId: this.solutionId,
      ExcludeSolutionIds: this.excludeSolutionIds,
    };
  }
}

/**
 * msdyn_CheckForCustomizedAppModule response message
 */
export class msdyn_CheckForCustomizedAppModuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForCustomizedAppModuleResponse) {
    super("msdyn_CheckForCustomizedAppModule");
  }

  static fromResponse(data: unknown): msdyn_CheckForCustomizedAppModuleResponse {
    return new msdyn_CheckForCustomizedAppModuleResponse((data as any).value);
  }
}
