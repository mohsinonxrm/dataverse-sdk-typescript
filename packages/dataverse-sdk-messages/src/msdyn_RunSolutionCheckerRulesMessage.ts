import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RunSolutionCheckerRules message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RunSolutionCheckerRulesRequestParameters {
  AnalysisComponentId?: string;
  InAppNotificationEnabled?: boolean;
}

/**
 * msdyn_RunSolutionCheckerRules request message
 *
 * Web API Action: msdyn_RunSolutionCheckerRules
 */
export class msdyn_RunSolutionCheckerRulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RunSolutionCheckerRulesResponse>
{
  declare readonly Parameters: Readonly<msdyn_RunSolutionCheckerRulesRequestParameters>;

  constructor(parameters: msdyn_RunSolutionCheckerRulesRequestParameters = {}) {
    super("msdyn_RunSolutionCheckerRules", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RunSolutionCheckerRules`;

    const body = requestBody({
      AnalysisComponentId: this.Parameters.AnalysisComponentId,
      InAppNotificationEnabled: this.Parameters.InAppNotificationEnabled,
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

  parseResponse(_response: Response): Promise<msdyn_RunSolutionCheckerRulesResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_RunSolutionCheckerRulesResponse());
  }
}

/**
 * msdyn_RunSolutionCheckerRules response message
 */
export class msdyn_RunSolutionCheckerRulesResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_RunSolutionCheckerRules");
  }

  static fromResponse(_data?: unknown): msdyn_RunSolutionCheckerRulesResponse {
    return new msdyn_RunSolutionCheckerRulesResponse();
  }
}
