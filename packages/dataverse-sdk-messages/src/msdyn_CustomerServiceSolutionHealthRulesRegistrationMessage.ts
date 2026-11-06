import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse as msdyn_CustomerServiceSolutionHealthRulesRegistrationResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse.fromResponse({});
    return msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse.fromResponse(
      await response.json()
    );
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
