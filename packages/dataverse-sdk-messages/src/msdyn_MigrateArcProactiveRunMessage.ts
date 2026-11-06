import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_MigrateArcProactiveRun request message
 *
 * Web API Action: msdyn_MigrateArcProactiveRun
 */
export class msdyn_MigrateArcProactiveRunRequest
  extends OrganizationRequest
  implements Executable<msdyn_MigrateArcProactiveRunResponse>
{
  constructor() {
    super("msdyn_MigrateArcProactiveRun");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateArcProactiveRun`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MigrateArcProactiveRunResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_MigrateArcProactiveRunResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_MigrateArcProactiveRun action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MigrateArcProactiveRunResult {
  "@odata.context"?: string;
  Exception: string;
  OutputString: string;
}

/**
 * msdyn_MigrateArcProactiveRun response message
 *
 * `result` is the value the msdyn_MigrateArcProactiveRun action returns (see {@link msdyn_MigrateArcProactiveRunResult}).
 */
export class msdyn_MigrateArcProactiveRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_MigrateArcProactiveRunResult) {
    super("msdyn_MigrateArcProactiveRun");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_MigrateArcProactiveRunResponse {
    return new msdyn_MigrateArcProactiveRunResponse(data as msdyn_MigrateArcProactiveRunResult);
  }
}
