import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetDocumentContentResponse as msdyn_GetDocumentContentResponseData } from "./types/index.js";

/**
 * msdyn_GetDocumentContent request message
 *
 * Web API Action: msdyn_GetDocumentContent
 */
export class msdyn_GetDocumentContentRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetDocumentContentResponse>
{
  constructor(
    public msdyn_documents: string,
    public msdyn_activityId: string | undefined,
    public msdyn_type: string,
    public msdyn_userQuery?: string,
    public msdyn_shouldUpload?: boolean,
    public msdyn_keywords?: string
  ) {
    super("msdyn_GetDocumentContent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDocumentContent`;

    const body: Record<string, unknown> = {
      msdyn_documents: this.msdyn_documents,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_type: this.msdyn_type,
      msdyn_userQuery: this.msdyn_userQuery,
      msdyn_shouldUpload: this.msdyn_shouldUpload,
      msdyn_keywords: this.msdyn_keywords,
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

  async parseResponse(response: Response): Promise<msdyn_GetDocumentContentResponse> {
    const data = await response.json();
    return msdyn_GetDocumentContentResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetDocumentContent response message
 */
export class msdyn_GetDocumentContentResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetDocumentContentResponseData) {
    super("msdyn_GetDocumentContent");
  }

  static fromResponse(data: unknown): msdyn_GetDocumentContentResponse {
    return new msdyn_GetDocumentContentResponse(
      responseObject<msdyn_GetDocumentContentResponseData>(data)
    );
  }
}
