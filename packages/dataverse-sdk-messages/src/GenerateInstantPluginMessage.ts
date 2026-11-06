import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GenerateInstantPlugin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateInstantPluginRequestParameters {
  Parameters?: string;
  Expression: string;
  Description: string;
  Name: string;
  Context?: string;
  SolutionUniqueName?: string;
  EntityLogicalName?: string;
}

/**
 * GenerateInstantPlugin request message
 *
 * Web API Action: GenerateInstantPlugin
 */
export class GenerateInstantPluginRequest
  extends OrganizationRequest
  implements Executable<GenerateInstantPluginResponse>
{
  declare readonly Parameters: Readonly<GenerateInstantPluginRequestParameters>;

  constructor(parameters: GenerateInstantPluginRequestParameters) {
    super("GenerateInstantPlugin", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateInstantPlugin`;

    const body = requestBody({
      Parameters: this.Parameters.Parameters,
      Expression: this.Parameters.Expression,
      Description: this.Parameters.Description,
      Name: this.Parameters.Name,
      Context: this.Parameters.Context,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      EntityLogicalName: this.Parameters.EntityLogicalName,
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

  async parseResponse(response: Response): Promise<GenerateInstantPluginResponse> {
    // The body is the complex value, with its @odata.context
    return GenerateInstantPluginResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GenerateInstantPlugin action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GenerateInstantPluginResult {
  "@odata.context"?: string;
  CustomApiId: string;
  FxExpressionId: string;
  msdyn_functionid: string;
}

/**
 * GenerateInstantPlugin response message
 *
 * `result` is the value the GenerateInstantPlugin action returns (see {@link GenerateInstantPluginResult}).
 */
export class GenerateInstantPluginResponse extends OrganizationResponse {
  constructor(public result: GenerateInstantPluginResult) {
    super("GenerateInstantPlugin");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GenerateInstantPluginResponse {
    return new GenerateInstantPluginResponse(data as GenerateInstantPluginResult);
  }
}
