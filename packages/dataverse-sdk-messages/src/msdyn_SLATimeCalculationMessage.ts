import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SLATimeCalculation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SLATimeCalculationRequestParameters {
  calendarId: string;
  startTime: string;
  requestType: string;
  minutes?: number;
  logsLevel?: number;
  endTime?: string;
}

/**
 * msdyn_SLATimeCalculation request message
 *
 * Web API Action: msdyn_SLATimeCalculation
 */
export class msdyn_SLATimeCalculationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SLATimeCalculationResponse>
{
  declare readonly Parameters: Readonly<msdyn_SLATimeCalculationRequestParameters>;

  constructor(parameters: msdyn_SLATimeCalculationRequestParameters) {
    super("msdyn_SLATimeCalculation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SLATimeCalculation`;

    const body = requestBody({
      calendarId: this.Parameters.calendarId,
      startTime: this.Parameters.startTime,
      requestType: this.Parameters.requestType,
      minutes: this.Parameters.minutes,
      logsLevel: this.Parameters.logsLevel,
      endTime: this.Parameters.endTime,
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

  async parseResponse(response: Response): Promise<msdyn_SLATimeCalculationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SLATimeCalculationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SLATimeCalculation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SLATimeCalculationResult {
  "@odata.context"?: string;
  outputLogs: string;
  returnValue: string;
}

/**
 * msdyn_SLATimeCalculation response message
 *
 * `result` is the value the msdyn_SLATimeCalculation action returns (see {@link msdyn_SLATimeCalculationResult}).
 */
export class msdyn_SLATimeCalculationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SLATimeCalculationResult) {
    super("msdyn_SLATimeCalculation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SLATimeCalculationResponse {
    return new msdyn_SLATimeCalculationResponse(data as msdyn_SLATimeCalculationResult);
  }
}
