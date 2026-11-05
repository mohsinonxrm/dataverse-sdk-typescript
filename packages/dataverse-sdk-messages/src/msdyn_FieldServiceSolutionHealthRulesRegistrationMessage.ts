import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FieldServiceSolutionHealthRulesRegistrationResponse as msdyn_FieldServiceSolutionHealthRulesRegistrationResponseData } from "./types/index.js";

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
        "content-type": "application/json",
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
}

/**
 * msdyn_FieldServiceSolutionHealthRulesRegistration response message
 */
export class msdyn_FieldServiceSolutionHealthRulesRegistrationResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceSolutionHealthRulesRegistrationResponseData) {
    super("msdyn_FieldServiceSolutionHealthRulesRegistration");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceSolutionHealthRulesRegistrationResponse {
    return new msdyn_FieldServiceSolutionHealthRulesRegistrationResponse(
      responseObject<msdyn_FieldServiceSolutionHealthRulesRegistrationResponseData>(data)
    );
  }
}
