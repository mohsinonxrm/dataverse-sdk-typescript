import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return RunDataProcessingModuleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RunDataProcessingModule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RunDataProcessingModuleResult {
  "@odata.context"?: string;
  HttpResponseStatus: number;
  OutputEntities: string;
}

/**
 * RunDataProcessingModule response message
 *
 * `result` is the value the RunDataProcessingModule action returns (see {@link RunDataProcessingModuleResult}).
 */
export class RunDataProcessingModuleResponse extends OrganizationResponse {
  constructor(public result: RunDataProcessingModuleResult) {
    super("RunDataProcessingModule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RunDataProcessingModuleResponse {
    return new RunDataProcessingModuleResponse(data as RunDataProcessingModuleResult);
  }
}
