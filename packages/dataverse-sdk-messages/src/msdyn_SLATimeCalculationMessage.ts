import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SLATimeCalculation request message
 *
 * Web API Action: msdyn_SLATimeCalculation
 */
export class msdyn_SLATimeCalculationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SLATimeCalculationResponse>
{
  constructor(
    public calendarId: string,
    public startTime: string,
    public requestType: string,
    public minutes: number,
    public logsLevel: number,
    public endTime: string
  ) {
    super("msdyn_SLATimeCalculation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SLATimeCalculation`;

    const body: Record<string, unknown> = {
      calendarId: this.calendarId,
      startTime: this.startTime,
      requestType: this.requestType,
      minutes: this.minutes,
      logsLevel: this.logsLevel,
      endTime: this.endTime,
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

  async parseResponse(response: Response): Promise<msdyn_SLATimeCalculationResponse> {
    const data = await response.json();
    return msdyn_SLATimeCalculationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      calendarId: this.calendarId,
      startTime: this.startTime,
      requestType: this.requestType,
      minutes: this.minutes,
      logsLevel: this.logsLevel,
      endTime: this.endTime,
    };
  }
}

/**
 * msdyn_SLATimeCalculation response message
 */
export class msdyn_SLATimeCalculationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SLATimeCalculationResponse) {
    super("msdyn_SLATimeCalculation");
  }

  static fromResponse(data: unknown): msdyn_SLATimeCalculationResponse {
    return new msdyn_SLATimeCalculationResponse((data as any).value);
  }
}
