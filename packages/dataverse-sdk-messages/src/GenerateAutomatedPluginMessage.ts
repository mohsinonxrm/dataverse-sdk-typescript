import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { GenerateAutomatedPluginResponse as GenerateAutomatedPluginResponseData } from "./types/index.js";

/**
 * GenerateAutomatedPlugin request message
 *
 * Web API Action: GenerateAutomatedPlugin
 */
export class GenerateAutomatedPluginRequest
  extends OrganizationRequest
  implements Executable<GenerateAutomatedPluginResponse>
{
  constructor(
    public stage: number,
    public context: string | undefined,
    public solutionUniqueName: string | undefined,
    public expression: string,
    public entityLogicalName: string,
    public messageName: string,
    public name: string
  ) {
    super("GenerateAutomatedPlugin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateAutomatedPlugin`;

    const body: Record<string, unknown> = {
      Stage: this.stage,
      Context: this.context,
      SolutionUniqueName: this.solutionUniqueName,
      Expression: this.expression,
      EntityLogicalName: this.entityLogicalName,
      MessageName: this.messageName,
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

  async parseResponse(response: Response): Promise<GenerateAutomatedPluginResponse> {
    const data = await response.json();
    return GenerateAutomatedPluginResponse.fromResponse(data);
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
