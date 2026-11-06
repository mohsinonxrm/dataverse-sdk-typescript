import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_updateevaluationdetailsResponse as msdyn_updateevaluationdetailsResponseData } from "./types/index.js";

/**
 * msdyn_updateevaluationdetails request message
 *
 * Web API Action: msdyn_updateevaluationdetails
 */
export class msdyn_updateevaluationdetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_updateevaluationdetailsResponse>
{
  constructor(public msdyn_evaluationdetails: string) {
    super("msdyn_updateevaluationdetails");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updateevaluationdetails`;

    const body: Record<string, unknown> = {
      msdyn_evaluationdetails: this.msdyn_evaluationdetails,
    };

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
    const data = await response.json();
    return msdyn_updateevaluationdetailsResponse.fromResponse(data);
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
