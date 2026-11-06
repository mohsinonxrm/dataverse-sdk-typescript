import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { GenerateInstantPluginResponse as GenerateInstantPluginResponseData } from "./types/index.js";

/**
 * Parameters of the GenerateInstantPlugin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateInstantPluginRequestParameters {
  SolutionUniqueName?: string;
  Expression: string;
  Context?: string;
  Description: string;
  EntityLogicalName?: string;
  Parameters?: string;
  Name: string;
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
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      Expression: this.Parameters.Expression,
      Context: this.Parameters.Context,
      Description: this.Parameters.Description,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      Parameters: this.Parameters.Parameters,
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

  async parseResponse(response: Response): Promise<GenerateInstantPluginResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return GenerateInstantPluginResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * GenerateInstantPlugin response message
 */
export class GenerateInstantPluginResponse extends OrganizationResponse {
  constructor(public result: GenerateInstantPluginResponseData) {
    super("GenerateInstantPlugin");
  }

  static fromResponse(data: unknown): GenerateInstantPluginResponse {
    return new GenerateInstantPluginResponse(
      responseObject<GenerateInstantPluginResponseData>(data)
    );
  }
}
