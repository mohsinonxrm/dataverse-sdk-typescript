import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the RetrieveBoolFeatureControlSetting action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveBoolFeatureControlSettingResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveBoolFeatureControlSettingResponse;
  }
}
