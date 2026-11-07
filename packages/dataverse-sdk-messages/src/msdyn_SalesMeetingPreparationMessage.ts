import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesMeetingPreparation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesMeetingPreparationRequestParameters {
  msdyn_responseFormat?: string;
  msdyn_activityId?: string;
  msdyn_sessionId?: string;
  msdyn_id: string;
}

/**
 * msdyn_SalesMeetingPreparation request message
 *
 * Web API Action: msdyn_SalesMeetingPreparation
 */
export class msdyn_SalesMeetingPreparationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesMeetingPreparationResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesMeetingPreparationRequestParameters>;

  constructor(parameters: msdyn_SalesMeetingPreparationRequestParameters) {
    super("msdyn_SalesMeetingPreparation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesMeetingPreparation`;

    const body = requestBody({
      msdyn_responseFormat: this.Parameters.msdyn_responseFormat,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
      msdyn_id: this.Parameters.msdyn_id,
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

  async parseResponse(response: Response): Promise<msdyn_SalesMeetingPreparationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesMeetingPreparationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesMeetingPreparation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesMeetingPreparationResult {
  "@odata.context"?: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * msdyn_SalesMeetingPreparation response message
 *
 * `result` is the value the msdyn_SalesMeetingPreparation action returns (see {@link msdyn_SalesMeetingPreparationResult}).
 */
export class msdyn_SalesMeetingPreparationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesMeetingPreparationResult) {
    super("msdyn_SalesMeetingPreparation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesMeetingPreparationResponse {
    return new msdyn_SalesMeetingPreparationResponse(data as msdyn_SalesMeetingPreparationResult);
  }
}
