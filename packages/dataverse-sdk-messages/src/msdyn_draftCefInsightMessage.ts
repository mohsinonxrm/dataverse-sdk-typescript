import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_draftCefInsightResponse as msdyn_draftCefInsightResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_draftCefInsight message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_draftCefInsightRequestParameters {
  msdyn_chatId: string;
  msdyn_insightId?: string;
  msdyn_insightinfo?: string;
  msdyn_requestOptions?: string;
  msdyn_requestId: string;
  msdyn_entityLogicalName?: string;
  msdyn_entityId?: string;
  msdyn_message: string;
}

/**
 * msdyn_draftCefInsight request message
 *
 * Web API Action: msdyn_draftCefInsight
 */
export class msdyn_draftCefInsightRequest
  extends OrganizationRequest
  implements Executable<msdyn_draftCefInsightResponse>
{
  declare readonly Parameters: Readonly<msdyn_draftCefInsightRequestParameters>;

  constructor(parameters: msdyn_draftCefInsightRequestParameters) {
    super("msdyn_draftCefInsight", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_draftCefInsight`;

    const body = requestBody({
      msdyn_chatId: this.Parameters.msdyn_chatId,
      msdyn_insightId: this.Parameters.msdyn_insightId,
      msdyn_insightinfo: this.Parameters.msdyn_insightinfo,
      msdyn_requestOptions: this.Parameters.msdyn_requestOptions,
      msdyn_requestId: this.Parameters.msdyn_requestId,
      msdyn_entityLogicalName: this.Parameters.msdyn_entityLogicalName,
      msdyn_entityId: this.Parameters.msdyn_entityId,
      msdyn_message: this.Parameters.msdyn_message,
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

  async parseResponse(response: Response): Promise<msdyn_draftCefInsightResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_draftCefInsightResponse.fromResponse({});
    return msdyn_draftCefInsightResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_draftCefInsight response message
 */
export class msdyn_draftCefInsightResponse extends OrganizationResponse {
  constructor(public result: msdyn_draftCefInsightResponseData) {
    super("msdyn_draftCefInsight");
  }

  static fromResponse(data: unknown): msdyn_draftCefInsightResponse {
    return new msdyn_draftCefInsightResponse(
      responseObject<msdyn_draftCefInsightResponseData>(data)
    );
  }
}
