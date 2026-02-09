import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveFeatureControlStringSettings request message
 *
 * Web API Action: RetrieveFeatureControlStringSettings
 */
export class RetrieveFeatureControlStringSettingsRequest
  extends OrganizationRequest
  implements Executable<RetrieveFeatureControlStringSettingsResponse>
{
  constructor() {
    super("RetrieveFeatureControlStringSettings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlStringSettings`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveFeatureControlStringSettingsResponse> {
    const data = await response.json();
    return RetrieveFeatureControlStringSettingsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * RetrieveFeatureControlStringSettings response message
 */
export class RetrieveFeatureControlStringSettingsResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlStringSettingsResponse) {
    super("RetrieveFeatureControlStringSettings");
  }

  static fromResponse(data: unknown): RetrieveFeatureControlStringSettingsResponse {
    return new RetrieveFeatureControlStringSettingsResponse((data as any).value);
  }
}
