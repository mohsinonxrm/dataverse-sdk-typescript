import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_getSalesSequenceExperimentVersionResponse as msdyn_getSalesSequenceExperimentVersionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_getSalesSequenceExperimentVersion message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getSalesSequenceExperimentVersionRequestParameters {
  msdyn_experimentKey: string;
  msdyn_customerId: string;
  msdyn_versionATraffic: number;
  msdyn_experimentVersionRecordId: string;
}

/**
 * msdyn_getSalesSequenceExperimentVersion request message
 *
 * Web API Action: msdyn_getSalesSequenceExperimentVersion
 */
export class msdyn_getSalesSequenceExperimentVersionRequest
  extends OrganizationRequest
  implements Executable<msdyn_getSalesSequenceExperimentVersionResponse>
{
  declare readonly Parameters: Readonly<msdyn_getSalesSequenceExperimentVersionRequestParameters>;

  constructor(parameters: msdyn_getSalesSequenceExperimentVersionRequestParameters) {
    super("msdyn_getSalesSequenceExperimentVersion", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getSalesSequenceExperimentVersion`;

    const body = requestBody({
      msdyn_experimentKey: this.Parameters.msdyn_experimentKey,
      msdyn_customerId: this.Parameters.msdyn_customerId,
      msdyn_versionATraffic: this.Parameters.msdyn_versionATraffic,
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
  ): Promise<msdyn_getSalesSequenceExperimentVersionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_getSalesSequenceExperimentVersionResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_getSalesSequenceExperimentVersion response message
 */
export class msdyn_getSalesSequenceExperimentVersionResponse extends OrganizationResponse {
  constructor(public result: msdyn_getSalesSequenceExperimentVersionResponseData) {
    super("msdyn_getSalesSequenceExperimentVersion");
  }

  static fromResponse(data: unknown): msdyn_getSalesSequenceExperimentVersionResponse {
    return new msdyn_getSalesSequenceExperimentVersionResponse(
      responseObject<msdyn_getSalesSequenceExperimentVersionResponseData>(data)
    );
  }
}
