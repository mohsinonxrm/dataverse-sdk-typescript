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
    // 204 No Content is an empty result
    if (response.status === 204) return GenerateAutomatedPluginResponse.fromResponse({});
    return GenerateAutomatedPluginResponse.fromResponse(await response.json());
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
