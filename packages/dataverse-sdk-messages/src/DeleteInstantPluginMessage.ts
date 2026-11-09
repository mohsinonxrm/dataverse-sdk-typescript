import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DeleteInstantPlugin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteInstantPluginRequestParameters {
  FxExpressionUniqueName: string;
}

/**
 * DeleteInstantPlugin request message
 *
 * Web API Action: DeleteInstantPlugin
 */
export class DeleteInstantPluginRequest
  extends OrganizationRequest
  implements Executable<DeleteInstantPluginResponse>
{
  declare readonly Parameters: Readonly<DeleteInstantPluginRequestParameters>;

  constructor(parameters: DeleteInstantPluginRequestParameters) {
    super("DeleteInstantPlugin", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteInstantPlugin`;

    const body = requestBody({
      FxExpressionUniqueName: this.Parameters.FxExpressionUniqueName,
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

  parseResponse(_response: Response): Promise<DeleteInstantPluginResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new DeleteInstantPluginResponse());
  }
}

/**
 * DeleteInstantPlugin response message
 */
export class DeleteInstantPluginResponse extends OrganizationResponse {
  constructor() {
    super("DeleteInstantPlugin");
  }

  static fromResponse(_data?: unknown): DeleteInstantPluginResponse {
    return new DeleteInstantPluginResponse();
  }
}
