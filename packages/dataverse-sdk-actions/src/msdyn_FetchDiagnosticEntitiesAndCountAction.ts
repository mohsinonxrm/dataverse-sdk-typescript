import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_FetchDiagnosticEntitiesAndCount action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchDiagnosticEntitiesAndCountResponse {
  "@odata.context"?: string;
  msdyn_Count: number;
}

/**
 * Parameters of the msdyn_FetchDiagnosticEntitiesAndCount action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchDiagnosticEntitiesAndCountActionParameters {
  msdyn_Filter: string;
  msdyn_RunId: string;
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
      msdyn_Filter: this.parameters.msdyn_Filter,
      msdyn_RunId: this.parameters.msdyn_RunId,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_FetchDiagnosticEntitiesAndCountResponse;
  }
}
