import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the RemoveAppComponents message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveAppComponentsRequestParameters {
  AppId: string;
  Components: Record<string, unknown>[];
}

/**
 * RemoveAppComponents request message
 *
 * Web API Action: RemoveAppComponents
 */
export class RemoveAppComponentsRequest
  extends OrganizationRequest
  implements Executable<RemoveAppComponentsResponse>
{
  declare readonly Parameters: Readonly<RemoveAppComponentsRequestParameters>;

  constructor(parameters: RemoveAppComponentsRequestParameters) {
    super("RemoveAppComponents", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveAppComponents`;

    const body = requestBody({
      AppId: this.Parameters.AppId,
      Components: this.Parameters.Components,
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

  async parseResponse(response: Response): Promise<RemoveAppComponentsResponse> {
    // No return value (204 No Content)
    return new RemoveAppComponentsResponse();
  }
}

/**
 * RemoveAppComponents response message
 */
export class RemoveAppComponentsResponse extends OrganizationResponse {
  constructor() {
    super("RemoveAppComponents");
  }

  static fromResponse(_data: unknown): RemoveAppComponentsResponse {
    return new RemoveAppComponentsResponse();
  }
}
