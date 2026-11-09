import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SLACustomTimeCalculationTemplate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SLACustomTimeCalculationTemplateRequestParameters {
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
 * msdyn_SLACustomTimeCalculationTemplate request message
 *
 * Web API Action: msdyn_SLACustomTimeCalculationTemplate
 */
export class msdyn_SLACustomTimeCalculationTemplateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SLACustomTimeCalculationTemplateResponse>
{
  declare readonly Parameters: Readonly<msdyn_SLACustomTimeCalculationTemplateRequestParameters>;

  constructor(parameters: msdyn_SLACustomTimeCalculationTemplateRequestParameters) {
    super("msdyn_SLACustomTimeCalculationTemplate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SLACustomTimeCalculationTemplate`;

    const body = requestBody({
      calendarId: this.Parameters.calendarId,
      regardingId: this.Parameters.regardingId,
      slaItemId: this.Parameters.slaItemId,
      entityName: this.Parameters.entityName,
      requestType: this.Parameters.requestType,
      previousInstanceId: this.Parameters.previousInstanceId,
      firstInputDuration: this.Parameters.firstInputDuration,
      secondInputDuration: this.Parameters.secondInputDuration,
      firstInputDate: this.Parameters.firstInputDate,
      secondInputDate: this.Parameters.secondInputDate,
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
    return msdyn_SLACustomTimeCalculationTemplateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SLACustomTimeCalculationTemplate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SLACustomTimeCalculationTemplateResult {
  "@odata.context"?: string;
  firstOutputValue: string;
  returnCalendarId: string;
  secondOutputValue: string;
}

/**
 * msdyn_SLACustomTimeCalculationTemplate response message
 *
 * `result` is the value the msdyn_SLACustomTimeCalculationTemplate action returns (see {@link msdyn_SLACustomTimeCalculationTemplateResult}).
 */
export class msdyn_SLACustomTimeCalculationTemplateResponse extends OrganizationResponse {
  constructor(public result: msdyn_SLACustomTimeCalculationTemplateResult) {
    super("msdyn_SLACustomTimeCalculationTemplate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SLACustomTimeCalculationTemplateResponse {
    return new msdyn_SLACustomTimeCalculationTemplateResponse(
      data as msdyn_SLACustomTimeCalculationTemplateResult
    );
  }
}
