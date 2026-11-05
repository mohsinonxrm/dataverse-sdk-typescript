import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DeleteInstantPlugin request message
 *
 * Web API Action: DeleteInstantPlugin
 */
export class DeleteInstantPluginRequest
  extends OrganizationRequest
  implements Executable<DeleteInstantPluginResponse>
{
  constructor(public fxExpressionUniqueName: string) {
    super("DeleteInstantPlugin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteInstantPlugin`;

    const body: Record<string, unknown> = {
      FxExpressionUniqueName: this.fxExpressionUniqueName,
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

  async parseResponse(response: Response): Promise<DeleteInstantPluginResponse> {
    // No return value (204 No Content)
    return new DeleteInstantPluginResponse();
  }
}

/**
 * DeleteInstantPlugin response message
 */
export class DeleteInstantPluginResponse extends OrganizationResponse {
  constructor() {
    super("DeleteInstantPlugin");
  }

  static fromResponse(_data: unknown): DeleteInstantPluginResponse {
    return new DeleteInstantPluginResponse();
  }
}
