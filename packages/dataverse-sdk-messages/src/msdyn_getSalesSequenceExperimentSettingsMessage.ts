import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_getSalesSequenceExperimentSettingsResponse as msdyn_getSalesSequenceExperimentSettingsResponseData } from "./types/index.js";

/**
 * msdyn_getSalesSequenceExperimentSettings request message
 *
 * Web API Action: msdyn_getSalesSequenceExperimentSettings
 */
export class msdyn_getSalesSequenceExperimentSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_getSalesSequenceExperimentSettingsResponse>
{
  constructor(
    public msdyn_experimentRecordId: string | undefined,
    public msdyn_experimentKey: string,
    public msdyn_experimentVersionRecordId: string
  ) {
    super("msdyn_getSalesSequenceExperimentSettings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getSalesSequenceExperimentSettings`;

    const body: Record<string, unknown> = {
      msdyn_experimentRecordId: this.msdyn_experimentRecordId,
      msdyn_experimentKey: this.msdyn_experimentKey,
      msdyn_experimentVersionRecordId: this.msdyn_experimentVersionRecordId,
    };

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
    const data = await response.json();
    return msdyn_getSalesSequenceExperimentSettingsResponse.fromResponse(data);
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
