import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FieldServiceSolutionHealthRulesRegistrationResponse as msdyn_FieldServiceSolutionHealthRulesRegistrationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FieldServiceSolutionHealthRulesRegistration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceSolutionHealthRulesRegistrationRequestParameters {
  SolutionNames: string;
}

/**
 * msdyn_FieldServiceSolutionHealthRulesRegistration request message
 *
 * Web API Action: msdyn_FieldServiceSolutionHealthRulesRegistration
 */
export class msdyn_FieldServiceSolutionHealthRulesRegistrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceSolutionHealthRulesRegistrationResponse>
{
  declare readonly Parameters: Readonly<msdyn_FieldServiceSolutionHealthRulesRegistrationRequestParameters>;

  constructor(parameters: msdyn_FieldServiceSolutionHealthRulesRegistrationRequestParameters) {
    super("msdyn_FieldServiceSolutionHealthRulesRegistration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FieldServiceSolutionHealthRulesRegistration`;

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
  ): Promise<msdyn_FieldServiceSolutionHealthRulesRegistrationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_FieldServiceSolutionHealthRulesRegistrationResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
