import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RouteToOperation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RouteToOperationRequestParameters {
  LiveWorkItemId: string;
}

/**
 * msdyn_RouteToOperation request message
 *
 * Web API Action: msdyn_RouteToOperation
 */
export class msdyn_RouteToOperationRequest
  extends OrganizationRequest
  implements Executable<msdyn_RouteToOperationResponse>
{
  declare readonly Parameters: Readonly<msdyn_RouteToOperationRequestParameters>;

  constructor(parameters: msdyn_RouteToOperationRequestParameters) {
    super("msdyn_RouteToOperation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RouteToOperation`;

    const body = requestBody({
      LiveWorkItemId: this.Parameters.LiveWorkItemId,
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
