import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse as msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponseData } from "./types/index.js";

/**
 * msdyn_CSAdminCenterAppSolutionHealthRulesRegistration request message
 *
 * Web API Action: msdyn_CSAdminCenterAppSolutionHealthRulesRegistration
 */
export class msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse>
{
  constructor(public solutionNames?: string) {
    super("msdyn_CSAdminCenterAppSolutionHealthRulesRegistration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSAdminCenterAppSolutionHealthRulesRegistration`;

    const body: Record<string, unknown> = {
      SolutionNames: this.solutionNames,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse> {
    const data = await response.json();
    return msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse.fromResponse(data);
  }
}

/**
 * msdyn_CSAdminCenterAppSolutionHealthRulesRegistration response message
 */
export class msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponseData) {
    super("msdyn_CSAdminCenterAppSolutionHealthRulesRegistration");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse {
    return new msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse(
      responseObject<msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponseData>(data)
    );
  }
}
