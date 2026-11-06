import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetLeadPreferredOutreachCta action
 */
export interface msdyn_GetLeadPreferredOutreachCtaResponse {
  msdyn_leadpreferredoutreachcta: number;
  msdyn_attributesforcta: string;
}

/**
 * Parameters of the msdyn_GetLeadPreferredOutreachCta action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetLeadPreferredOutreachCtaActionParameters {
  msdyn_leadid: string;
}

/**
 * msdyn_GetLeadPreferredOutreachCta action
 *
 * Unbound action
 */
export class msdyn_GetLeadPreferredOutreachCtaAction implements Executable<msdyn_GetLeadPreferredOutreachCtaResponse> {
  constructor(public readonly parameters: msdyn_GetLeadPreferredOutreachCtaActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLeadPreferredOutreachCta`;

    const body = requestBody({
      msdyn_leadid: this.parameters.msdyn_leadid,
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

  async parseResponse(response: Response): Promise<msdyn_GetLeadPreferredOutreachCtaResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetLeadPreferredOutreachCtaResponse;
    return (await response.json()) as msdyn_GetLeadPreferredOutreachCtaResponse;
  }
}
