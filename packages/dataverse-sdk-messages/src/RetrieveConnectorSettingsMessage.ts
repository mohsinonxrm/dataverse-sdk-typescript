import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * RetrieveConnectorSettings request message
 *
 * Web API Action: RetrieveConnectorSettings
 */
export class RetrieveConnectorSettingsRequest
  extends OrganizationRequest
  implements Executable<RetrieveConnectorSettingsResponse>
{
  constructor() {
    super("RetrieveConnectorSettings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveConnectorSettings`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveConnectorSettingsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return RetrieveConnectorSettingsResponse.fromResponse({});
    return RetrieveConnectorSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * RetrieveConnectorSettings response message
 */
export class RetrieveConnectorSettingsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("RetrieveConnectorSettings");
  }

  static fromResponse(data: unknown): RetrieveConnectorSettingsResponse {
    return new RetrieveConnectorSettingsResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
