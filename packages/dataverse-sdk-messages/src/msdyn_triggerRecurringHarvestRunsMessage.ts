import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_triggerRecurringHarvestRuns request message
 *
 * Web API Action: msdyn_triggerRecurringHarvestRuns
 */
export class msdyn_triggerRecurringHarvestRunsRequest
  extends OrganizationRequest
  implements Executable<msdyn_triggerRecurringHarvestRunsResponse>
{
  constructor() {
    super("msdyn_triggerRecurringHarvestRuns");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_triggerRecurringHarvestRuns`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_triggerRecurringHarvestRunsResponse> {
    // No return value (204 No Content)
    return new msdyn_triggerRecurringHarvestRunsResponse();
  }
}

/**
 * msdyn_triggerRecurringHarvestRuns response message
 */
export class msdyn_triggerRecurringHarvestRunsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_triggerRecurringHarvestRuns");
  }

  static fromResponse(_data: unknown): msdyn_triggerRecurringHarvestRunsResponse {
    return new msdyn_triggerRecurringHarvestRunsResponse();
  }
}
