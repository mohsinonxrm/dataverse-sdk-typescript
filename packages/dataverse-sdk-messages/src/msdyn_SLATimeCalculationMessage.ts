import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SLATimeCalculationResponse as msdyn_SLATimeCalculationResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SLATimeCalculationResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SLATimeCalculation response message
 */
export class msdyn_SLATimeCalculationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SLATimeCalculationResponseData) {
    super("msdyn_SLATimeCalculation");
  }

  static fromResponse(data: unknown): msdyn_SLATimeCalculationResponse {
    return new msdyn_SLATimeCalculationResponse(
      responseObject<msdyn_SLATimeCalculationResponseData>(data)
    );
  }
}
