import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SuggestPrimaryForMergeAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SuggestPrimaryForMergeActionRequestParameters {
  RecordList?: Record<string, unknown>[];
}

/**
 * msdyn_SuggestPrimaryForMergeAction request message
 *
 * Web API Action: msdyn_SuggestPrimaryForMergeAction
 */
export class msdyn_SuggestPrimaryForMergeActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SuggestPrimaryForMergeActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SuggestPrimaryForMergeActionRequestParameters>;

  constructor(parameters: msdyn_SuggestPrimaryForMergeActionRequestParameters = {}) {
    super("msdyn_SuggestPrimaryForMergeAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SuggestPrimaryForMergeAction`;

    const body = requestBody({
      RecordList: this.Parameters.RecordList,
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

  async parseResponse(response: Response): Promise<msdyn_SuggestPrimaryForMergeActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SuggestPrimaryForMergeActionResponse.fromResponse({});
    return msdyn_SuggestPrimaryForMergeActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SuggestPrimaryForMergeAction response message
 */
export class msdyn_SuggestPrimaryForMergeActionResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("msdyn_SuggestPrimaryForMergeAction");
  }

  static fromResponse(data: unknown): msdyn_SuggestPrimaryForMergeActionResponse {
    return new msdyn_SuggestPrimaryForMergeActionResponse(
      responseObject<Record<string, unknown>>(data)
    );
  }
}
