import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { queueitem } from "./types/index.js";

/**
 * RouteTo request message
 *
 * Web API Action: RouteTo
 */
export class RouteToRequest extends OrganizationRequest implements Executable<RouteToResponse> {
  constructor(
    public target: EntityReference,
    public queueItem: queueitem
  ) {
    super("RouteTo");
  }

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
    return new RouteToResponse();
  }
}

/**
 * RouteTo response message
 */
export class RouteToResponse extends OrganizationResponse {
  constructor() {
    super("RouteTo");
  }

  static fromResponse(_data: unknown): RouteToResponse {
    return new RouteToResponse();
  }
}
