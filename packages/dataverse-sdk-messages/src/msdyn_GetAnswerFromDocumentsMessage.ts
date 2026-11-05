import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAnswerFromDocumentsResponse as msdyn_GetAnswerFromDocumentsResponseData } from "./types/index.js";

/**
 * msdyn_GetAnswerFromDocuments request message
 *
 * Web API Action: msdyn_GetAnswerFromDocuments
 */
export class msdyn_GetAnswerFromDocumentsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAnswerFromDocumentsResponse>
{
  constructor(
    public msdyn_activityId: string,
    public msdyn_updatedUserQuery: string,
    public msdyn_documentUrl: string
  ) {
    super("msdyn_GetAnswerFromDocuments");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAnswerFromDocuments`;

    const body: Record<string, unknown> = {
      msdyn_activityId: this.msdyn_activityId,
      msdyn_updatedUserQuery: this.msdyn_updatedUserQuery,
      msdyn_documentUrl: this.msdyn_documentUrl,
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

  async parseResponse(response: Response): Promise<msdyn_GetAnswerFromDocumentsResponse> {
    const data = await response.json();
    return msdyn_GetAnswerFromDocumentsResponse.fromResponse(data);
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
