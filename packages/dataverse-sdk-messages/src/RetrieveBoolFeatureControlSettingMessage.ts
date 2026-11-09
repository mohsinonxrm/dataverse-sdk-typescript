import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return RetrieveBoolFeatureControlSettingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveBoolFeatureControlSetting action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveBoolFeatureControlSettingResult {
  "@odata.context"?: string;
  IsEnabled: boolean;
}

/**
 * RetrieveBoolFeatureControlSetting response message
 *
 * `result` is the value the RetrieveBoolFeatureControlSetting action returns (see {@link RetrieveBoolFeatureControlSettingResult}).
 */
export class RetrieveBoolFeatureControlSettingResponse extends OrganizationResponse {
  constructor(public result: RetrieveBoolFeatureControlSettingResult) {
    super("RetrieveBoolFeatureControlSetting");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveBoolFeatureControlSettingResponse {
    return new RetrieveBoolFeatureControlSettingResponse(
      data as RetrieveBoolFeatureControlSettingResult
    );
  }
}
