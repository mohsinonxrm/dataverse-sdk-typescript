import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CleanupDiagnosticsWrappers action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CleanupDiagnosticsWrappersResponse = void;

/**
 * Parameters of the msdyn_CleanupDiagnosticsWrappers action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CleanupDiagnosticsWrappersActionParameters {
  WorkItemId?: string;
  TargetId?: string;
  RunNumber: number;
}

/**
 * msdyn_CleanupDiagnosticsWrappers action
 *
 * Unbound action
 */
export class msdyn_CleanupDiagnosticsWrappersAction implements Executable<msdyn_CleanupDiagnosticsWrappersResponse> {
  constructor(public readonly parameters: msdyn_CleanupDiagnosticsWrappersActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanupDiagnosticsWrappers`;

    const body = requestBody({
      WorkItemId: this.parameters.WorkItemId,
      TargetId: this.parameters.TargetId,
      RunNumber: this.parameters.RunNumber,
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

  parseResponse(_response: Response): Promise<msdyn_CleanupDiagnosticsWrappersResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
