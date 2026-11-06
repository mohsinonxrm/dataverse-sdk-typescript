import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CleanupDiagnosticsWrappers request message
 *
 * Web API Action: msdyn_CleanupDiagnosticsWrappers
 */
export class msdyn_CleanupDiagnosticsWrappersRequest
  extends OrganizationRequest
  implements Executable<msdyn_CleanupDiagnosticsWrappersResponse>
{
  constructor(
    public workItemId: string,
    public targetId: string,
    public runNumber: number
  ) {
    super("msdyn_CleanupDiagnosticsWrappers");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanupDiagnosticsWrappers`;

    const body: Record<string, unknown> = {
      WorkItemId: this.workItemId,
      TargetId: this.targetId,
      RunNumber: this.runNumber,
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

  async parseResponse(response: Response): Promise<msdyn_CleanupDiagnosticsWrappersResponse> {
    // No return value (204 No Content)
    return new msdyn_CleanupDiagnosticsWrappersResponse();
  }
}

/**
 * msdyn_CleanupDiagnosticsWrappers response message
 */
export class msdyn_CleanupDiagnosticsWrappersResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CleanupDiagnosticsWrappers");
  }

  static fromResponse(_data: unknown): msdyn_CleanupDiagnosticsWrappersResponse {
    return new msdyn_CleanupDiagnosticsWrappersResponse();
  }
}
