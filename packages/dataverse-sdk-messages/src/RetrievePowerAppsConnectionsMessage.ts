import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePowerAppsConnectionsResponse> {
    const data = await response.json();
    return RetrievePowerAppsConnectionsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * RetrievePowerAppsConnections response message
 */
export class RetrievePowerAppsConnectionsResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("RetrievePowerAppsConnections");
  }

  static fromResponse(data: unknown): RetrievePowerAppsConnectionsResponse {
    return new RetrievePowerAppsConnectionsResponse((data as any).value);
  }
}
