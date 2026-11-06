import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { queueitem } from "./types/index.js";

/**
 * Parameters of the RouteTo message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RouteToRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  QueueItem?: EntityReference | EntityPayload<queueitem>;
}

/**
 * RouteTo request message
 *
 * Web API Action: RouteTo
 */
export class RouteToRequest extends OrganizationRequest implements Executable<RouteToResponse> {
  declare readonly Parameters: Readonly<RouteToRequestParameters>;

  constructor(parameters: RouteToRequestParameters) {
    super("RouteTo", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RouteTo`;

    const body = requestBody({
      Target: this.Parameters.Target,
      QueueItem: this.Parameters.QueueItem,
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

  parseResponse(_response: Response): Promise<RouteToResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new RouteToResponse());
  }
}

/**
 * RouteTo response message
 */
export class RouteToResponse extends OrganizationResponse {
  constructor() {
    super("RouteTo");
  }

  static fromResponse(_data?: unknown): RouteToResponse {
    return new RouteToResponse();
  }
}
