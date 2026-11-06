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
    // 204 No Content is an empty result
    if (response.status === 204) return GenerateInstantPluginResponse.fromResponse({});
    return GenerateInstantPluginResponse.fromResponse(await response.json());
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
