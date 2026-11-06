import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_GetCallbackTimeSlotsResponse as CCaaS_GetCallbackTimeSlotsResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_GetCallbackTimeSlots message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetCallbackTimeSlotsRequestParameters {
  CalendarId: string;
  ApiVersion: string;
  TimeZoneId: string;
}

/**
 * CCaaS_GetCallbackTimeSlots request message
 *
 * Web API Action: CCaaS_GetCallbackTimeSlots
 */
export class CCaaS_GetCallbackTimeSlotsRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetCallbackTimeSlotsResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetCallbackTimeSlotsRequestParameters>;

  constructor(parameters: CCaaS_GetCallbackTimeSlotsRequestParameters) {
    super("CCaaS_GetCallbackTimeSlots", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetCallbackTimeSlots`;

    const body = requestBody({
      CalendarId: this.Parameters.CalendarId,
      ApiVersion: this.Parameters.ApiVersion,
      TimeZoneId: this.Parameters.TimeZoneId,
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

  async parseResponse(response: Response): Promise<CCaaS_GetCallbackTimeSlotsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_GetCallbackTimeSlotsResponse.fromResponse({});
    return CCaaS_GetCallbackTimeSlotsResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_GetCallbackTimeSlots response message
 */
export class CCaaS_GetCallbackTimeSlotsResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetCallbackTimeSlotsResponseData) {
    super("CCaaS_GetCallbackTimeSlots");
  }

  static fromResponse(data: unknown): CCaaS_GetCallbackTimeSlotsResponse {
    return new CCaaS_GetCallbackTimeSlotsResponse(
      responseObject<CCaaS_GetCallbackTimeSlotsResponseData>(data)
    );
  }
}
