import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    public context: string,
    public solutionUniqueName: string,
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GenerateAutomatedPluginResponse> {
    const data = await response.json();
    return GenerateAutomatedPluginResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Stage: this.stage,
      Context: this.context,
      SolutionUniqueName: this.solutionUniqueName,
      Expression: this.expression,
      EntityLogicalName: this.entityLogicalName,
      MessageName: this.messageName,
      Name: this.name,
    };
  }
}

/**
 * GenerateAutomatedPlugin response message
 */
export class GenerateAutomatedPluginResponse extends OrganizationResponse {
  constructor(public result: GenerateAutomatedPluginResponse) {
    super("GenerateAutomatedPlugin");
  }

  static fromResponse(data: unknown): GenerateAutomatedPluginResponse {
    return new GenerateAutomatedPluginResponse((data as any).value);
  }
}
