import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * RetrievePowerAppsConnectorApis request message
 *
 * Web API Action: RetrievePowerAppsConnectorApis
 */
export class RetrievePowerAppsConnectorApisRequest
  extends OrganizationRequest
  implements Executable<RetrievePowerAppsConnectorApisResponse>
{
  constructor() {
    super("RetrievePowerAppsConnectorApis");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrievePowerAppsConnectorApis`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePowerAppsConnectorApisResponse> {
    const data = await response.json();
    return RetrievePowerAppsConnectorApisResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * RetrievePowerAppsConnectorApis response message
 */
export class RetrievePowerAppsConnectorApisResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("RetrievePowerAppsConnectorApis");
  }

  static fromResponse(data: unknown): RetrievePowerAppsConnectorApisResponse {
    return new RetrievePowerAppsConnectorApisResponse((data as any).value);
  }
}
