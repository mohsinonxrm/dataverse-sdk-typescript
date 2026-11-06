import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAnswerFromDocumentsResponse as msdyn_GetAnswerFromDocumentsResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetAnswerFromDocumentsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetAnswerFromDocuments response message
 */
export class msdyn_GetAnswerFromDocumentsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAnswerFromDocumentsResponseData) {
    super("msdyn_GetAnswerFromDocuments");
  }

  static fromResponse(data: unknown): msdyn_GetAnswerFromDocumentsResponse {
    return new msdyn_GetAnswerFromDocumentsResponse(
      responseObject<msdyn_GetAnswerFromDocumentsResponseData>(data)
    );
  }
}
