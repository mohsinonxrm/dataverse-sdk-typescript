import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ExecuteSIRequest action
 */
export interface msdyn_ExecuteSIRequestResponse {
  Response: string;
}

/**
 * Parameters of the msdyn_ExecuteSIRequest action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteSIRequestActionParameters {
  MethodName: string;
  MethodParams?: string;
  HttpRequestType: string;
  OrgMigratedToCoreServices?: boolean;
}

/**
 * msdyn_ExecuteSIRequest action
 *
 * Unbound action
 */
export class msdyn_ExecuteSIRequestAction implements Executable<msdyn_ExecuteSIRequestResponse> {
  constructor(public readonly parameters: msdyn_ExecuteSIRequestActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSIRequest`;

    const body = requestBody({
      MethodName: this.parameters.MethodName,
      MethodParams: this.parameters.MethodParams,
      HttpRequestType: this.parameters.HttpRequestType,
      OrgMigratedToCoreServices: this.parameters.OrgMigratedToCoreServices,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSIRequestResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ExecuteSIRequestResponse;
    return (await response.json()) as msdyn_ExecuteSIRequestResponse;
  }
}
