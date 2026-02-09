import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FieldServiceSolutionHealthRulesRegistration request message
 *
 * Web API Action: msdyn_FieldServiceSolutionHealthRulesRegistration
 */
export class msdyn_FieldServiceSolutionHealthRulesRegistrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceSolutionHealthRulesRegistrationResponse>
{
  constructor(public solutionNames: string) {
    super("msdyn_FieldServiceSolutionHealthRulesRegistration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FieldServiceSolutionHealthRulesRegistration`;

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
  ): Promise<msdyn_FieldServiceSolutionHealthRulesRegistrationResponse> {
    const data = await response.json();
    return msdyn_FieldServiceSolutionHealthRulesRegistrationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionNames: this.solutionNames,
    };
  }
}

/**
 * msdyn_FieldServiceSolutionHealthRulesRegistration response message
 */
export class msdyn_FieldServiceSolutionHealthRulesRegistrationResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceSolutionHealthRulesRegistrationResponse) {
    super("msdyn_FieldServiceSolutionHealthRulesRegistration");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceSolutionHealthRulesRegistrationResponse {
    return new msdyn_FieldServiceSolutionHealthRulesRegistrationResponse((data as any).value);
  }
}
