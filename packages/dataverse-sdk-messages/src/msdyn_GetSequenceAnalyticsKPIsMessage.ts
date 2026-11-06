import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSequenceAnalyticsKPIsResponse as msdyn_GetSequenceAnalyticsKPIsResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetSequenceAnalyticsKPIsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetSequenceAnalyticsKPIs response message
 */
export class msdyn_GetSequenceAnalyticsKPIsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSequenceAnalyticsKPIsResponseData) {
    super("msdyn_GetSequenceAnalyticsKPIs");
  }

  static fromResponse(data: unknown): msdyn_GetSequenceAnalyticsKPIsResponse {
    return new msdyn_GetSequenceAnalyticsKPIsResponse(
      responseObject<msdyn_GetSequenceAnalyticsKPIsResponseData>(data)
    );
  }
}
