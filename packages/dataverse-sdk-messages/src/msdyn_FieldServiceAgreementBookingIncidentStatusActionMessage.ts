import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse as msdyn_FieldServiceAgreementBookingIncidentStatusActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FieldServiceAgreementBookingIncidentStatusAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceAgreementBookingIncidentStatusActionRequestParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceAgreementBookingIncidentStatusAction request message
 *
 * Web API Action: msdyn_FieldServiceAgreementBookingIncidentStatusAction
 *
 * The first argument is the id of the msdyn_agreementbookingincident record to call it on.
 */
export class msdyn_FieldServiceAgreementBookingIncidentStatusActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FieldServiceAgreementBookingIncidentStatusActionRequestParameters>;

  constructor(
    public msdyn_agreementbookingincidentId: string,
    parameters: msdyn_FieldServiceAgreementBookingIncidentStatusActionRequestParameters
  ) {
    super("msdyn_FieldServiceAgreementBookingIncidentStatusAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agreementbookingincidents(${this.msdyn_agreementbookingincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceAgreementBookingIncidentStatusAction`;

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
  ): Promise<msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse.fromResponse({});
    return msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_FieldServiceAgreementBookingIncidentStatusAction response message
 */
export class msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceAgreementBookingIncidentStatusActionResponseData) {
    super("msdyn_FieldServiceAgreementBookingIncidentStatusAction");
  }

  static fromResponse(
    data: unknown
  ): msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse {
    return new msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse(
      responseObject<msdyn_FieldServiceAgreementBookingIncidentStatusActionResponseData>(data)
    );
  }
}
