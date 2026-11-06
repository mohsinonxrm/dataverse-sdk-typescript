import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_LeavePublicConsult action
 */
export interface CCaaS_LeavePublicConsultResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_LeavePublicConsult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_LeavePublicConsultActionParameters {
  ApiVersion: string;
}

/**
 * CCaaS_LeavePublicConsult action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_LeavePublicConsultAction implements Executable<CCaaS_LeavePublicConsultResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_LeavePublicConsultActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_LeavePublicConsult`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_LeavePublicConsultResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_LeavePublicConsultResponse;
    return (await response.json()) as CCaaS_LeavePublicConsultResponse;
  }
}
