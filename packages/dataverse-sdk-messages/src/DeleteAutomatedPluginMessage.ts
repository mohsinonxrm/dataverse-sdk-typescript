import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DeleteAutomatedPlugin request message
 *
 * Web API Action: DeleteAutomatedPlugin
 */
export class DeleteAutomatedPluginRequest
  extends OrganizationRequest
  implements Executable<DeleteAutomatedPluginResponse>
{
  constructor(public pluginid: string) {
    super("DeleteAutomatedPlugin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAutomatedPlugin`;

    const body: Record<string, unknown> = {
      pluginid: this.pluginid,
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

  async parseResponse(response: Response): Promise<DeleteAutomatedPluginResponse> {
    // No return value (204 No Content)
    return new DeleteAutomatedPluginResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      pluginid: this.pluginid,
    };
  }
}

/**
 * DeleteAutomatedPlugin response message
 */
export class DeleteAutomatedPluginResponse extends OrganizationResponse {
  constructor() {
    super("DeleteAutomatedPlugin");
  }

  static fromResponse(_data: unknown): DeleteAutomatedPluginResponse {
    return new DeleteAutomatedPluginResponse();
  }
}
