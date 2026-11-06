import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { queueitem } from "./types/index.js";

/**
 * Response from RouteTo action
 */
export interface RouteToResponse {
  // No content returned
}

/**
 * Parameters of the RouteTo action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RouteToActionParameters {
  Target: EntityReference | AnyEntityPayload;
  QueueItem?: EntityReference | EntityPayload<queueitem>;
}

/**
 * RouteTo action
 *
 * Unbound action
 */
export class RouteToAction implements Executable<RouteToResponse> {
  constructor(public readonly parameters: RouteToActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RouteTo`;

    const body = requestBody({
      Target: this.parameters.Target,
      QueueItem: this.parameters.QueueItem,
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

  async parseResponse(response: Response): Promise<RouteToResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RouteToResponse;
    return (await response.json()) as RouteToResponse;
  }
}
