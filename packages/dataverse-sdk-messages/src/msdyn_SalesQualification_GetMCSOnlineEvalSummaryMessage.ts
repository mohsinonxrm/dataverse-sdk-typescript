import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse as msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesQualification_GetMCSOnlineEvalSummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesQualification_GetMCSOnlineEvalSummaryRequestParameters {
  UtcStartTime: string;
  UtcEndTime: string;
  BotSchemaName: string;
}

/**
 * msdyn_SalesQualification_GetMCSOnlineEvalSummary request message
 *
 * Web API Action: msdyn_SalesQualification_GetMCSOnlineEvalSummary
 */
export class msdyn_SalesQualification_GetMCSOnlineEvalSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesQualification_GetMCSOnlineEvalSummaryRequestParameters>;

  constructor(parameters: msdyn_SalesQualification_GetMCSOnlineEvalSummaryRequestParameters) {
    super("msdyn_SalesQualification_GetMCSOnlineEvalSummary", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesQualification_GetMCSOnlineEvalSummary`;

    const body = requestBody({
      UtcStartTime: this.Parameters.UtcStartTime,
      UtcEndTime: this.Parameters.UtcEndTime,
      BotSchemaName: this.Parameters.BotSchemaName,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse.fromResponse({});
    return msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesQualification_GetMCSOnlineEvalSummary response message
 */
export class msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponseData) {
    super("msdyn_SalesQualification_GetMCSOnlineEvalSummary");
  }

  static fromResponse(data: unknown): msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse {
    return new msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse(
      responseObject<msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponseData>(data)
    );
  }
}
