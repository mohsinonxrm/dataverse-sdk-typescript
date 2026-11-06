import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetExtractsFromContent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetExtractsFromContentRequestParameters {
  msdyn_extractOperationInputParams?: string;
  msdyn_userQuery?: string;
  msdyn_keywords?: string;
  msdyn_source?: string;
  msdyn_top?: number;
  msdyn_activityId?: string;
}

/**
 * msdyn_GetExtractsFromContent request message
 *
 * Web API Action: msdyn_GetExtractsFromContent
 */
export class msdyn_GetExtractsFromContentRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetExtractsFromContentResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetExtractsFromContentRequestParameters>;

  constructor(parameters: msdyn_GetExtractsFromContentRequestParameters = {}) {
    super("msdyn_GetExtractsFromContent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetExtractsFromContent`;

    const body = requestBody({
      msdyn_extractOperationInputParams: this.Parameters.msdyn_extractOperationInputParams,
      msdyn_userQuery: this.Parameters.msdyn_userQuery,
      msdyn_keywords: this.Parameters.msdyn_keywords,
      msdyn_source: this.Parameters.msdyn_source,
      msdyn_top: this.Parameters.msdyn_top,
      msdyn_activityId: this.Parameters.msdyn_activityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetExtractsFromContentResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetExtractsFromContentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetExtractsFromContent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetExtractsFromContentResult {
  "@odata.context"?: string;
  msdyn_documents: string;
  msdyn_mdlDetails: string;
}

/**
 * msdyn_GetExtractsFromContent response message
 *
 * `result` is the value the msdyn_GetExtractsFromContent action returns (see {@link msdyn_GetExtractsFromContentResult}).
 */
export class msdyn_GetExtractsFromContentResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetExtractsFromContentResult) {
    super("msdyn_GetExtractsFromContent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetExtractsFromContentResponse {
    return new msdyn_GetExtractsFromContentResponse(data as msdyn_GetExtractsFromContentResult);
  }
}
