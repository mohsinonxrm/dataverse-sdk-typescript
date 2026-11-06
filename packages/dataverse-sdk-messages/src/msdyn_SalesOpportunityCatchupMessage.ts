import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesOpportunityCatchupResponse as msdyn_SalesOpportunityCatchupResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesOpportunityCatchup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesOpportunityCatchupRequestParameters {
  msdyn_since?: string;
  msdyn_responseFormat?: string;
  msdyn_additionalParams?: string;
  msdyn_sessionId?: string;
  msdyn_activityId?: string;
  msdyn_skipHeader?: string;
  msdyn_id: string;
}

/**
 * msdyn_SalesOpportunityCatchup request message
 *
 * Web API Action: msdyn_SalesOpportunityCatchup
 */
export class msdyn_SalesOpportunityCatchupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesOpportunityCatchupResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesOpportunityCatchupRequestParameters>;

  constructor(parameters: msdyn_SalesOpportunityCatchupRequestParameters) {
    super("msdyn_SalesOpportunityCatchup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOpportunityCatchup`;

    const body = requestBody({
      msdyn_since: this.Parameters.msdyn_since,
      msdyn_responseFormat: this.Parameters.msdyn_responseFormat,
      msdyn_additionalParams: this.Parameters.msdyn_additionalParams,
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOpportunityCatchupResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SalesOpportunityCatchupResponse.fromResponse({});
    return msdyn_SalesOpportunityCatchupResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesOpportunityCatchup response message
 */
export class msdyn_SalesOpportunityCatchupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesOpportunityCatchupResponseData) {
    super("msdyn_SalesOpportunityCatchup");
  }

  static fromResponse(data: unknown): msdyn_SalesOpportunityCatchupResponse {
    return new msdyn_SalesOpportunityCatchupResponse(
      responseObject<msdyn_SalesOpportunityCatchupResponseData>(data)
    );
  }
}
