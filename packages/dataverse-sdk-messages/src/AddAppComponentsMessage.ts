import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AddAppComponents message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddAppComponentsRequestParameters {
  AppId: string;
  Components: Record<string, unknown>[];
}

/**
 * AddAppComponents request message
 *
 * Web API Action: AddAppComponents
 */
export class AddAppComponentsRequest
  extends OrganizationRequest
  implements Executable<AddAppComponentsResponse>
{
  declare readonly Parameters: Readonly<AddAppComponentsRequestParameters>;

  constructor(parameters: AddAppComponentsRequestParameters) {
    super("AddAppComponents", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddAppComponents`;

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

  async parseResponse(response: Response): Promise<AddAppComponentsResponse> {
    // No return value (204 No Content)
    return new AddAppComponentsResponse();
  }
}

/**
 * AddAppComponents response message
 */
export class AddAppComponentsResponse extends OrganizationResponse {
  constructor() {
    super("AddAppComponents");
  }

  static fromResponse(_data: unknown): AddAppComponentsResponse {
    return new AddAppComponentsResponse();
  }
}
