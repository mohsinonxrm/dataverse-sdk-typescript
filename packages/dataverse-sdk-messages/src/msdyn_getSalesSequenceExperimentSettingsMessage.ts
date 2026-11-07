import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_getSalesSequenceExperimentSettings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getSalesSequenceExperimentSettingsRequestParameters {
  msdyn_experimentKey: string;
  msdyn_experimentVersionRecordId: string;
  msdyn_experimentRecordId?: string;
}

/**
 * msdyn_getSalesSequenceExperimentSettings request message
 *
 * Web API Action: msdyn_getSalesSequenceExperimentSettings
 */
export class msdyn_getSalesSequenceExperimentSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_getSalesSequenceExperimentSettingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_getSalesSequenceExperimentSettingsRequestParameters>;

  constructor(parameters: msdyn_getSalesSequenceExperimentSettingsRequestParameters) {
    super("msdyn_getSalesSequenceExperimentSettings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getSalesSequenceExperimentSettings`;

    const body = requestBody({
      msdyn_experimentKey: this.Parameters.msdyn_experimentKey,
      msdyn_experimentVersionRecordId: this.Parameters.msdyn_experimentVersionRecordId,
      msdyn_experimentRecordId: this.Parameters.msdyn_experimentRecordId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_getSalesSequenceExperimentSettingsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_getSalesSequenceExperimentSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_getSalesSequenceExperimentSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getSalesSequenceExperimentSettingsResult {
  "@odata.context"?: string;
  msdyn_experimentSettingsResponse: string;
}

/**
 * msdyn_getSalesSequenceExperimentSettings response message
 *
 * `result` is the value the msdyn_getSalesSequenceExperimentSettings action returns (see {@link msdyn_getSalesSequenceExperimentSettingsResult}).
 */
export class msdyn_getSalesSequenceExperimentSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_getSalesSequenceExperimentSettingsResult) {
    super("msdyn_getSalesSequenceExperimentSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_getSalesSequenceExperimentSettingsResponse {
    return new msdyn_getSalesSequenceExperimentSettingsResponse(
      data as msdyn_getSalesSequenceExperimentSettingsResult
    );
  }
}
