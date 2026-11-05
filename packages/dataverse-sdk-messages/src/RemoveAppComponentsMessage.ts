import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RemoveAppComponents request message
 *
 * Web API Action: RemoveAppComponents
 */
export class RemoveAppComponentsRequest
  extends OrganizationRequest
  implements Executable<RemoveAppComponentsResponse>
{
  constructor(
    public appId: string,
    public components: Record<string, unknown>[]
  ) {
    super("RemoveAppComponents");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveAppComponents`;

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
