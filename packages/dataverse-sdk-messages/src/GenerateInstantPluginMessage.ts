import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { GenerateInstantPluginResponse as GenerateInstantPluginResponseData } from "./types/index.js";

/**
 * GenerateInstantPlugin request message
 *
 * Web API Action: GenerateInstantPlugin
 */
export class GenerateInstantPluginRequest
  extends OrganizationRequest
  implements Executable<GenerateInstantPluginResponse>
{
  constructor(
    public solutionUniqueName: string,
    public expression: string,
    public context: string,
    public description: string,
    public entityLogicalName: string,
    public parameters: string,
    public name: string
  ) {
    super("GenerateInstantPlugin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateInstantPlugin`;

    const body: Record<string, unknown> = {
      SolutionUniqueName: this.solutionUniqueName,
      Expression: this.expression,
      Context: this.context,
      Description: this.description,
      EntityLogicalName: this.entityLogicalName,
      Parameters: this.parameters,
      Name: this.name,
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

  async parseResponse(response: Response): Promise<GenerateInstantPluginResponse> {
    const data = await response.json();
    return GenerateInstantPluginResponse.fromResponse(data);
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
