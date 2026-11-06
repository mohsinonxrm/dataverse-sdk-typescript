import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAnswerFromDocumentsResponse as msdyn_SalesAnswerFromDocumentsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SalesAnswerFromDocumentsResponse.fromResponse({});
    return msdyn_SalesAnswerFromDocumentsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAnswerFromDocuments response message
 */
export class msdyn_SalesAnswerFromDocumentsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAnswerFromDocumentsResponseData) {
    super("msdyn_SalesAnswerFromDocuments");
  }

  static fromResponse(data: unknown): msdyn_SalesAnswerFromDocumentsResponse {
    return new msdyn_SalesAnswerFromDocumentsResponse(
      responseObject<msdyn_SalesAnswerFromDocumentsResponseData>(data)
    );
  }
}
