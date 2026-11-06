import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_consentvalidateform action
 */
export interface msdynmkt_consentvalidateformResponse {
  msdynmkt_validationresponse: string;
}

/**
 * Parameters of the msdynmkt_consentvalidateform action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_consentvalidateformActionParameters {
  complianceProfileId?: string;
  formBusinessUnitId?: string;
  isDoubleOptInForciblyDisabled?: boolean;
  msdynmkt_editorname: string;
  validationType?: number;
  msdynmkt_formhtml: string;
}

/**
 * msdynmkt_consentvalidateform action
 *
 * Unbound action
 */
export class msdynmkt_consentvalidateformAction implements Executable<msdynmkt_consentvalidateformResponse> {
  constructor(public readonly parameters: msdynmkt_consentvalidateformActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_consentvalidateform`;

    const body = requestBody({
      complianceProfileId: this.parameters.complianceProfileId,
      formBusinessUnitId: this.parameters.formBusinessUnitId,
      isDoubleOptInForciblyDisabled: this.parameters.isDoubleOptInForciblyDisabled,
      msdynmkt_editorname: this.parameters.msdynmkt_editorname,
      validationType: this.parameters.validationType,
      msdynmkt_formhtml: this.parameters.msdynmkt_formhtml,
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

  async parseResponse(response: Response): Promise<msdynmkt_consentvalidateformResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_consentvalidateformResponse;
    return (await response.json()) as msdynmkt_consentvalidateformResponse;
  }
}
