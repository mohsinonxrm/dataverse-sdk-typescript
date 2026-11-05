import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SLACustomTimeCalculationTemplate action
 */
export interface msdyn_SLACustomTimeCalculationTemplateResponse {
  firstOutputValue: string;
  secondOutputValue: string;
  returnCalendarId: string;
}

/**
 * msdyn_SLACustomTimeCalculationTemplate action
 *
 * Unbound action
 */
export class msdyn_SLACustomTimeCalculationTemplateAction implements Executable<msdyn_SLACustomTimeCalculationTemplateResponse> {
  constructor(
    public readonly calendarId: string,
    public readonly regardingId: string,
    public readonly slaItemId: string,
    public readonly entityName: string,
    public readonly requestType: string,
    public readonly previousInstanceId: string,
    public readonly firstInputDuration: number,
    public readonly secondInputDuration: number,
    public readonly firstInputDate: string,
    public readonly secondInputDate: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SLACustomTimeCalculationTemplate`;

    const body: Record<string, unknown> = {
      calendarId: this.calendarId,
      regardingId: this.regardingId,
      slaItemId: this.slaItemId,
      entityName: this.entityName,
      requestType: this.requestType,
      previousInstanceId: this.previousInstanceId,
      firstInputDuration: this.firstInputDuration,
      secondInputDuration: this.secondInputDuration,
      firstInputDate: this.firstInputDate,
      secondInputDate: this.secondInputDate,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SLACustomTimeCalculationTemplateResponse> {
    const data = await response.json();
    return data as msdyn_SLACustomTimeCalculationTemplateResponse;
  }
}
