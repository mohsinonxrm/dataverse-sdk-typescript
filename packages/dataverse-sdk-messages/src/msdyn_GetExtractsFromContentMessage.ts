import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetExtractsFromContentResponse as msdyn_GetExtractsFromContentResponseData } from "./types/index.js";

/**
 * msdyn_GetExtractsFromContent request message
 *
 * Web API Action: msdyn_GetExtractsFromContent
 */
export class msdyn_GetExtractsFromContentRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetExtractsFromContentResponse>
{
  constructor(
    public msdyn_activityId: string,
    public msdyn_userQuery: string,
    public msdyn_source: string,
    public msdyn_top: number,
    public msdyn_extractOperationInputParams: string,
    public msdyn_keywords: string
  ) {
    super("msdyn_GetExtractsFromContent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetExtractsFromContent`;

    const body: Record<string, unknown> = {
      msdyn_activityId: this.msdyn_activityId,
      msdyn_userQuery: this.msdyn_userQuery,
      msdyn_source: this.msdyn_source,
      msdyn_top: this.msdyn_top,
      msdyn_extractOperationInputParams: this.msdyn_extractOperationInputParams,
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

  async parseResponse(response: Response): Promise<msdyn_GetExtractsFromContentResponse> {
    const data = await response.json();
    return msdyn_GetExtractsFromContentResponse.fromResponse(data);
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
