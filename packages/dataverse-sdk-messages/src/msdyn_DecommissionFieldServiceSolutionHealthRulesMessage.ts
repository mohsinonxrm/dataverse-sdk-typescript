import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_DecommissionFieldServiceSolutionHealthRulesResponse as msdyn_DecommissionFieldServiceSolutionHealthRulesResponseData } from "./types/index.js";

/**
 * msdyn_DecommissionFieldServiceSolutionHealthRules request message
 *
 * Web API Action: msdyn_DecommissionFieldServiceSolutionHealthRules
 */
export class msdyn_DecommissionFieldServiceSolutionHealthRulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_DecommissionFieldServiceSolutionHealthRulesResponse>
{
  constructor(public solutionNames: string) {
    super("msdyn_DecommissionFieldServiceSolutionHealthRules");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DecommissionFieldServiceSolutionHealthRules`;

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
  ): Promise<msdyn_DecommissionFieldServiceSolutionHealthRulesResponse> {
    const data = await response.json();
    return msdyn_DecommissionFieldServiceSolutionHealthRulesResponse.fromResponse(data);
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
