import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_MigrateArcProactiveRunResponse as msdyn_MigrateArcProactiveRunResponseData } from "./types/index.js";

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
    const data = await response.json();
    return msdyn_MigrateArcProactiveRunResponse.fromResponse(data);
  }
}

/**
 * msdyn_MigrateArcProactiveRun response message
 */
export class msdyn_MigrateArcProactiveRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_MigrateArcProactiveRunResponseData) {
    super("msdyn_MigrateArcProactiveRun");
  }

  static fromResponse(data: unknown): msdyn_MigrateArcProactiveRunResponse {
    return new msdyn_MigrateArcProactiveRunResponse(
      responseObject<msdyn_MigrateArcProactiveRunResponseData>(data)
    );
  }
}
