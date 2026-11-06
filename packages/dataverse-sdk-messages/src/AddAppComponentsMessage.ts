import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * AddAppComponents request message
 *
 * Web API Action: AddAppComponents
 */
export class AddAppComponentsRequest
  extends OrganizationRequest
  implements Executable<AddAppComponentsResponse>
{
  constructor(
    public appId: string,
    public components: Record<string, unknown>[]
  ) {
    super("AddAppComponents");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddAppComponents`;

    const body: Record<string, unknown> = {
      AppId: this.appId,
      Components: this.components,
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
