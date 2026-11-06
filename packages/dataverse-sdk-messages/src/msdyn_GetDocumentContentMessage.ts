import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetDocumentContent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetDocumentContentRequestParameters {
  msdyn_activityId?: string;
  msdyn_keywords?: string;
  msdyn_documents: string;
  msdyn_userQuery?: string;
  msdyn_shouldUpload?: boolean;
  msdyn_type: string;
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
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_keywords: this.Parameters.msdyn_keywords,
      msdyn_documents: this.Parameters.msdyn_documents,
      msdyn_userQuery: this.Parameters.msdyn_userQuery,
      msdyn_shouldUpload: this.Parameters.msdyn_shouldUpload,
      msdyn_type: this.Parameters.msdyn_type,
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
    // The body is the complex value, with its @odata.context
    return msdyn_GetDocumentContentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetDocumentContent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetDocumentContentResult {
  "@odata.context"?: string;
  msdyn_data: string;
  msdyn_mdlDetails: string;
}

/**
 * msdyn_GetDocumentContent response message
 *
 * `result` is the value the msdyn_GetDocumentContent action returns (see {@link msdyn_GetDocumentContentResult}).
 */
export class msdyn_GetDocumentContentResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetDocumentContentResult) {
    super("msdyn_GetDocumentContent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetDocumentContentResponse {
    return new msdyn_GetDocumentContentResponse(data as msdyn_GetDocumentContentResult);
  }
}
