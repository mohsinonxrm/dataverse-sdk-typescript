import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { recurringappointmentmaster } from "./types/index.js";

/**
 * Response from DeleteOpenInstances action
 */
export interface DeleteOpenInstancesResponse {
  // No content returned
}

/**
 * DeleteOpenInstances action
 *
 * Unbound action
 */
export class DeleteOpenInstancesAction implements Executable<DeleteOpenInstancesResponse> {
  constructor(
    public readonly target: recurringappointmentmaster,
    public readonly seriesEndDate: string,
    public readonly stateOfPastInstances: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteOpenInstances`;

    const body: Record<string, unknown> = {
      Target: this.target,
      SeriesEndDate: this.seriesEndDate,
      StateOfPastInstances: this.stateOfPastInstances,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<DeleteOpenInstancesResponse> {
    // No return value (204 No Content)
    return {};
  }
}
