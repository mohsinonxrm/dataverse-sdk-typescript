import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_editSalesSequenceExperimentStatusResponse as msdyn_editSalesSequenceExperimentStatusResponseData } from "./types/index.js";

/**
 * msdyn_editSalesSequenceExperimentStatus request message
 *
 * Web API Action: msdyn_editSalesSequenceExperimentStatus
 */
export class msdyn_editSalesSequenceExperimentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_editSalesSequenceExperimentStatusResponse>
{
  constructor(
    public msdyn_winnerOrDefault: string,
    public msdyn_experimentKey: string,
    public msdyn_expiryTime: string | undefined,
    public msdyn_isDeactivated: boolean | undefined,
    public msdyn_experimentVersionRecordId: string
  ) {
    super("msdyn_editSalesSequenceExperimentStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_editSalesSequenceExperimentStatus`;

    const body: Record<string, unknown> = {
      msdyn_winnerOrDefault: this.msdyn_winnerOrDefault,
      msdyn_experimentKey: this.msdyn_experimentKey,
      msdyn_expiryTime: this.msdyn_expiryTime,
      msdyn_isDeactivated: this.msdyn_isDeactivated,
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
  ): Promise<msdyn_editSalesSequenceExperimentStatusResponse> {
    const data = await response.json();
    return msdyn_editSalesSequenceExperimentStatusResponse.fromResponse(data);
  }
}

/**
 * msdyn_editSalesSequenceExperimentStatus response message
 */
export class msdyn_editSalesSequenceExperimentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_editSalesSequenceExperimentStatusResponseData) {
    super("msdyn_editSalesSequenceExperimentStatus");
  }

  static fromResponse(data: unknown): msdyn_editSalesSequenceExperimentStatusResponse {
    return new msdyn_editSalesSequenceExperimentStatusResponse(
      responseObject<msdyn_editSalesSequenceExperimentStatusResponseData>(data)
    );
  }
}
