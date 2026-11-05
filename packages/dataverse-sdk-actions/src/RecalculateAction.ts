import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from Recalculate action
 */
export interface RecalculateResponse {
  // No content returned
}

/**
 * Recalculate action
 *
 * Bound action
 * Binding parameter: entity (mscrm.goal)
 */
export class RecalculateAction implements Executable<RecalculateResponse> {
  constructor(public readonly goalId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/goals(${this.goalId})/Microsoft.Dynamics.CRM.Recalculate`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RecalculateResponse> {
    // No return value (204 No Content)
    return {};
  }
}
