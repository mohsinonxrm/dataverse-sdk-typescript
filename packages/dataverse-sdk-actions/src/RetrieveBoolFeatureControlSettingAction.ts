import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from RetrieveBoolFeatureControlSetting action
 */
export interface RetrieveBoolFeatureControlSettingResponse {
  IsEnabled: boolean;
}

/**
 * Parameters of the RetrieveBoolFeatureControlSetting action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveBoolFeatureControlSettingActionParameters {
  NamespaceValue: string;
  FeatureControlName: string;
}

/**
 * RetrieveBoolFeatureControlSetting action
 *
 * Unbound action
 */
export class RetrieveBoolFeatureControlSettingAction implements Executable<RetrieveBoolFeatureControlSettingResponse> {
  constructor(public readonly parameters: RetrieveBoolFeatureControlSettingActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveBoolFeatureControlSetting`;

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

  async parseResponse(response: Response): Promise<RetrieveBoolFeatureControlSettingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveBoolFeatureControlSettingResponse;
    return (await response.json()) as RetrieveBoolFeatureControlSettingResponse;
  }
}
