import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from CreateInstance action
 */
export interface CreateInstanceResponse {
  SeriesCanBeExpanded: boolean;
}

/**
 * CreateInstance action
 *
 * Unbound action
 */
export class CreateInstanceAction implements Executable<CreateInstanceResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly count: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateInstance`;

    const body: Record<string, unknown> = {
      Target: this.target,
      Count: this.count,
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

  async parseResponse(response: Response): Promise<CreateInstanceResponse> {
    const data = await response.json();
    return data as CreateInstanceResponse;
  }
}
