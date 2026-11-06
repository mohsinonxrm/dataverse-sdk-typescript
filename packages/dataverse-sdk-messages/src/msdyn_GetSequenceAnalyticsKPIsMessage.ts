import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSequenceAnalyticsKPIs message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSequenceAnalyticsKPIsRequestParameters {
  SequenceId: string;
  SequenceStepId?: string;
  StartDate: string;
  EndDate: string;
  Configuration: number;
}

/**
 * msdyn_GetSequenceAnalyticsKPIs request message
 *
 * Web API Action: msdyn_GetSequenceAnalyticsKPIs
 */
export class msdyn_GetSequenceAnalyticsKPIsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSequenceAnalyticsKPIsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSequenceAnalyticsKPIsRequestParameters>;

  constructor(parameters: msdyn_GetSequenceAnalyticsKPIsRequestParameters) {
    super("msdyn_GetSequenceAnalyticsKPIs", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSequenceAnalyticsKPIs`;

    const body = requestBody({
      SequenceId: this.Parameters.SequenceId,
      SequenceStepId: this.Parameters.SequenceStepId,
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
      Configuration: this.Parameters.Configuration,
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

  async parseResponse(response: Response): Promise<msdyn_GetSequenceAnalyticsKPIsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSequenceAnalyticsKPIsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSequenceAnalyticsKPIs action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSequenceAnalyticsKPIsResult {
  "@odata.context"?: string;
  SequenceAnalyticsKPIs: string;
}

/**
 * msdyn_GetSequenceAnalyticsKPIs response message
 *
 * `result` is the value the msdyn_GetSequenceAnalyticsKPIs action returns (see {@link msdyn_GetSequenceAnalyticsKPIsResult}).
 */
export class msdyn_GetSequenceAnalyticsKPIsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSequenceAnalyticsKPIsResult) {
    super("msdyn_GetSequenceAnalyticsKPIs");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSequenceAnalyticsKPIsResponse {
    return new msdyn_GetSequenceAnalyticsKPIsResponse(data as msdyn_GetSequenceAnalyticsKPIsResult);
  }
}
