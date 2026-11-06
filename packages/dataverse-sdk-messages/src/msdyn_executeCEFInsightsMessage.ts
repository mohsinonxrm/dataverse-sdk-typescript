import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_executeCEFInsightsResponse as msdyn_executeCEFInsightsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_executeCEFInsights message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_executeCEFInsightsRequestParameters {
  msdyn_entityId?: string;
  msdyn_insightRetrievalMode?: string;
  msdyn_requestId?: string;
  msdyn_resultPreference?: string;
  msdyn_insightIdsJson?: string;
  msdyn_requestOptions?: string;
  msdyn_entityLogicalName?: string;
}

/**
 * msdyn_executeCEFInsights request message
 *
 * Web API Action: msdyn_executeCEFInsights
 */
export class msdyn_executeCEFInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_executeCEFInsightsResponse>
{
  declare readonly Parameters: Readonly<msdyn_executeCEFInsightsRequestParameters>;

  constructor(parameters: msdyn_executeCEFInsightsRequestParameters = {}) {
    super("msdyn_executeCEFInsights", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_executeCEFInsights`;

    const body = requestBody({
      msdyn_entityId: this.Parameters.msdyn_entityId,
      msdyn_insightRetrievalMode: this.Parameters.msdyn_insightRetrievalMode,
      msdyn_requestId: this.Parameters.msdyn_requestId,
      msdyn_resultPreference: this.Parameters.msdyn_resultPreference,
      msdyn_insightIdsJson: this.Parameters.msdyn_insightIdsJson,
      msdyn_requestOptions: this.Parameters.msdyn_requestOptions,
      msdyn_entityLogicalName: this.Parameters.msdyn_entityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_executeCEFInsightsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_executeCEFInsightsResponse.fromResponse({});
    return msdyn_executeCEFInsightsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_executeCEFInsights response message
 */
export class msdyn_executeCEFInsightsResponse extends OrganizationResponse {
  constructor(public result: msdyn_executeCEFInsightsResponseData) {
    super("msdyn_executeCEFInsights");
  }

  static fromResponse(data: unknown): msdyn_executeCEFInsightsResponse {
    return new msdyn_executeCEFInsightsResponse(
      responseObject<msdyn_executeCEFInsightsResponseData>(data)
    );
  }
}
