import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * RetrievePowerAppsConnections request message
 *
 * Web API Action: RetrievePowerAppsConnections
 */
export class RetrievePowerAppsConnectionsRequest
  extends OrganizationRequest
  implements Executable<RetrievePowerAppsConnectionsResponse>
{
  constructor() {
    super("RetrievePowerAppsConnections");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrievePowerAppsConnections`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePowerAppsConnectionsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return RetrievePowerAppsConnectionsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * RetrievePowerAppsConnections response message
 */
export class RetrievePowerAppsConnectionsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("RetrievePowerAppsConnections");
  }

  static fromResponse(data: unknown): RetrievePowerAppsConnectionsResponse {
    return new RetrievePowerAppsConnectionsResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
