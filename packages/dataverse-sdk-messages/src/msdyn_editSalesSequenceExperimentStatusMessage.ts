import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_editSalesSequenceExperimentStatusResponse as msdyn_editSalesSequenceExperimentStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_editSalesSequenceExperimentStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_editSalesSequenceExperimentStatusRequestParameters {
  msdyn_winnerOrDefault: string;
  msdyn_experimentKey: string;
  msdyn_expiryTime?: string;
  msdyn_isDeactivated?: boolean;
  msdyn_experimentVersionRecordId: string;
}

/**
 * msdyn_editSalesSequenceExperimentStatus request message
 *
 * Web API Action: msdyn_editSalesSequenceExperimentStatus
 */
export class msdyn_editSalesSequenceExperimentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_editSalesSequenceExperimentStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_editSalesSequenceExperimentStatusRequestParameters>;

  constructor(parameters: msdyn_editSalesSequenceExperimentStatusRequestParameters) {
    super("msdyn_editSalesSequenceExperimentStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_editSalesSequenceExperimentStatus`;

    const body = requestBody({
      msdyn_winnerOrDefault: this.Parameters.msdyn_winnerOrDefault,
      msdyn_experimentKey: this.Parameters.msdyn_experimentKey,
      msdyn_expiryTime: this.Parameters.msdyn_expiryTime,
      msdyn_isDeactivated: this.Parameters.msdyn_isDeactivated,
      msdyn_experimentVersionRecordId: this.Parameters.msdyn_experimentVersionRecordId,
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
  ): Promise<msdyn_editSalesSequenceExperimentStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_editSalesSequenceExperimentStatusResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
