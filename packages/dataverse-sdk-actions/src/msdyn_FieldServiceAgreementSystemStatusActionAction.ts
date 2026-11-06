import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FieldServiceAgreementSystemStatusAction action
 */
export interface msdyn_FieldServiceAgreementSystemStatusActionResponse {
  OutputParameter: string;
}

/**
 * Parameters of the msdyn_FieldServiceAgreementSystemStatusAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceAgreementSystemStatusActionActionParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceAgreementSystemStatusAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_agreement)
 *
 * The first argument is the id of the msdyn_agreement record to call it on.
 */
export class msdyn_FieldServiceAgreementSystemStatusActionAction implements Executable<msdyn_FieldServiceAgreementSystemStatusActionResponse> {
  constructor(
    public readonly msdyn_agreementId: string,
    public readonly parameters: msdyn_FieldServiceAgreementSystemStatusActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agreements(${this.msdyn_agreementId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceAgreementSystemStatusAction`;

    const body = requestBody({
      Type: this.parameters.Type,
      InputParameter: this.parameters.InputParameter,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_FieldServiceAgreementSystemStatusActionResponse;
  }
}
