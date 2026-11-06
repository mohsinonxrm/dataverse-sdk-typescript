import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_DecommissionFieldServiceSolutionHealthRulesResponse as msdyn_DecommissionFieldServiceSolutionHealthRulesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_DecommissionFieldServiceSolutionHealthRules message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DecommissionFieldServiceSolutionHealthRulesRequestParameters {
  SolutionNames: string;
}

/**
 * msdyn_DecommissionFieldServiceSolutionHealthRules request message
 *
 * Web API Action: msdyn_DecommissionFieldServiceSolutionHealthRules
 */
export class msdyn_DecommissionFieldServiceSolutionHealthRulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_DecommissionFieldServiceSolutionHealthRulesResponse>
{
  declare readonly Parameters: Readonly<msdyn_DecommissionFieldServiceSolutionHealthRulesRequestParameters>;

  constructor(parameters: msdyn_DecommissionFieldServiceSolutionHealthRulesRequestParameters) {
    super("msdyn_DecommissionFieldServiceSolutionHealthRules", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DecommissionFieldServiceSolutionHealthRules`;

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
  ): Promise<msdyn_DecommissionFieldServiceSolutionHealthRulesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_DecommissionFieldServiceSolutionHealthRulesResponse.fromResponse({});
    return msdyn_DecommissionFieldServiceSolutionHealthRulesResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_DecommissionFieldServiceSolutionHealthRules response message
 */
export class msdyn_DecommissionFieldServiceSolutionHealthRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_DecommissionFieldServiceSolutionHealthRulesResponseData) {
    super("msdyn_DecommissionFieldServiceSolutionHealthRules");
  }

  static fromResponse(data: unknown): msdyn_DecommissionFieldServiceSolutionHealthRulesResponse {
    return new msdyn_DecommissionFieldServiceSolutionHealthRulesResponse(
      responseObject<msdyn_DecommissionFieldServiceSolutionHealthRulesResponseData>(data)
    );
  }
}
