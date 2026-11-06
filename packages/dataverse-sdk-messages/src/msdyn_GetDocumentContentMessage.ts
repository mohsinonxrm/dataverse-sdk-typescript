import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetDocumentContentResponse as msdyn_GetDocumentContentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetDocumentContent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetDocumentContentRequestParameters {
  msdyn_documents: string;
  msdyn_activityId?: string;
  msdyn_type: string;
  msdyn_userQuery?: string;
  msdyn_shouldUpload?: boolean;
  msdyn_keywords?: string;
}

/**
 * msdyn_GetDocumentContent request message
 *
 * Web API Action: msdyn_GetDocumentContent
 */
export class msdyn_GetDocumentContentRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetDocumentContentResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetDocumentContentRequestParameters>;

  constructor(parameters: msdyn_GetDocumentContentRequestParameters) {
    super("msdyn_GetDocumentContent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDocumentContent`;

    const body = requestBody({
      msdyn_documents: this.Parameters.msdyn_documents,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_type: this.Parameters.msdyn_type,
      msdyn_userQuery: this.Parameters.msdyn_userQuery,
      msdyn_shouldUpload: this.Parameters.msdyn_shouldUpload,
      msdyn_keywords: this.Parameters.msdyn_keywords,
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

  async parseResponse(response: Response): Promise<msdyn_GetDocumentContentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetDocumentContentResponse.fromResponse(text ? JSON.parse(text) : {});
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
