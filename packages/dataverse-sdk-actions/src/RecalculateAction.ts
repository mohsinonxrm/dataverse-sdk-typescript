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
 *
 * The first argument is the id of the goal record to call it on.
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RecalculateResponse;
  }
}
