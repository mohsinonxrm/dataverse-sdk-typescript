import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RunSolutionCheckerRules request message
 *
 * Web API Action: msdyn_RunSolutionCheckerRules
 */
export class msdyn_RunSolutionCheckerRulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RunSolutionCheckerRulesResponse>
{
  constructor(
    public analysisComponentId?: string,
    public inAppNotificationEnabled?: boolean
  ) {
    super("msdyn_RunSolutionCheckerRules");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RunSolutionCheckerRules`;

    const body: Record<string, unknown> = {
      AnalysisComponentId: this.analysisComponentId,
      InAppNotificationEnabled: this.inAppNotificationEnabled,
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

  async parseResponse(response: Response): Promise<msdyn_RunSolutionCheckerRulesResponse> {
    // No return value (204 No Content)
    return new msdyn_RunSolutionCheckerRulesResponse();
  }
}

/**
 * msdyn_RunSolutionCheckerRules response message
 */
export class msdyn_RunSolutionCheckerRulesResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_RunSolutionCheckerRules");
  }

  static fromResponse(_data: unknown): msdyn_RunSolutionCheckerRulesResponse {
    return new msdyn_RunSolutionCheckerRulesResponse();
  }
}
