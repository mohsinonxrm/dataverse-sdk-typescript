import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse as msdyn_FieldServiceAgreementBookingIncidentCopyActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FieldServiceAgreementBookingIncidentCopyAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceAgreementBookingIncidentCopyActionRequestParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceAgreementBookingIncidentCopyAction request message
 *
 * Web API Action: msdyn_FieldServiceAgreementBookingIncidentCopyAction
 *
 * The first argument is the id of the msdyn_agreementbookingincident record to call it on.
 */
export class msdyn_FieldServiceAgreementBookingIncidentCopyActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FieldServiceAgreementBookingIncidentCopyActionRequestParameters>;

  constructor(
    public msdyn_agreementbookingincidentId: string,
    parameters: msdyn_FieldServiceAgreementBookingIncidentCopyActionRequestParameters
  ) {
    super("msdyn_FieldServiceAgreementBookingIncidentCopyAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agreementbookingincidents(${this.msdyn_agreementbookingincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceAgreementBookingIncidentCopyAction`;

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
  ): Promise<msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse.fromResponse({});
    return msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_FieldServiceAgreementBookingIncidentCopyAction response message
 */
export class msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceAgreementBookingIncidentCopyActionResponseData) {
    super("msdyn_FieldServiceAgreementBookingIncidentCopyAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse {
    return new msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse(
      responseObject<msdyn_FieldServiceAgreementBookingIncidentCopyActionResponseData>(data)
    );
  }
}
