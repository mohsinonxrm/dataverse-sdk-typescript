import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse as msdyn_FieldServiceQuoteBookingIncidentCopyActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FieldServiceQuoteBookingIncidentCopyAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceQuoteBookingIncidentCopyActionRequestParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceQuoteBookingIncidentCopyAction request message
 *
 * Web API Action: msdyn_FieldServiceQuoteBookingIncidentCopyAction
 *
 * The first argument is the id of the msdyn_quotebookingincident record to call it on.
 */
export class msdyn_FieldServiceQuoteBookingIncidentCopyActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FieldServiceQuoteBookingIncidentCopyActionRequestParameters>;

  constructor(
    public msdyn_quotebookingincidentId: string,
    parameters: msdyn_FieldServiceQuoteBookingIncidentCopyActionRequestParameters
  ) {
    super("msdyn_FieldServiceQuoteBookingIncidentCopyAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_quotebookingincidents(${this.msdyn_quotebookingincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceQuoteBookingIncidentCopyAction`;

    const body = requestBody({
      Type: this.Parameters.Type,
      InputParameter: this.Parameters.InputParameter,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_FieldServiceQuoteBookingIncidentCopyAction response message
 */
export class msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceQuoteBookingIncidentCopyActionResponseData) {
    super("msdyn_FieldServiceQuoteBookingIncidentCopyAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse {
    return new msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse(
      responseObject<msdyn_FieldServiceQuoteBookingIncidentCopyActionResponseData>(data)
    );
  }
}
