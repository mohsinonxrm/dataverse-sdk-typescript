import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_draftCefInsightResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_draftCefInsight action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_draftCefInsightResult {
  "@odata.context"?: string;
  msdyn_jobId: string;
  msdyn_responseStatus: string;
}

/**
 * msdyn_draftCefInsight response message
 *
 * `result` is the value the msdyn_draftCefInsight action returns (see {@link msdyn_draftCefInsightResult}).
 */
export class msdyn_draftCefInsightResponse extends OrganizationResponse {
  constructor(public result: msdyn_draftCefInsightResult) {
    super("msdyn_draftCefInsight");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_draftCefInsightResponse {
    return new msdyn_draftCefInsightResponse(data as msdyn_draftCefInsightResult);
  }
}
