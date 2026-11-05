import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RouteToOperation request message
 *
 * Web API Action: msdyn_RouteToOperation
 */
export class msdyn_RouteToOperationRequest
  extends OrganizationRequest
  implements Executable<msdyn_RouteToOperationResponse>
{
  constructor(public liveWorkItemId: string) {
    super("msdyn_RouteToOperation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RouteToOperation`;

    const body: Record<string, unknown> = {
      LiveWorkItemId: this.liveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_RouteToOperationResponse> {
    // No return value (204 No Content)
    return new msdyn_RouteToOperationResponse();
  }
}

/**
 * msdyn_RouteToOperation response message
 */
export class msdyn_RouteToOperationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_RouteToOperation");
  }

  static fromResponse(_data: unknown): msdyn_RouteToOperationResponse {
    return new msdyn_RouteToOperationResponse();
  }
}
