import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FetchDiagnosticEntitiesAndCount action
 */
export interface msdyn_FetchDiagnosticEntitiesAndCountResponse {
  msdyn_Count: number;
}

/**
 * Parameters of the msdyn_FetchDiagnosticEntitiesAndCount action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchDiagnosticEntitiesAndCountActionParameters {
  msdyn_RunId: string;
  msdyn_Filter: string;
}

/**
 * msdyn_FetchDiagnosticEntitiesAndCount action
 *
 * Unbound action
 */
export class msdyn_FetchDiagnosticEntitiesAndCountAction implements Executable<msdyn_FetchDiagnosticEntitiesAndCountResponse> {
  constructor(public readonly parameters: msdyn_FetchDiagnosticEntitiesAndCountActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchDiagnosticEntitiesAndCount`;

    const body = requestBody({
      msdyn_RunId: this.parameters.msdyn_RunId,
      msdyn_Filter: this.parameters.msdyn_Filter,
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

  async parseResponse(response: Response): Promise<msdyn_FetchDiagnosticEntitiesAndCountResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_FetchDiagnosticEntitiesAndCountResponse;
  }
}
