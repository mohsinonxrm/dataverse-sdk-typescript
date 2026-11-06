import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DeleteAutomatedPlugin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteAutomatedPluginRequestParameters {
  pluginid: string;
}

/**
 * DeleteAutomatedPlugin request message
 *
 * Web API Action: DeleteAutomatedPlugin
 */
export class DeleteAutomatedPluginRequest
  extends OrganizationRequest
  implements Executable<DeleteAutomatedPluginResponse>
{
  declare readonly Parameters: Readonly<DeleteAutomatedPluginRequestParameters>;

  constructor(parameters: DeleteAutomatedPluginRequestParameters) {
    super("DeleteAutomatedPlugin", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAutomatedPlugin`;

    const body = requestBody({
      pluginid: this.Parameters.pluginid,
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

  async parseResponse(response: Response): Promise<DeleteAutomatedPluginResponse> {
    // No return value (204 No Content)
    return new DeleteAutomatedPluginResponse();
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
