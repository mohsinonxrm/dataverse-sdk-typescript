import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpgradeTelemetry action
 */
export interface msdyn_UpgradeTelemetryResponse {
  output: string;
}

/**
 * Parameters of the msdyn_UpgradeTelemetry action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpgradeTelemetryActionParameters {
  EventId: number;
  RunId?: string;
  PackageName?: string;
  SolutionName?: string;
  StartingVersion?: string;
  TargetVersion?: string;
  DurationSeconds?: number;
  Success?: number;
  StepId?: string;
  StepName?: string;
  ErrorMessage?: string;
  Details?: string;
}

/**
 * msdyn_UpgradeTelemetry action
 *
 * Unbound action
 */
export class msdyn_UpgradeTelemetryAction implements Executable<msdyn_UpgradeTelemetryResponse> {
  constructor(public readonly parameters: msdyn_UpgradeTelemetryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpgradeTelemetry`;

    const body = requestBody({
      EventId: this.parameters.EventId,
      RunId: this.parameters.RunId,
      PackageName: this.parameters.PackageName,
      SolutionName: this.parameters.SolutionName,
      StartingVersion: this.parameters.StartingVersion,
      TargetVersion: this.parameters.TargetVersion,
      DurationSeconds: this.parameters.DurationSeconds,
      Success: this.parameters.Success,
      StepId: this.parameters.StepId,
      StepName: this.parameters.StepName,
      ErrorMessage: this.parameters.ErrorMessage,
      Details: this.parameters.Details,
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

  async parseResponse(response: Response): Promise<msdyn_UpgradeTelemetryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpgradeTelemetryResponse;
    return (await response.json()) as msdyn_UpgradeTelemetryResponse;
  }
}
