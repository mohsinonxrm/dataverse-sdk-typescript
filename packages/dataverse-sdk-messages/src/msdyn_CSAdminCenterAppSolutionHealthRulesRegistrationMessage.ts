import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CSAdminCenterAppSolutionHealthRulesRegistration request message
 *
 * Web API Action: msdyn_CSAdminCenterAppSolutionHealthRulesRegistration
 */
export class msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse>
{
  constructor(public solutionNames: string) {
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
        "Content-Type": "application/json",
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

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionNames: this.solutionNames,
    };
  }
}

/**
 * msdyn_CSAdminCenterAppSolutionHealthRulesRegistration response message
 */
export class msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse) {
    super("msdyn_CSAdminCenterAppSolutionHealthRulesRegistration");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse {
    return new msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse((data as any).value);
  }
}
