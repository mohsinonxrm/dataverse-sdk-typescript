import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SLACustomTimeCalculationTemplate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SLACustomTimeCalculationTemplateResponse {
  "@odata.context"?: string;
  firstOutputValue: string;
  returnCalendarId: string;
  secondOutputValue: string;
}

/**
 * Parameters of the msdyn_SLACustomTimeCalculationTemplate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SLACustomTimeCalculationTemplateActionParameters {
  calendarId: string;
  regardingId: string;
  slaItemId: string;
  entityName: string;
  requestType: string;
  previousInstanceId: string;
  firstInputDuration: number;
  secondInputDuration: number;
  firstInputDate: string;
  secondInputDate: string;
}

/**
 * msdyn_SLACustomTimeCalculationTemplate action
 *
 * Unbound action
 */
export class msdyn_SLACustomTimeCalculationTemplateAction implements Executable<msdyn_SLACustomTimeCalculationTemplateResponse> {
  constructor(public readonly parameters: msdyn_SLACustomTimeCalculationTemplateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SLACustomTimeCalculationTemplate`;

    const body = requestBody({
      calendarId: this.parameters.calendarId,
      regardingId: this.parameters.regardingId,
      slaItemId: this.parameters.slaItemId,
      entityName: this.parameters.entityName,
      requestType: this.parameters.requestType,
      previousInstanceId: this.parameters.previousInstanceId,
      firstInputDuration: this.parameters.firstInputDuration,
      secondInputDuration: this.parameters.secondInputDuration,
      firstInputDate: this.parameters.firstInputDate,
      secondInputDate: this.parameters.secondInputDate,
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

  async parseResponse(response: Response): Promise<msdyn_SLACustomTimeCalculationTemplateResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SLACustomTimeCalculationTemplateResponse;
  }
}
