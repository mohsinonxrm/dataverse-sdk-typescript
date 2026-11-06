import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { RetrieveFeatureControlSettingsResponse as RetrieveFeatureControlSettingsResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return RetrieveFeatureControlSettingsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * RetrieveFeatureControlSettings response message
 */
export class RetrieveFeatureControlSettingsResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlSettingsResponseData) {
    super("RetrieveFeatureControlSettings");
  }

  static fromResponse(data: unknown): RetrieveFeatureControlSettingsResponse {
    return new RetrieveFeatureControlSettingsResponse(
      responseObject<RetrieveFeatureControlSettingsResponseData>(data)
    );
  }
}
