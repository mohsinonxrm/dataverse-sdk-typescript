import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveConnectorSettingsResponse> {
    const data = await response.json();
    return RetrieveConnectorSettingsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * RetrieveConnectorSettings response message
 */
export class RetrieveConnectorSettingsResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("RetrieveConnectorSettings");
  }

  static fromResponse(data: unknown): RetrieveConnectorSettingsResponse {
    return new RetrieveConnectorSettingsResponse((data as any).value);
  }
}
