import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlSettingData } from "./types/index.js";

/**
 * Response from the RetrieveFeatureControlSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFeatureControlSettingsResponse {
  "@odata.context"?: string;
  FeatureControlSettingCollection: FeatureControlSettingData[];
}

/**
 * Parameters of the RetrieveFeatureControlSettings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFeatureControlSettingsActionParameters {
  NamespaceValue: string;
  FeatureControlName: string;
}

/**
 * RetrieveFeatureControlSettings action
 *
 * Unbound action
 */
export class RetrieveFeatureControlSettingsAction implements Executable<RetrieveFeatureControlSettingsResponse> {
  constructor(public readonly parameters: RetrieveFeatureControlSettingsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlSettings`;

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

  async parseResponse(response: Response): Promise<RetrieveFeatureControlSettingsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveFeatureControlSettingsResponse;
  }
}
