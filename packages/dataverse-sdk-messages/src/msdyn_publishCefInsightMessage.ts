import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_publishCefInsightResponse as msdyn_publishCefInsightResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_publishCefInsight message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_publishCefInsightRequestParameters {
  msdyn_entityLogicalName?: string;
  msdyn_cefinsightid: string;
  msdyn_requestOptions?: string;
  msdyn_chatId: string;
  msdyn_entityId?: string;
  msdyn_insightinfo?: string;
  msdyn_requestId: string;
  msdyn_insightId?: string;
}

/**
 * msdyn_publishCefInsight request message
 *
 * Web API Action: msdyn_publishCefInsight
 */
export class msdyn_publishCefInsightRequest
  extends OrganizationRequest
  implements Executable<msdyn_publishCefInsightResponse>
{
  declare readonly Parameters: Readonly<msdyn_publishCefInsightRequestParameters>;

  constructor(parameters: msdyn_publishCefInsightRequestParameters) {
    super("msdyn_publishCefInsight", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_publishCefInsight`;

    const body = requestBody({
      msdyn_entityLogicalName: this.Parameters.msdyn_entityLogicalName,
      msdyn_cefinsightid: this.Parameters.msdyn_cefinsightid,
      msdyn_requestOptions: this.Parameters.msdyn_requestOptions,
      msdyn_chatId: this.Parameters.msdyn_chatId,
      msdyn_entityId: this.Parameters.msdyn_entityId,
      msdyn_insightinfo: this.Parameters.msdyn_insightinfo,
      msdyn_requestId: this.Parameters.msdyn_requestId,
      msdyn_insightId: this.Parameters.msdyn_insightId,
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

  async parseResponse(response: Response): Promise<msdyn_publishCefInsightResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_publishCefInsightResponse.fromResponse({});
    return msdyn_publishCefInsightResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_publishCefInsight response message
 */
export class msdyn_publishCefInsightResponse extends OrganizationResponse {
  constructor(public result: msdyn_publishCefInsightResponseData) {
    super("msdyn_publishCefInsight");
  }

  static fromResponse(data: unknown): msdyn_publishCefInsightResponse {
    return new msdyn_publishCefInsightResponse(
      responseObject<msdyn_publishCefInsightResponseData>(data)
    );
  }
}
