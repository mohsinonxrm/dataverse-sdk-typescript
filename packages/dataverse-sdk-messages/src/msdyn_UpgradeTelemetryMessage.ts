import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpgradeTelemetry message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpgradeTelemetryRequestParameters {
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
 * msdyn_UpgradeTelemetry request message
 *
 * Web API Action: msdyn_UpgradeTelemetry
 */
export class msdyn_UpgradeTelemetryRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpgradeTelemetryResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpgradeTelemetryRequestParameters>;

  constructor(parameters: msdyn_UpgradeTelemetryRequestParameters) {
    super("msdyn_UpgradeTelemetry", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpgradeTelemetry`;

    const body = requestBody({
      EventId: this.Parameters.EventId,
      RunId: this.Parameters.RunId,
      PackageName: this.Parameters.PackageName,
      SolutionName: this.Parameters.SolutionName,
      StartingVersion: this.Parameters.StartingVersion,
      TargetVersion: this.Parameters.TargetVersion,
      DurationSeconds: this.Parameters.DurationSeconds,
      Success: this.Parameters.Success,
      StepId: this.Parameters.StepId,
      StepName: this.Parameters.StepName,
      ErrorMessage: this.Parameters.ErrorMessage,
      Details: this.Parameters.Details,
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
    // The body is the complex value, with its @odata.context
    return msdyn_UpgradeTelemetryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpgradeTelemetry action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpgradeTelemetryResult {
  "@odata.context"?: string;
  output: string;
}

/**
 * msdyn_UpgradeTelemetry response message
 *
 * `result` is the value the msdyn_UpgradeTelemetry action returns (see {@link msdyn_UpgradeTelemetryResult}).
 */
export class msdyn_UpgradeTelemetryResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpgradeTelemetryResult) {
    super("msdyn_UpgradeTelemetry");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpgradeTelemetryResponse {
    return new msdyn_UpgradeTelemetryResponse(data as msdyn_UpgradeTelemetryResult);
  }
}
