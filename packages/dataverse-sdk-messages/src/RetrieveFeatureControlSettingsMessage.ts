import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlSettingData } from "./types/index.js";

/**
 * Parameters of the RetrieveFeatureControlSettings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFeatureControlSettingsRequestParameters {
  NamespaceValue: string;
  FeatureControlName: string;
}

/**
 * RetrieveFeatureControlSettings request message
 *
 * Web API Action: RetrieveFeatureControlSettings
 */
export class RetrieveFeatureControlSettingsRequest
  extends OrganizationRequest
  implements Executable<RetrieveFeatureControlSettingsResponse>
{
  declare readonly Parameters: Readonly<RetrieveFeatureControlSettingsRequestParameters>;

  constructor(parameters: RetrieveFeatureControlSettingsRequestParameters) {
    super("RetrieveFeatureControlSettings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlSettings`;

    const body = requestBody({
      NamespaceValue: this.Parameters.NamespaceValue,
      FeatureControlName: this.Parameters.FeatureControlName,
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

  async parseResponse(response: Response): Promise<RetrieveFeatureControlSettingsResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveFeatureControlSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveFeatureControlSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFeatureControlSettingsResult {
  "@odata.context"?: string;
  FeatureControlSettingCollection: FeatureControlSettingData[];
}

/**
 * RetrieveFeatureControlSettings response message
 *
 * `result` is the value the RetrieveFeatureControlSettings action returns (see {@link RetrieveFeatureControlSettingsResult}).
 */
export class RetrieveFeatureControlSettingsResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlSettingsResult) {
    super("RetrieveFeatureControlSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveFeatureControlSettingsResponse {
    return new RetrieveFeatureControlSettingsResponse(data as RetrieveFeatureControlSettingsResult);
  }
}
