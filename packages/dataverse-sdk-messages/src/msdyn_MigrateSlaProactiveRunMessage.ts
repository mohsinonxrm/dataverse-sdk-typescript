import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_MigrateSlaProactiveRunResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_MigrateSlaProactiveRun action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MigrateSlaProactiveRunResult {
  "@odata.context"?: string;
  Exception: string;
  OutputString: string;
}

/**
 * msdyn_MigrateSlaProactiveRun response message
 *
 * `result` is the value the msdyn_MigrateSlaProactiveRun action returns (see {@link msdyn_MigrateSlaProactiveRunResult}).
 */
export class msdyn_MigrateSlaProactiveRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_MigrateSlaProactiveRunResult) {
    super("msdyn_MigrateSlaProactiveRun");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_MigrateSlaProactiveRunResponse {
    return new msdyn_MigrateSlaProactiveRunResponse(data as msdyn_MigrateSlaProactiveRunResult);
  }
}
