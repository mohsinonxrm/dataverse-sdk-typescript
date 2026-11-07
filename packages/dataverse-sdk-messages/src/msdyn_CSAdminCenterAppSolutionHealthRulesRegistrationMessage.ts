import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CSAdminCenterAppSolutionHealthRulesRegistration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationRequestParameters {
  SolutionNames?: string;
}

/**
 * msdyn_CSAdminCenterAppSolutionHealthRulesRegistration request message
 *
 * Web API Action: msdyn_CSAdminCenterAppSolutionHealthRulesRegistration
 */
export class msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse>
{
  declare readonly Parameters: Readonly<msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationRequestParameters>;

  constructor(
    parameters: msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationRequestParameters = {}
  ) {
    super("msdyn_CSAdminCenterAppSolutionHealthRulesRegistration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSAdminCenterAppSolutionHealthRulesRegistration`;

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
  ): Promise<msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CSAdminCenterAppSolutionHealthRulesRegistration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResult {
  "@odata.context"?: string;
  Message: string;
  ReturnStatus: number;
  RuleId: string;
}

/**
 * msdyn_CSAdminCenterAppSolutionHealthRulesRegistration response message
 *
 * `result` is the value the msdyn_CSAdminCenterAppSolutionHealthRulesRegistration action returns (see {@link msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResult}).
 */
export class msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResult) {
    super("msdyn_CSAdminCenterAppSolutionHealthRulesRegistration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse {
    return new msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse(
      data as msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResult
    );
  }
}
