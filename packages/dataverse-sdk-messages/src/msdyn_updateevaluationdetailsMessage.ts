import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_updateevaluationdetailsResponse as msdyn_updateevaluationdetailsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_updateevaluationdetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_updateevaluationdetailsRequestParameters {
  msdyn_evaluationdetails: string;
}

/**
 * msdyn_updateevaluationdetails request message
 *
 * Web API Action: msdyn_updateevaluationdetails
 */
export class msdyn_updateevaluationdetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_updateevaluationdetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_updateevaluationdetailsRequestParameters>;

  constructor(parameters: msdyn_updateevaluationdetailsRequestParameters) {
    super("msdyn_updateevaluationdetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updateevaluationdetails`;

    const body = requestBody({
      msdyn_evaluationdetails: this.Parameters.msdyn_evaluationdetails,
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

  async parseResponse(response: Response): Promise<msdyn_updateevaluationdetailsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_updateevaluationdetailsResponse.fromResponse({});
    return msdyn_updateevaluationdetailsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_updateevaluationdetails response message
 */
export class msdyn_updateevaluationdetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_updateevaluationdetailsResponseData) {
    super("msdyn_updateevaluationdetails");
  }

  static fromResponse(data: unknown): msdyn_updateevaluationdetailsResponse {
    return new msdyn_updateevaluationdetailsResponse(
      responseObject<msdyn_updateevaluationdetailsResponseData>(data)
    );
  }
}
