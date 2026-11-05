import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RunDataProcessingModule request message
 *
 * Web API Action: RunDataProcessingModule
 */
export class RunDataProcessingModuleRequest
  extends OrganizationRequest
  implements Executable<RunDataProcessingModuleResponse>
{
  constructor(
    public endPoints: string[],
    public jobArguments: string[],
    public scalarInputs: string[],
    public callbackUri: string,
    public dataProcessingConfigurationId: string,
    public upstreamResults: string[]
  ) {
    super("RunDataProcessingModule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RunDataProcessingModule`;

    const body: Record<string, unknown> = {
      EndPoints: this.endPoints,
      JobArguments: this.jobArguments,
      ScalarInputs: this.scalarInputs,
      CallbackUri: this.callbackUri,
      DataProcessingConfigurationId: this.dataProcessingConfigurationId,
      UpstreamResults: this.upstreamResults,
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

  async parseResponse(response: Response): Promise<RunDataProcessingModuleResponse> {
    const data = await response.json();
    return RunDataProcessingModuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EndPoints: this.endPoints,
      JobArguments: this.jobArguments,
      ScalarInputs: this.scalarInputs,
      CallbackUri: this.callbackUri,
      DataProcessingConfigurationId: this.dataProcessingConfigurationId,
      UpstreamResults: this.upstreamResults,
    };
  }
}

/**
 * RunDataProcessingModule response message
 */
export class RunDataProcessingModuleResponse extends OrganizationResponse {
  constructor(public result: RunDataProcessingModuleResponse) {
    super("RunDataProcessingModule");
  }

  static fromResponse(data: unknown): RunDataProcessingModuleResponse {
    return new RunDataProcessingModuleResponse((data as any).value);
  }
}
