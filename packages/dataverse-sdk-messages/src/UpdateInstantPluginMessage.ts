import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UpdateInstantPlugin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateInstantPluginRequestParameters {
  Description?: string;
  Parameters?: string;
  Expression?: string;
  SolutionUniqueName?: string;
  Name?: string;
  EntityLogicalName?: string;
  Context?: string;
  FxExpressionUniqueName: string;
}

/**
 * UpdateInstantPlugin request message
 *
 * Web API Action: UpdateInstantPlugin
 */
export class UpdateInstantPluginRequest
  extends OrganizationRequest
  implements Executable<UpdateInstantPluginResponse>
{
  declare readonly Parameters: Readonly<UpdateInstantPluginRequestParameters>;

  constructor(parameters: UpdateInstantPluginRequestParameters) {
    super("UpdateInstantPlugin", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateInstantPlugin`;

    const body = requestBody({
      Description: this.Parameters.Description,
      Parameters: this.Parameters.Parameters,
      Expression: this.Parameters.Expression,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      Name: this.Parameters.Name,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      Context: this.Parameters.Context,
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

  parseResponse(_response: Response): Promise<UpdateInstantPluginResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new UpdateInstantPluginResponse());
  }
}

/**
 * UpdateInstantPlugin response message
 */
export class UpdateInstantPluginResponse extends OrganizationResponse {
  constructor() {
    super("UpdateInstantPlugin");
  }

  static fromResponse(_data?: unknown): UpdateInstantPluginResponse {
    return new UpdateInstantPluginResponse();
  }
}
