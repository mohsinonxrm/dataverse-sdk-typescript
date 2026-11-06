import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";

/**
 * msdyn_SuggestPrimaryForMergeAction request message
 *
 * Web API Action: msdyn_SuggestPrimaryForMergeAction
 */
export class msdyn_SuggestPrimaryForMergeActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SuggestPrimaryForMergeActionResponse>
{
  constructor(public recordList?: Record<string, unknown>[]) {
    super("msdyn_SuggestPrimaryForMergeAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SuggestPrimaryForMergeAction`;

    const body: Record<string, unknown> = {
      RecordList: this.recordList,
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

  async parseResponse(response: Response): Promise<msdyn_SuggestPrimaryForMergeActionResponse> {
    const data = await response.json();
    return msdyn_SuggestPrimaryForMergeActionResponse.fromResponse(data);
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
