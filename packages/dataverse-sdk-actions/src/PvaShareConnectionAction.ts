import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaShareConnection action
 */
export interface PvaShareConnectionResponse {
  // No content returned
}

/**
 * PvaShareConnection action
 *
 * Bound action
 * Binding parameter: entity (mscrm.connectionreference)
 */
export class PvaShareConnectionAction implements Executable<PvaShareConnectionResponse> {
  constructor(public readonly connectionreferenceId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/connectionreferences(${this.connectionreferenceId})/Microsoft.Dynamics.CRM.PvaShareConnection`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaShareConnectionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
