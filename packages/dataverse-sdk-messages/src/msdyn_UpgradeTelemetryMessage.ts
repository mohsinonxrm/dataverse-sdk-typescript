import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpgradeTelemetry request message
 *
 * Web API Action: msdyn_UpgradeTelemetry
 */
export class msdyn_UpgradeTelemetryRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpgradeTelemetryResponse>
{
  constructor(
    public eventId: number,
    public runId: string,
    public packageName: string,
    public solutionName: string,
    public startingVersion: string,
    public targetVersion: string,
    public durationSeconds: number,
    public success: number,
    public stepId: string,
    public stepName: string,
    public errorMessage: string,
    public details: string
  ) {
    super("msdyn_UpgradeTelemetry");
  }

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
    return msdyn_UpgradeTelemetryResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
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
  }
}

/**
 * msdyn_UpgradeTelemetry response message
 */
export class msdyn_UpgradeTelemetryResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpgradeTelemetryResponse) {
    super("msdyn_UpgradeTelemetry");
  }

  static fromResponse(data: unknown): msdyn_UpgradeTelemetryResponse {
    return new msdyn_UpgradeTelemetryResponse((data as any).value);
  }
}
