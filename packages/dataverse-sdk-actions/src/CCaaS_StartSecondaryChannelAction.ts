import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_StartSecondaryChannel action
 */
export interface CCaaS_StartSecondaryChannelResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_StartSecondaryChannel action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_StartSecondaryChannelActionParameters {
  ApiVersion: string;
  SecondaryChannelType: string;
}

/**
 * CCaaS_StartSecondaryChannel action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_StartSecondaryChannelAction implements Executable<CCaaS_StartSecondaryChannelResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_StartSecondaryChannelActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_StartSecondaryChannel`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      SecondaryChannelType: this.parameters.SecondaryChannelType,
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

  async parseResponse(response: Response): Promise<CCaaS_StartSecondaryChannelResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_StartSecondaryChannelResponse;
    return (await response.json()) as CCaaS_StartSecondaryChannelResponse;
  }
}
