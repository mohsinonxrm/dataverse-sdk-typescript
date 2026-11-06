import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SummarySynthesizerStatusResponse as msdyn_SummarySynthesizerStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SummarySynthesizerStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SummarySynthesizerStatusRequestParameters {
  LeadId: string;
}

/**
 * msdyn_SummarySynthesizerStatus request message
 *
 * Web API Action: msdyn_SummarySynthesizerStatus
 */
export class msdyn_SummarySynthesizerStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SummarySynthesizerStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SummarySynthesizerStatusRequestParameters>;

  constructor(parameters: msdyn_SummarySynthesizerStatusRequestParameters) {
    super("msdyn_SummarySynthesizerStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SummarySynthesizerStatus`;

    const body = requestBody({
      LeadId: this.Parameters.LeadId,
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

  async parseResponse(response: Response): Promise<msdyn_SummarySynthesizerStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SummarySynthesizerStatusResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SummarySynthesizerStatus response message
 */
export class msdyn_SummarySynthesizerStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SummarySynthesizerStatusResponseData) {
    super("msdyn_SummarySynthesizerStatus");
  }

  static fromResponse(data: unknown): msdyn_SummarySynthesizerStatusResponse {
    return new msdyn_SummarySynthesizerStatusResponse(
      responseObject<msdyn_SummarySynthesizerStatusResponseData>(data)
    );
  }
}
