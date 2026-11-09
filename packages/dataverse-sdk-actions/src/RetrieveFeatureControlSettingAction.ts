import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlSettingData } from "./types/index.js";

/**
 * Response from the RetrieveFeatureControlSetting action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFeatureControlSettingResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveFeatureControlSettingResponse;
  }
}
