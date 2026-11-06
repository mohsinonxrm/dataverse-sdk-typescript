import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CustomerServiceSolutionHealthRulesRegistration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CustomerServiceSolutionHealthRulesRegistrationRequestParameters {
  SolutionNames?: string;
}

/**
 * msdyn_CustomerServiceSolutionHealthRulesRegistration request message
 *
 * Web API Action: msdyn_CustomerServiceSolutionHealthRulesRegistration
 */
export class msdyn_CustomerServiceSolutionHealthRulesRegistrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse>
{
  declare readonly Parameters: Readonly<msdyn_CustomerServiceSolutionHealthRulesRegistrationRequestParameters>;

  constructor(
    parameters: msdyn_CustomerServiceSolutionHealthRulesRegistrationRequestParameters = {}
  ) {
    super("msdyn_CustomerServiceSolutionHealthRulesRegistration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomerServiceSolutionHealthRulesRegistration`;

    const body = requestBody({
      SolutionNames: this.Parameters.SolutionNames,
    });

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
    // The body is the complex value, with its @odata.context
    return msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CustomerServiceSolutionHealthRulesRegistration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CustomerServiceSolutionHealthRulesRegistrationResult {
  "@odata.context"?: string;
  Message: string;
  ReturnStatus: string;
  RuleId: string;
}

/**
 * msdyn_CustomerServiceSolutionHealthRulesRegistration response message
 *
 * `result` is the value the msdyn_CustomerServiceSolutionHealthRulesRegistration action returns (see {@link msdyn_CustomerServiceSolutionHealthRulesRegistrationResult}).
 */
export class msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse extends OrganizationResponse {
  constructor(public result: msdyn_CustomerServiceSolutionHealthRulesRegistrationResult) {
    super("msdyn_CustomerServiceSolutionHealthRulesRegistration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse {
    return new msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse(
      data as msdyn_CustomerServiceSolutionHealthRulesRegistrationResult
    );
  }
}
