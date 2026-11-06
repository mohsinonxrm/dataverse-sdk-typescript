import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_getSalesSequenceExperimentSettingsResponse as msdyn_getSalesSequenceExperimentSettingsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_getSalesSequenceExperimentSettingsResponse.fromResponse({});
    return msdyn_getSalesSequenceExperimentSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_getSalesSequenceExperimentSettings response message
 */
export class msdyn_getSalesSequenceExperimentSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_getSalesSequenceExperimentSettingsResponseData) {
    super("msdyn_getSalesSequenceExperimentSettings");
  }

  static fromResponse(data: unknown): msdyn_getSalesSequenceExperimentSettingsResponse {
    return new msdyn_getSalesSequenceExperimentSettingsResponse(
      responseObject<msdyn_getSalesSequenceExperimentSettingsResponseData>(data)
    );
  }
}
