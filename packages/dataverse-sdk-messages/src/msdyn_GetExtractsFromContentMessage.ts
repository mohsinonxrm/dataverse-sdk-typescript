import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetExtractsFromContentResponse as msdyn_GetExtractsFromContentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetExtractsFromContent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetExtractsFromContentRequestParameters {
  msdyn_activityId?: string;
  msdyn_userQuery?: string;
  msdyn_source?: string;
  msdyn_top?: number;
  msdyn_extractOperationInputParams?: string;
  msdyn_keywords?: string;
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
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_userQuery: this.Parameters.msdyn_userQuery,
      msdyn_source: this.Parameters.msdyn_source,
      msdyn_top: this.Parameters.msdyn_top,
      msdyn_extractOperationInputParams: this.Parameters.msdyn_extractOperationInputParams,
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

  async parseResponse(response: Response): Promise<msdyn_GetExtractsFromContentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetExtractsFromContentResponse.fromResponse({});
    return msdyn_GetExtractsFromContentResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetExtractsFromContent response message
 */
export class msdyn_GetExtractsFromContentResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetExtractsFromContentResponseData) {
    super("msdyn_GetExtractsFromContent");
  }

  static fromResponse(data: unknown): msdyn_GetExtractsFromContentResponse {
    return new msdyn_GetExtractsFromContentResponse(
      responseObject<msdyn_GetExtractsFromContentResponseData>(data)
    );
  }
}
