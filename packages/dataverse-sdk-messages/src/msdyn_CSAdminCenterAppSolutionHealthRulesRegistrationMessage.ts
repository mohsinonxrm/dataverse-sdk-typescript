import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse as msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse.fromResponse({});
    return msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse.fromResponse(
      await response.json()
    );
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
