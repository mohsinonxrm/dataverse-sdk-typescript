import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GenerateAutomatedPlugin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateAutomatedPluginRequestParameters {
  SolutionUniqueName?: string;
  Name: string;
  MessageName: string;
  Stage: number;
  EntityLogicalName: string;
  Expression: string;
  Context?: string;
}

/**
 * GenerateAutomatedPlugin request message
 *
 * Web API Action: GenerateAutomatedPlugin
 */
export class GenerateAutomatedPluginRequest
  extends OrganizationRequest
  implements Executable<GenerateAutomatedPluginResponse>
{
  declare readonly Parameters: Readonly<GenerateAutomatedPluginRequestParameters>;

  constructor(parameters: GenerateAutomatedPluginRequestParameters) {
    super("GenerateAutomatedPlugin", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateAutomatedPlugin`;

    const body = requestBody({
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      Name: this.Parameters.Name,
      MessageName: this.Parameters.MessageName,
      Stage: this.Parameters.Stage,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      Expression: this.Parameters.Expression,
      Context: this.Parameters.Context,
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

  async parseResponse(response: Response): Promise<GenerateAutomatedPluginResponse> {
    // The body is the complex value, with its @odata.context
    return GenerateAutomatedPluginResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GenerateAutomatedPlugin action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GenerateAutomatedPluginResult {
  "@odata.context"?: string;
  FxExpressionId: string;
  pluginid: string;
}

/**
 * GenerateAutomatedPlugin response message
 *
 * `result` is the value the GenerateAutomatedPlugin action returns (see {@link GenerateAutomatedPluginResult}).
 */
export class GenerateAutomatedPluginResponse extends OrganizationResponse {
  constructor(public result: GenerateAutomatedPluginResult) {
    super("GenerateAutomatedPlugin");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GenerateAutomatedPluginResponse {
    return new GenerateAutomatedPluginResponse(data as GenerateAutomatedPluginResult);
  }
}
