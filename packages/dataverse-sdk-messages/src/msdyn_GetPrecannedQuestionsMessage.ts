import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetPrecannedQuestionsResponse as msdyn_GetPrecannedQuestionsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetPrecannedQuestions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetPrecannedQuestionsRequestParameters {
  msdyn_industry?: string;
}

/**
 * msdyn_GetPrecannedQuestions request message
 *
 * Web API Action: msdyn_GetPrecannedQuestions
 */
export class msdyn_GetPrecannedQuestionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPrecannedQuestionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetPrecannedQuestionsRequestParameters>;

  constructor(parameters: msdyn_GetPrecannedQuestionsRequestParameters = {}) {
    super("msdyn_GetPrecannedQuestions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPrecannedQuestions`;

    const body = requestBody({
      msdyn_industry: this.Parameters.msdyn_industry,
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

  async parseResponse(response: Response): Promise<msdyn_GetPrecannedQuestionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetPrecannedQuestionsResponse.fromResponse({});
    return msdyn_GetPrecannedQuestionsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetPrecannedQuestions response message
 */
export class msdyn_GetPrecannedQuestionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPrecannedQuestionsResponseData) {
    super("msdyn_GetPrecannedQuestions");
  }

  static fromResponse(data: unknown): msdyn_GetPrecannedQuestionsResponse {
    return new msdyn_GetPrecannedQuestionsResponse(
      responseObject<msdyn_GetPrecannedQuestionsResponseData>(data)
    );
  }
}
