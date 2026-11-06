import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesLeadCatchupResponse as msdyn_SalesLeadCatchupResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesLeadCatchup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesLeadCatchupRequestParameters {
  msdyn_since?: string;
  msdyn_sessionId?: string;
  msdyn_responseFormat?: string;
  msdyn_additionalParams?: string;
  msdyn_activityId?: string;
  msdyn_skipHeader?: string;
  msdyn_id: string;
}

/**
 * msdyn_SalesLeadCatchup request message
 *
 * Web API Action: msdyn_SalesLeadCatchup
 */
export class msdyn_SalesLeadCatchupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesLeadCatchupResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesLeadCatchupRequestParameters>;

  constructor(parameters: msdyn_SalesLeadCatchupRequestParameters) {
    super("msdyn_SalesLeadCatchup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesLeadCatchup`;

    const body = requestBody({
      msdyn_since: this.Parameters.msdyn_since,
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
      msdyn_responseFormat: this.Parameters.msdyn_responseFormat,
      msdyn_additionalParams: this.Parameters.msdyn_additionalParams,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_skipHeader: this.Parameters.msdyn_skipHeader,
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

  async parseResponse(response: Response): Promise<msdyn_SalesLeadCatchupResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SalesLeadCatchupResponse.fromResponse({});
    return msdyn_SalesLeadCatchupResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesLeadCatchup response message
 */
export class msdyn_SalesLeadCatchupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesLeadCatchupResponseData) {
    super("msdyn_SalesLeadCatchup");
  }

  static fromResponse(data: unknown): msdyn_SalesLeadCatchupResponse {
    return new msdyn_SalesLeadCatchupResponse(
      responseObject<msdyn_SalesLeadCatchupResponseData>(data)
    );
  }
}
