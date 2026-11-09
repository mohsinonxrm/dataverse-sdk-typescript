import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlSettingData } from "./types/index.js";

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
    // The body is the complex value, with its @odata.context
    return RetrieveFeatureControlSettingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveFeatureControlSetting action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFeatureControlSettingResult {
  "@odata.context"?: string;
  FeatureControlSetting: FeatureControlSettingData;
}

/**
 * RetrieveFeatureControlSetting response message
 *
 * `result` is the value the RetrieveFeatureControlSetting action returns (see {@link RetrieveFeatureControlSettingResult}).
 */
export class RetrieveFeatureControlSettingResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlSettingResult) {
    super("RetrieveFeatureControlSetting");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveFeatureControlSettingResponse {
    return new RetrieveFeatureControlSettingResponse(data as RetrieveFeatureControlSettingResult);
  }
}
