import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlSettingData } from "./types/index.js";

/**
 * Response from RetrieveFeatureControlSetting action
 */
export interface RetrieveFeatureControlSettingResponse {
  FeatureControlSetting: FeatureControlSettingData;
}

/**
 * Parameters of the RetrieveFeatureControlSetting action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFeatureControlSettingActionParameters {
  NamespaceValue: string;
  FeatureControlName: string;
}

/**
 * RetrieveFeatureControlSetting action
 *
 * Unbound action
 */
export class RetrieveFeatureControlSettingAction implements Executable<RetrieveFeatureControlSettingResponse> {
  constructor(public readonly parameters: RetrieveFeatureControlSettingActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlSetting`;

    const body = requestBody({
      NamespaceValue: this.parameters.NamespaceValue,
      FeatureControlName: this.parameters.FeatureControlName,
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
    return (text ? JSON.parse(text) : {}) as RetrieveFeatureControlSettingResponse;
  }
}
