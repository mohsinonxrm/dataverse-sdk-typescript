import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_MigrateSlaResponse as msdyn_MigrateSlaResponseData } from "./types/index.js";

/**
 * msdyn_MigrateSla request message
 *
 * Web API Action: msdyn_MigrateSla
 */
export class msdyn_MigrateSlaRequest
  extends OrganizationRequest
  implements Executable<msdyn_MigrateSlaResponse>
{
  constructor(public slaMigrationRequest: string) {
    super("msdyn_MigrateSla");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateSla`;

    const body: Record<string, unknown> = {
      SlaMigrationRequest: this.slaMigrationRequest,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateSlaResponse> {
    const data = await response.json();
    return msdyn_MigrateSlaResponse.fromResponse(data);
  }
}

/**
 * msdyn_MigrateSla response message
 */
export class msdyn_MigrateSlaResponse extends OrganizationResponse {
  constructor(public result: msdyn_MigrateSlaResponseData) {
    super("msdyn_MigrateSla");
  }

  static fromResponse(data: unknown): msdyn_MigrateSlaResponse {
    return new msdyn_MigrateSlaResponse(responseObject<msdyn_MigrateSlaResponseData>(data));
  }
}
