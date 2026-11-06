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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return RetrievePowerAppsConnectorApisResponse.fromResponse(text ? JSON.parse(text) : {});
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
