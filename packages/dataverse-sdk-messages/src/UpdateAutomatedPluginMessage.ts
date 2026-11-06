import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UpdateAutomatedPlugin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateAutomatedPluginRequestParameters {
  Expression?: string;
  SolutionUniqueName?: string;
  EntityLogicalName?: string;
  Context?: string;
  Name?: string;
  Stage?: number;
  FxExpressionUniqueName: string;
  MessageName?: string;
}

/**
 * UpdateAutomatedPlugin request message
 *
 * Web API Action: UpdateAutomatedPlugin
 */
export class UpdateAutomatedPluginRequest
  extends OrganizationRequest
  implements Executable<UpdateAutomatedPluginResponse>
{
  declare readonly Parameters: Readonly<UpdateAutomatedPluginRequestParameters>;

  constructor(parameters: UpdateAutomatedPluginRequestParameters) {
    super("UpdateAutomatedPlugin", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateAutomatedPlugin`;

    const body = requestBody({
      Expression: this.Parameters.Expression,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      Context: this.Parameters.Context,
      Name: this.Parameters.Name,
      Stage: this.Parameters.Stage,
      FxExpressionUniqueName: this.Parameters.FxExpressionUniqueName,
      MessageName: this.Parameters.MessageName,
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

  async parseResponse(response: Response): Promise<UpdateAutomatedPluginResponse> {
    // No return value (204 No Content)
    return new UpdateAutomatedPluginResponse();
  }
}

/**
 * UpdateAutomatedPlugin response message
 */
export class UpdateAutomatedPluginResponse extends OrganizationResponse {
  constructor() {
    super("UpdateAutomatedPlugin");
  }

  static fromResponse(_data: unknown): UpdateAutomatedPluginResponse {
    return new UpdateAutomatedPluginResponse();
  }
}
