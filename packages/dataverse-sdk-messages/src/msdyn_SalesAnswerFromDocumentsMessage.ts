import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAnswerFromDocuments message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAnswerFromDocumentsRequestParameters {
  msdyn_queryLocale?: string;
  msdyn_activityId?: string;
  msdyn_responseFormat?: string;
  msdyn_additionalParameters?: string;
  msdyn_userQuery: string;
}

/**
 * msdyn_SalesAnswerFromDocuments request message
 *
 * Web API Action: msdyn_SalesAnswerFromDocuments
 */
export class msdyn_SalesAnswerFromDocumentsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAnswerFromDocumentsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAnswerFromDocumentsRequestParameters>;

  constructor(parameters: msdyn_SalesAnswerFromDocumentsRequestParameters) {
    super("msdyn_SalesAnswerFromDocuments", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAnswerFromDocuments`;

    const body = requestBody({
      msdyn_queryLocale: this.Parameters.msdyn_queryLocale,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_responseFormat: this.Parameters.msdyn_responseFormat,
      msdyn_additionalParameters: this.Parameters.msdyn_additionalParameters,
      msdyn_userQuery: this.Parameters.msdyn_userQuery,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAnswerFromDocumentsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAnswerFromDocumentsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAnswerFromDocuments action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAnswerFromDocumentsResult {
  "@odata.context"?: string;
  msdyn_sales_copilot_output: string;
}

/**
 * msdyn_SalesAnswerFromDocuments response message
 *
 * `result` is the value the msdyn_SalesAnswerFromDocuments action returns (see {@link msdyn_SalesAnswerFromDocumentsResult}).
 */
export class msdyn_SalesAnswerFromDocumentsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAnswerFromDocumentsResult) {
    super("msdyn_SalesAnswerFromDocuments");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAnswerFromDocumentsResponse {
    return new msdyn_SalesAnswerFromDocumentsResponse(data as msdyn_SalesAnswerFromDocumentsResult);
  }
}
