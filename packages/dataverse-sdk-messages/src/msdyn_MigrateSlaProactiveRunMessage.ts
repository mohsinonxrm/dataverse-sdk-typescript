import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_MigrateSlaProactiveRunResponse as msdyn_MigrateSlaProactiveRunResponseData } from "./types/index.js";

/**
 * msdyn_MigrateSlaProactiveRun request message
 *
 * Web API Action: msdyn_MigrateSlaProactiveRun
 */
export class msdyn_MigrateSlaProactiveRunRequest
  extends OrganizationRequest
  implements Executable<msdyn_MigrateSlaProactiveRunResponse>
{
  constructor() {
    super("msdyn_MigrateSlaProactiveRun");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateSlaProactiveRun`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MigrateSlaProactiveRunResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_MigrateSlaProactiveRunResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_MigrateSlaProactiveRun response message
 */
export class msdyn_MigrateSlaProactiveRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_MigrateSlaProactiveRunResponseData) {
    super("msdyn_MigrateSlaProactiveRun");
  }

  static fromResponse(data: unknown): msdyn_MigrateSlaProactiveRunResponse {
    return new msdyn_MigrateSlaProactiveRunResponse(
      responseObject<msdyn_MigrateSlaProactiveRunResponseData>(data)
    );
  }
}
