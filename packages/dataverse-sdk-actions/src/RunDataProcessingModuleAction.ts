import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from RunDataProcessingModule action
 */
export interface RunDataProcessingModuleResponse {
  HttpResponseStatus: number;
  OutputEntities: string;
}

/**
 * Parameters of the RunDataProcessingModule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RunDataProcessingModuleActionParameters {
  EndPoints?: string[];
  JobArguments?: string[];
  ScalarInputs?: string[];
  CallbackUri?: string;
  DataProcessingConfigurationId: string;
  UpstreamResults?: string[];
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
      EndPoints: this.parameters.EndPoints,
      JobArguments: this.parameters.JobArguments,
      ScalarInputs: this.parameters.ScalarInputs,
      CallbackUri: this.parameters.CallbackUri,
      DataProcessingConfigurationId: this.parameters.DataProcessingConfigurationId,
      UpstreamResults: this.parameters.UpstreamResults,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RunDataProcessingModuleResponse;
  }
}
