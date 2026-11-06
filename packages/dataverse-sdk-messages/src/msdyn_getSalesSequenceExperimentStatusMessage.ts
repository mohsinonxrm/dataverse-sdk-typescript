import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_getSalesSequenceExperimentStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_getSalesSequenceExperimentStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getSalesSequenceExperimentStatusResult {
  "@odata.context"?: string;
  msdyn_ExperimentStatusResponse: string;
}

/**
 * msdyn_getSalesSequenceExperimentStatus response message
 *
 * `result` is the value the msdyn_getSalesSequenceExperimentStatus action returns (see {@link msdyn_getSalesSequenceExperimentStatusResult}).
 */
export class msdyn_getSalesSequenceExperimentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_getSalesSequenceExperimentStatusResult) {
    super("msdyn_getSalesSequenceExperimentStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_getSalesSequenceExperimentStatusResponse {
    return new msdyn_getSalesSequenceExperimentStatusResponse(
      data as msdyn_getSalesSequenceExperimentStatusResult
    );
  }
}
