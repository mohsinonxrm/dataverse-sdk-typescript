import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAnswerFromDocumentsResponse as msdyn_SalesAnswerFromDocumentsResponseData } from "./types/index.js";

/**
 * msdyn_SalesAnswerFromDocuments request message
 *
 * Web API Action: msdyn_SalesAnswerFromDocuments
 */
export class msdyn_SalesAnswerFromDocumentsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAnswerFromDocumentsResponse>
{
  constructor(
    public msdyn_queryLocale: string,
    public msdyn_responseFormat: string,
    public msdyn_userQuery: string,
    public msdyn_additionalParameters: string,
    public msdyn_activityId: string
  ) {
    super("msdyn_SalesAnswerFromDocuments");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAnswerFromDocuments`;

    const body: Record<string, unknown> = {
      msdyn_queryLocale: this.msdyn_queryLocale,
      msdyn_responseFormat: this.msdyn_responseFormat,
      msdyn_userQuery: this.msdyn_userQuery,
      msdyn_additionalParameters: this.msdyn_additionalParameters,
      msdyn_activityId: this.msdyn_activityId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAnswerFromDocumentsResponse> {
    const data = await response.json();
    return msdyn_SalesAnswerFromDocumentsResponse.fromResponse(data);
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
