import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpgradeTelemetryResponse as msdyn_UpgradeTelemetryResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_UpgradeTelemetryResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_UpgradeTelemetry response message
 */
export class msdyn_UpgradeTelemetryResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpgradeTelemetryResponseData) {
    super("msdyn_UpgradeTelemetry");
  }

  static fromResponse(data: unknown): msdyn_UpgradeTelemetryResponse {
    return new msdyn_UpgradeTelemetryResponse(
      responseObject<msdyn_UpgradeTelemetryResponseData>(data)
    );
  }
}
