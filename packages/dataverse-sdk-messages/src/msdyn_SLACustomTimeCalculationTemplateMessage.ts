import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SLACustomTimeCalculationTemplate request message
 *
 * Web API Action: msdyn_SLACustomTimeCalculationTemplate
 */
export class msdyn_SLACustomTimeCalculationTemplateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SLACustomTimeCalculationTemplateResponse>
{
  constructor(
    public calendarId: string,
    public regardingId: string,
    public slaItemId: string,
    public entityName: string,
    public requestType: string,
    public previousInstanceId: string,
    public firstInputDuration: number,
    public secondInputDuration: number,
    public firstInputDate: string,
    public secondInputDate: string
  ) {
    super("msdyn_SLACustomTimeCalculationTemplate");
  }

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
    return msdyn_SLACustomTimeCalculationTemplateResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
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
  }
}

/**
 * msdyn_SLACustomTimeCalculationTemplate response message
 */
export class msdyn_SLACustomTimeCalculationTemplateResponse extends OrganizationResponse {
  constructor(public result: msdyn_SLACustomTimeCalculationTemplateResponse) {
    super("msdyn_SLACustomTimeCalculationTemplate");
  }

  static fromResponse(data: unknown): msdyn_SLACustomTimeCalculationTemplateResponse {
    return new msdyn_SLACustomTimeCalculationTemplateResponse((data as any).value);
  }
}
