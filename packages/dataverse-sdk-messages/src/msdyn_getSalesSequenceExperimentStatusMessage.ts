import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_getSalesSequenceExperimentStatusResponse as msdyn_getSalesSequenceExperimentStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_getSalesSequenceExperimentStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getSalesSequenceExperimentStatusRequestParameters {
  msdyn_experimentKey: string;
  msdyn_experimentVersionRecordId: string;
}

/**
 * msdyn_getSalesSequenceExperimentStatus request message
 *
 * Web API Action: msdyn_getSalesSequenceExperimentStatus
 */
export class msdyn_getSalesSequenceExperimentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_getSalesSequenceExperimentStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_getSalesSequenceExperimentStatusRequestParameters>;

  constructor(parameters: msdyn_getSalesSequenceExperimentStatusRequestParameters) {
    super("msdyn_getSalesSequenceExperimentStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getSalesSequenceExperimentStatus`;

    const body = requestBody({
      msdyn_experimentKey: this.Parameters.msdyn_experimentKey,
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

  async parseResponse(response: Response): Promise<msdyn_getSalesSequenceExperimentStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_getSalesSequenceExperimentStatusResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_getSalesSequenceExperimentStatus response message
 */
export class msdyn_getSalesSequenceExperimentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_getSalesSequenceExperimentStatusResponseData) {
    super("msdyn_getSalesSequenceExperimentStatus");
  }

  static fromResponse(data: unknown): msdyn_getSalesSequenceExperimentStatusResponse {
    return new msdyn_getSalesSequenceExperimentStatusResponse(
      responseObject<msdyn_getSalesSequenceExperimentStatusResponseData>(data)
    );
  }
}
