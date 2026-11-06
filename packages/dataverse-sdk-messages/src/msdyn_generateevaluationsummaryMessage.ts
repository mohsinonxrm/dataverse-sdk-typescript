import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_generateevaluationsummaryResponse as msdyn_generateevaluationsummaryResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_generateevaluationsummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_generateevaluationsummaryRequestParameters {
  evaluationId: string;
}

/**
 * msdyn_generateevaluationsummary request message
 *
 * Web API Action: msdyn_generateevaluationsummary
 */
export class msdyn_generateevaluationsummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_generateevaluationsummaryResponse>
{
  declare readonly Parameters: Readonly<msdyn_generateevaluationsummaryRequestParameters>;

  constructor(parameters: msdyn_generateevaluationsummaryRequestParameters) {
    super("msdyn_generateevaluationsummary", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_generateevaluationsummary`;

    const body = requestBody({
      evaluationId: this.Parameters.evaluationId,
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

  async parseResponse(response: Response): Promise<msdyn_generateevaluationsummaryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_generateevaluationsummaryResponse.fromResponse({});
    return msdyn_generateevaluationsummaryResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_generateevaluationsummary response message
 */
export class msdyn_generateevaluationsummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_generateevaluationsummaryResponseData) {
    super("msdyn_generateevaluationsummary");
  }

  static fromResponse(data: unknown): msdyn_generateevaluationsummaryResponse {
    return new msdyn_generateevaluationsummaryResponse(
      responseObject<msdyn_generateevaluationsummaryResponseData>(data)
    );
  }
}
