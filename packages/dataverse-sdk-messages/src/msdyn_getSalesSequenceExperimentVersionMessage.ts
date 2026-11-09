import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_getSalesSequenceExperimentVersion message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getSalesSequenceExperimentVersionRequestParameters {
  msdyn_customerId: string;
  msdyn_experimentKey: string;
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
      msdyn_customerId: this.Parameters.msdyn_customerId,
      msdyn_experimentKey: this.Parameters.msdyn_experimentKey,
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
    // The body is the complex value, with its @odata.context
    return msdyn_getSalesSequenceExperimentVersionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_getSalesSequenceExperimentVersion action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getSalesSequenceExperimentVersionResult {
  "@odata.context"?: string;
  msdyn_experimentVersionResponse: string;
}

/**
 * msdyn_getSalesSequenceExperimentVersion response message
 *
 * `result` is the value the msdyn_getSalesSequenceExperimentVersion action returns (see {@link msdyn_getSalesSequenceExperimentVersionResult}).
 */
export class msdyn_getSalesSequenceExperimentVersionResponse extends OrganizationResponse {
  constructor(public result: msdyn_getSalesSequenceExperimentVersionResult) {
    super("msdyn_getSalesSequenceExperimentVersion");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_getSalesSequenceExperimentVersionResponse {
    return new msdyn_getSalesSequenceExperimentVersionResponse(
      data as msdyn_getSalesSequenceExperimentVersionResult
    );
  }
}
