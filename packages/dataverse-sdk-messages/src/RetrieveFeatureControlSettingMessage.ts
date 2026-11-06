import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { RetrieveFeatureControlSettingResponse as RetrieveFeatureControlSettingResponseData } from "./types/index.js";

/**
 * Parameters of the RetrieveFeatureControlSetting message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFeatureControlSettingRequestParameters {
  NamespaceValue: string;
  FeatureControlName: string;
}

/**
 * RetrieveFeatureControlSetting request message
 *
 * Web API Action: RetrieveFeatureControlSetting
 */
export class RetrieveFeatureControlSettingRequest
  extends OrganizationRequest
  implements Executable<RetrieveFeatureControlSettingResponse>
{
  declare readonly Parameters: Readonly<RetrieveFeatureControlSettingRequestParameters>;

  constructor(parameters: RetrieveFeatureControlSettingRequestParameters) {
    super("RetrieveFeatureControlSetting", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlSetting`;

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

  async parseResponse(response: Response): Promise<RetrieveFeatureControlSettingResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return RetrieveFeatureControlSettingResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * RetrieveFeatureControlSetting response message
 */
export class RetrieveFeatureControlSettingResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlSettingResponseData) {
    super("RetrieveFeatureControlSetting");
  }

  static fromResponse(data: unknown): RetrieveFeatureControlSettingResponse {
    return new RetrieveFeatureControlSettingResponse(
      responseObject<RetrieveFeatureControlSettingResponseData>(data)
    );
  }
}
