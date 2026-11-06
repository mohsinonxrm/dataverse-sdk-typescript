import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RetrieveDistanceMatrix action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveDistanceMatrixResponse {
  "@odata.context"?: string;
  ExceptionMessage: string;
}

/**
 * Parameters of the msdyn_RetrieveDistanceMatrix action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveDistanceMatrixActionParameters {
  Version?: string;
  Sources: Record<string, unknown>[];
  Targets: Record<string, unknown>[];
}

/**
 * msdyn_RetrieveDistanceMatrix action
 *
 * Unbound action
 */
export class msdyn_RetrieveDistanceMatrixAction implements Executable<msdyn_RetrieveDistanceMatrixResponse> {
  constructor(public readonly parameters: msdyn_RetrieveDistanceMatrixActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveDistanceMatrix`;

    const body = requestBody({
      Version: this.parameters.Version,
      Sources: this.parameters.Sources,
      Targets: this.parameters.Targets,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveDistanceMatrixResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveDistanceMatrixResponse;
  }
}
