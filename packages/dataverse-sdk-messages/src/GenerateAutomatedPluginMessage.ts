import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { GenerateAutomatedPluginResponse as GenerateAutomatedPluginResponseData } from "./types/index.js";

/**
 * Parameters of the GenerateAutomatedPlugin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateAutomatedPluginRequestParameters {
  Stage: number;
  Context?: string;
  SolutionUniqueName?: string;
  Expression: string;
  EntityLogicalName: string;
  MessageName: string;
  Name: string;
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
      Stage: this.Parameters.Stage,
      Context: this.Parameters.Context,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      Expression: this.Parameters.Expression,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      MessageName: this.Parameters.MessageName,
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

  async parseResponse(response: Response): Promise<GenerateAutomatedPluginResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return GenerateAutomatedPluginResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * GenerateAutomatedPlugin response message
 */
export class GenerateAutomatedPluginResponse extends OrganizationResponse {
  constructor(public result: GenerateAutomatedPluginResponseData) {
    super("GenerateAutomatedPlugin");
  }

  static fromResponse(data: unknown): GenerateAutomatedPluginResponse {
    return new GenerateAutomatedPluginResponse(
      responseObject<GenerateAutomatedPluginResponseData>(data)
    );
  }
}
