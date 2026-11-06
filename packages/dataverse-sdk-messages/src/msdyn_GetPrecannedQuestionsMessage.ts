import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetPrecannedQuestionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetPrecannedQuestions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetPrecannedQuestionsResult {
  "@odata.context"?: string;
  msdyn_csrescalationquestions: string;
  msdyn_errormessage: string;
  msdyn_selfservicequestions: string;
}

/**
 * msdyn_GetPrecannedQuestions response message
 *
 * `result` is the value the msdyn_GetPrecannedQuestions action returns (see {@link msdyn_GetPrecannedQuestionsResult}).
 */
export class msdyn_GetPrecannedQuestionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPrecannedQuestionsResult) {
    super("msdyn_GetPrecannedQuestions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetPrecannedQuestionsResponse {
    return new msdyn_GetPrecannedQuestionsResponse(data as msdyn_GetPrecannedQuestionsResult);
  }
}
