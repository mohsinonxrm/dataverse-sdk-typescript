import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetAnswerFromDocuments message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAnswerFromDocumentsRequestParameters {
  msdyn_activityId?: string;
  msdyn_updatedUserQuery?: string;
  msdyn_documentUrl: string;
}

/**
 * msdyn_GetAnswerFromDocuments request message
 *
 * Web API Action: msdyn_GetAnswerFromDocuments
 */
export class msdyn_GetAnswerFromDocumentsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAnswerFromDocumentsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAnswerFromDocumentsRequestParameters>;

  constructor(parameters: msdyn_GetAnswerFromDocumentsRequestParameters) {
    super("msdyn_GetAnswerFromDocuments", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAnswerFromDocuments`;

    const body = requestBody({
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_updatedUserQuery: this.Parameters.msdyn_updatedUserQuery,
      msdyn_documentUrl: this.Parameters.msdyn_documentUrl,
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

  async parseResponse(response: Response): Promise<msdyn_GetAnswerFromDocumentsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetAnswerFromDocumentsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAnswerFromDocuments action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAnswerFromDocumentsResult {
  "@odata.context"?: string;
  msdyn_answer: string;
  msdyn_answerRaw: string;
  msdyn_citations: string;
}

/**
 * msdyn_GetAnswerFromDocuments response message
 *
 * `result` is the value the msdyn_GetAnswerFromDocuments action returns (see {@link msdyn_GetAnswerFromDocumentsResult}).
 */
export class msdyn_GetAnswerFromDocumentsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAnswerFromDocumentsResult) {
    super("msdyn_GetAnswerFromDocuments");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAnswerFromDocumentsResponse {
    return new msdyn_GetAnswerFromDocumentsResponse(data as msdyn_GetAnswerFromDocumentsResult);
  }
}
