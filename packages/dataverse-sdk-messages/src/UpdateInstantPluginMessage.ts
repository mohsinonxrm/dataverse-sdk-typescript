import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UpdateInstantPlugin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateInstantPluginRequestParameters {
  Description?: string;
  FxExpressionUniqueName: string;
  Parameters?: string;
  Context?: string;
  EntityLogicalName?: string;
  SolutionUniqueName?: string;
  Expression?: string;
  Name?: string;
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
      FxExpressionUniqueName: this.Parameters.FxExpressionUniqueName,
      Parameters: this.Parameters.Parameters,
      Context: this.Parameters.Context,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      Expression: this.Parameters.Expression,
      Name: this.Parameters.Name,
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

  async parseResponse(response: Response): Promise<UpdateInstantPluginResponse> {
    // No return value (204 No Content)
    return new UpdateInstantPluginResponse();
  }
}

/**
 * UpdateInstantPlugin response message
 */
export class UpdateInstantPluginResponse extends OrganizationResponse {
  constructor() {
    super("UpdateInstantPlugin");
  }

  static fromResponse(_data: unknown): UpdateInstantPluginResponse {
    return new UpdateInstantPluginResponse();
  }
}
