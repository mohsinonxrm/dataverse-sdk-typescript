import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the RunDataProcessingModule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RunDataProcessingModuleResponse {
  "@odata.context"?: string;
  HttpResponseStatus: number;
  OutputEntities: string;
}

/**
 * Parameters of the RunDataProcessingModule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RunDataProcessingModuleActionParameters {
  UpstreamResults?: string[];
  ScalarInputs?: string[];
  CallbackUri?: string;
  EndPoints?: string[];
  JobArguments?: string[];
  DataProcessingConfigurationId: string;
}

/**
 * RunDataProcessingModule action
 *
 * Unbound action
 */
export class RunDataProcessingModuleAction implements Executable<RunDataProcessingModuleResponse> {
  constructor(public readonly parameters: RunDataProcessingModuleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RunDataProcessingModule`;

    const body = requestBody({
      UpstreamResults: this.parameters.UpstreamResults,
      ScalarInputs: this.parameters.ScalarInputs,
      CallbackUri: this.parameters.CallbackUri,
      EndPoints: this.parameters.EndPoints,
      JobArguments: this.parameters.JobArguments,
      DataProcessingConfigurationId: this.parameters.DataProcessingConfigurationId,
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

  async parseResponse(response: Response): Promise<RunDataProcessingModuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RunDataProcessingModuleResponse;
  }
}
