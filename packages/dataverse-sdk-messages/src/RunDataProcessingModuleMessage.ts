import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { RunDataProcessingModuleResponse as RunDataProcessingModuleResponseData } from "./types/index.js";

/**
 * Parameters of the RunDataProcessingModule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RunDataProcessingModuleRequestParameters {
  UpstreamResults?: string[];
  ScalarInputs?: string[];
  CallbackUri?: string;
  EndPoints?: string[];
  JobArguments?: string[];
  DataProcessingConfigurationId: string;
}

/**
 * RunDataProcessingModule request message
 *
 * Web API Action: RunDataProcessingModule
 */
export class RunDataProcessingModuleRequest
  extends OrganizationRequest
  implements Executable<RunDataProcessingModuleResponse>
{
  declare readonly Parameters: Readonly<RunDataProcessingModuleRequestParameters>;

  constructor(parameters: RunDataProcessingModuleRequestParameters) {
    super("RunDataProcessingModule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RunDataProcessingModule`;

    const body = requestBody({
      UpstreamResults: this.Parameters.UpstreamResults,
      ScalarInputs: this.Parameters.ScalarInputs,
      CallbackUri: this.Parameters.CallbackUri,
      EndPoints: this.Parameters.EndPoints,
      JobArguments: this.Parameters.JobArguments,
      DataProcessingConfigurationId: this.Parameters.DataProcessingConfigurationId,
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
    // 204 No Content is an empty result
    if (response.status === 204) return RunDataProcessingModuleResponse.fromResponse({});
    return RunDataProcessingModuleResponse.fromResponse(await response.json());
  }
}

/**
 * RunDataProcessingModule response message
 */
export class RunDataProcessingModuleResponse extends OrganizationResponse {
  constructor(public result: RunDataProcessingModuleResponseData) {
    super("RunDataProcessingModule");
  }

  static fromResponse(data: unknown): RunDataProcessingModuleResponse {
    return new RunDataProcessingModuleResponse(
      responseObject<RunDataProcessingModuleResponseData>(data)
    );
  }
}
