import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SetTeamsDocumentStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SetTeamsDocumentStatusResponse {
  "@odata.context"?: string;
  FailedLogicalEntityNames: string;
  OperationResult: boolean;
  PassedLogicalEntityNames: string;
}

/**
 * Parameters of the msdyn_SetTeamsDocumentStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetTeamsDocumentStatusActionParameters {
  Enable: boolean;
  LogicalEntityNames: string;
}

/**
 * msdyn_SetTeamsDocumentStatus action
 *
 * Unbound action
 */
export class msdyn_SetTeamsDocumentStatusAction implements Executable<msdyn_SetTeamsDocumentStatusResponse> {
  constructor(public readonly parameters: msdyn_SetTeamsDocumentStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetTeamsDocumentStatus`;

    const body = requestBody({
      Enable: this.parameters.Enable,
      LogicalEntityNames: this.parameters.LogicalEntityNames,
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

  async parseResponse(response: Response): Promise<msdyn_SetTeamsDocumentStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SetTeamsDocumentStatusResponse;
  }
}
