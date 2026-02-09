import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RunDataProcessingModule action
 */
export interface RunDataProcessingModuleResponse {
  HttpResponseStatus: number;
  OutputEntities: string;
}

/**
 * RunDataProcessingModule action
 *
 * Unbound action
 */
export class RunDataProcessingModuleAction implements Executable<RunDataProcessingModuleResponse> {
  constructor(
    public readonly endPoints: string[],
    public readonly jobArguments: string[],
    public readonly scalarInputs: string[],
    public readonly callbackUri: string,
    public readonly dataProcessingConfigurationId: string,
    public readonly upstreamResults: string[]
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RunDataProcessingModuleResponse> {
    const data = await response.json();
    return data as RunDataProcessingModuleResponse;
  }
}
