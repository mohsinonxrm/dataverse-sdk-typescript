import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePowerAppsConnectorApisResponse> {
    const data = await response.json();
    return RetrievePowerAppsConnectorApisResponse.fromResponse(data);
  }
}

/**
 * RetrievePowerAppsConnectorApis response message
 */
export class RetrievePowerAppsConnectorApisResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("RetrievePowerAppsConnectorApis");
  }

  static fromResponse(data: unknown): RetrievePowerAppsConnectorApisResponse {
    return new RetrievePowerAppsConnectorApisResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
