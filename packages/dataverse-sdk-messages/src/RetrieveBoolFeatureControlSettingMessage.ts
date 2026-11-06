import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { RetrieveBoolFeatureControlSettingResponse as RetrieveBoolFeatureControlSettingResponseData } from "./types/index.js";

/**
 * Parameters of the RetrieveBoolFeatureControlSetting message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveBoolFeatureControlSettingRequestParameters {
  NamespaceValue: string;
  FeatureControlName: string;
}

/**
 * RetrieveBoolFeatureControlSetting request message
 *
 * Web API Action: RetrieveBoolFeatureControlSetting
 */
export class RetrieveBoolFeatureControlSettingRequest
  extends OrganizationRequest
  implements Executable<RetrieveBoolFeatureControlSettingResponse>
{
  declare readonly Parameters: Readonly<RetrieveBoolFeatureControlSettingRequestParameters>;

  constructor(parameters: RetrieveBoolFeatureControlSettingRequestParameters) {
    super("RetrieveBoolFeatureControlSetting", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveBoolFeatureControlSetting`;

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

  async parseResponse(response: Response): Promise<RetrieveBoolFeatureControlSettingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return RetrieveBoolFeatureControlSettingResponse.fromResponse({});
    return RetrieveBoolFeatureControlSettingResponse.fromResponse(await response.json());
  }
}

/**
 * RetrieveBoolFeatureControlSetting response message
 */
export class RetrieveBoolFeatureControlSettingResponse extends OrganizationResponse {
  constructor(public result: RetrieveBoolFeatureControlSettingResponseData) {
    super("RetrieveBoolFeatureControlSetting");
  }

  static fromResponse(data: unknown): RetrieveBoolFeatureControlSettingResponse {
    return new RetrieveBoolFeatureControlSettingResponse(
      responseObject<RetrieveBoolFeatureControlSettingResponseData>(data)
    );
  }
}
