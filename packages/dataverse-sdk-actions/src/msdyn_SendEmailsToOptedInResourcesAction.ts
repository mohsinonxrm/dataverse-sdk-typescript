import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SendEmailsToOptedInResources action
 */
export interface msdyn_SendEmailsToOptedInResourcesResponse {
  ExceptionMessage: string;
}

/**
 * Parameters of the msdyn_SendEmailsToOptedInResources action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SendEmailsToOptedInResourcesActionParameters {
  FromUserId: string;
  ToResourceIds: string;
}

/**
 * msdyn_SendEmailsToOptedInResources action
 *
 * Unbound action
 */
export class msdyn_SendEmailsToOptedInResourcesAction implements Executable<msdyn_SendEmailsToOptedInResourcesResponse> {
  constructor(public readonly parameters: msdyn_SendEmailsToOptedInResourcesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendEmailsToOptedInResources`;

    const body = requestBody({
      FromUserId: this.parameters.FromUserId,
      ToResourceIds: this.parameters.ToResourceIds,
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

  async parseResponse(response: Response): Promise<msdyn_SendEmailsToOptedInResourcesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SendEmailsToOptedInResourcesResponse;
    return (await response.json()) as msdyn_SendEmailsToOptedInResourcesResponse;
  }
}
