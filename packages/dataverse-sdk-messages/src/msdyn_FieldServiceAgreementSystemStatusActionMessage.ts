import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FieldServiceAgreementSystemStatusActionResponse as msdyn_FieldServiceAgreementSystemStatusActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FieldServiceAgreementSystemStatusAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceAgreementSystemStatusActionRequestParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceAgreementSystemStatusAction request message
 *
 * Web API Action: msdyn_FieldServiceAgreementSystemStatusAction
 *
 * The first argument is the id of the msdyn_agreement record to call it on.
 */
export class msdyn_FieldServiceAgreementSystemStatusActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceAgreementSystemStatusActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FieldServiceAgreementSystemStatusActionRequestParameters>;

  constructor(
    public msdyn_agreementId: string,
    parameters: msdyn_FieldServiceAgreementSystemStatusActionRequestParameters
  ) {
    super("msdyn_FieldServiceAgreementSystemStatusAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agreements(${this.msdyn_agreementId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceAgreementSystemStatusAction`;

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
  ): Promise<msdyn_FieldServiceAgreementSystemStatusActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_FieldServiceAgreementSystemStatusActionResponse.fromResponse({});
    return msdyn_FieldServiceAgreementSystemStatusActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_FieldServiceAgreementSystemStatusAction response message
 */
export class msdyn_FieldServiceAgreementSystemStatusActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceAgreementSystemStatusActionResponseData) {
    super("msdyn_FieldServiceAgreementSystemStatusAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceAgreementSystemStatusActionResponse {
    return new msdyn_FieldServiceAgreementSystemStatusActionResponse(
      responseObject<msdyn_FieldServiceAgreementSystemStatusActionResponseData>(data)
    );
  }
}
