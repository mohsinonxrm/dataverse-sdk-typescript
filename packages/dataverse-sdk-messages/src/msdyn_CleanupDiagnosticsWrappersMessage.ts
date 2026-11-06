import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CleanupDiagnosticsWrappers message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CleanupDiagnosticsWrappersRequestParameters {
  WorkItemId?: string;
  TargetId?: string;
  RunNumber: number;
}

/**
 * msdyn_CleanupDiagnosticsWrappers request message
 *
 * Web API Action: msdyn_CleanupDiagnosticsWrappers
 */
export class msdyn_CleanupDiagnosticsWrappersRequest
  extends OrganizationRequest
  implements Executable<msdyn_CleanupDiagnosticsWrappersResponse>
{
  declare readonly Parameters: Readonly<msdyn_CleanupDiagnosticsWrappersRequestParameters>;

  constructor(parameters: msdyn_CleanupDiagnosticsWrappersRequestParameters) {
    super("msdyn_CleanupDiagnosticsWrappers", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanupDiagnosticsWrappers`;

    const body = requestBody({
      WorkItemId: this.Parameters.WorkItemId,
      TargetId: this.Parameters.TargetId,
      RunNumber: this.Parameters.RunNumber,
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
