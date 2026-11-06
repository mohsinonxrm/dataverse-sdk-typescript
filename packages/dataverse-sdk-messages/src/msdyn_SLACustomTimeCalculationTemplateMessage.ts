import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SLACustomTimeCalculationTemplateResponse as msdyn_SLACustomTimeCalculationTemplateResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SLACustomTimeCalculationTemplateResponse.fromResponse({});
    return msdyn_SLACustomTimeCalculationTemplateResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SLACustomTimeCalculationTemplate response message
 */
export class msdyn_SLACustomTimeCalculationTemplateResponse extends OrganizationResponse {
  constructor(public result: msdyn_SLACustomTimeCalculationTemplateResponseData) {
    super("msdyn_SLACustomTimeCalculationTemplate");
  }

  static fromResponse(data: unknown): msdyn_SLACustomTimeCalculationTemplateResponse {
    return new msdyn_SLACustomTimeCalculationTemplateResponse(
      responseObject<msdyn_SLACustomTimeCalculationTemplateResponseData>(data)
    );
  }
}
