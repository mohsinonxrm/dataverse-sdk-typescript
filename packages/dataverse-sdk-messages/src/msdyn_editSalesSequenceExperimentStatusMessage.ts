import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_editSalesSequenceExperimentStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_editSalesSequenceExperimentStatusRequestParameters {
  msdyn_experimentVersionRecordId: string;
  msdyn_isDeactivated?: boolean;
  msdyn_expiryTime?: string;
  msdyn_experimentKey: string;
  msdyn_winnerOrDefault: string;
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
      msdyn_experimentVersionRecordId: this.Parameters.msdyn_experimentVersionRecordId,
      msdyn_isDeactivated: this.Parameters.msdyn_isDeactivated,
      msdyn_expiryTime: this.Parameters.msdyn_expiryTime,
      msdyn_experimentKey: this.Parameters.msdyn_experimentKey,
      msdyn_winnerOrDefault: this.Parameters.msdyn_winnerOrDefault,
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
    // The body is the complex value, with its @odata.context
    return msdyn_editSalesSequenceExperimentStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_editSalesSequenceExperimentStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_editSalesSequenceExperimentStatusResult {
  "@odata.context"?: string;
  msdyn_editExperimentStatusResponse: string;
}

/**
 * msdyn_editSalesSequenceExperimentStatus response message
 *
 * `result` is the value the msdyn_editSalesSequenceExperimentStatus action returns (see {@link msdyn_editSalesSequenceExperimentStatusResult}).
 */
export class msdyn_editSalesSequenceExperimentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_editSalesSequenceExperimentStatusResult) {
    super("msdyn_editSalesSequenceExperimentStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_editSalesSequenceExperimentStatusResponse {
    return new msdyn_editSalesSequenceExperimentStatusResponse(
      data as msdyn_editSalesSequenceExperimentStatusResult
    );
  }
}
