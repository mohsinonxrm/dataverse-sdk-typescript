import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpgradeTelemetry action
 */
export interface msdyn_UpgradeTelemetryResponse {
  output: string;
}

/**
 * msdyn_UpgradeTelemetry action
 *
 * Unbound action
 */
export class msdyn_UpgradeTelemetryAction implements Executable<msdyn_UpgradeTelemetryResponse> {
  constructor(
    public readonly eventId: number,
    public readonly runId: string,
    public readonly packageName: string,
    public readonly solutionName: string,
    public readonly startingVersion: string,
    public readonly targetVersion: string,
    public readonly durationSeconds: number,
    public readonly success: number,
    public readonly stepId: string,
    public readonly stepName: string,
    public readonly errorMessage: string,
    public readonly details: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpgradeTelemetry`;

    const body: Record<string, unknown> = {
      EventId: this.eventId,
      RunId: this.runId,
      PackageName: this.packageName,
      SolutionName: this.solutionName,
      StartingVersion: this.startingVersion,
      TargetVersion: this.targetVersion,
      DurationSeconds: this.durationSeconds,
      Success: this.success,
      StepId: this.stepId,
      StepName: this.stepName,
      ErrorMessage: this.errorMessage,
      Details: this.details,
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

  async parseResponse(response: Response): Promise<msdyn_UpgradeTelemetryResponse> {
    const data = await response.json();
    return data as msdyn_UpgradeTelemetryResponse;
  }
}
