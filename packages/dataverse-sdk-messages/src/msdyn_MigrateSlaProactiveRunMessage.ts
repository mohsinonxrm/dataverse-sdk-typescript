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
    const data = await response.json();
    return msdyn_MigrateSlaProactiveRunResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_MigrateSlaProactiveRun response message
 */
export class msdyn_MigrateSlaProactiveRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_MigrateSlaProactiveRunResponse) {
    super("msdyn_MigrateSlaProactiveRun");
  }

  static fromResponse(data: unknown): msdyn_MigrateSlaProactiveRunResponse {
    return new msdyn_MigrateSlaProactiveRunResponse((data as any).value);
  }
}
