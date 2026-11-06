import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse as msdyn_CustomerServiceSolutionHealthRulesRegistrationResponseData } from "./types/index.js";

/**
 * msdyn_CustomerServiceSolutionHealthRulesRegistration request message
 *
 * Web API Action: msdyn_CustomerServiceSolutionHealthRulesRegistration
 */
export class msdyn_CustomerServiceSolutionHealthRulesRegistrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse>
{
  constructor(public solutionNames?: string) {
    super("msdyn_CustomerServiceSolutionHealthRulesRegistration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomerServiceSolutionHealthRulesRegistration`;

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
  ): Promise<msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse> {
    const data = await response.json();
    return msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse.fromResponse(data);
  }
}

/**
 * msdyn_CustomerServiceSolutionHealthRulesRegistration response message
 */
export class msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse extends OrganizationResponse {
  constructor(public result: msdyn_CustomerServiceSolutionHealthRulesRegistrationResponseData) {
    super("msdyn_CustomerServiceSolutionHealthRulesRegistration");
  }

  static fromResponse(data: unknown): msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse {
    return new msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse(
      responseObject<msdyn_CustomerServiceSolutionHealthRulesRegistrationResponseData>(data)
    );
  }
}
