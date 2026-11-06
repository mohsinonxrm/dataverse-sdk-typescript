import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAccountCatchupResponse as msdyn_SalesAccountCatchupResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAccountCatchup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAccountCatchupRequestParameters {
  msdyn_id: string;
  msdyn_sessionId?: string;
  msdyn_responseFormat?: string;
  msdyn_activityId?: string;
  msdyn_since?: string;
  msdyn_skipHeader?: string;
  msdyn_additionalParams?: string;
}

/**
 * msdyn_SalesAccountCatchup request message
 *
 * Web API Action: msdyn_SalesAccountCatchup
 */
export class msdyn_SalesAccountCatchupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAccountCatchupResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAccountCatchupRequestParameters>;

  constructor(parameters: msdyn_SalesAccountCatchupRequestParameters) {
    super("msdyn_SalesAccountCatchup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAccountCatchup`;

    const body = requestBody({
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_sessionId: this.Parameters.msdyn_sessionId,
      msdyn_responseFormat: this.Parameters.msdyn_responseFormat,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_since: this.Parameters.msdyn_since,
      msdyn_skipHeader: this.Parameters.msdyn_skipHeader,
      msdyn_additionalParams: this.Parameters.msdyn_additionalParams,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAccountCatchupResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAccountCatchupResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SalesAccountCatchup response message
 */
export class msdyn_SalesAccountCatchupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAccountCatchupResponseData) {
    super("msdyn_SalesAccountCatchup");
  }

  static fromResponse(data: unknown): msdyn_SalesAccountCatchupResponse {
    return new msdyn_SalesAccountCatchupResponse(
      responseObject<msdyn_SalesAccountCatchupResponseData>(data)
    );
  }
}
