import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { queueitem } from "./types/index.js";

/**
 * Response from RouteTo action
 */
export interface RouteToResponse {
  // No content returned
}

/**
 * RouteTo action
 *
 * Unbound action
 */
export class RouteToAction implements Executable<RouteToResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly queueItem: queueitem
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RouteTo`;

    const body: Record<string, unknown> = {
      Target: this.target,
      QueueItem: this.queueItem,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RouteToResponse> {
    // No return value (204 No Content)
    return {};
  }
}
