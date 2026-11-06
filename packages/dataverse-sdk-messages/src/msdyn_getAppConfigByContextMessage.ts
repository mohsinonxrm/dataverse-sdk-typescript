import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_getAppConfigByContextResponse as msdyn_getAppConfigByContextResponseData } from "./types/index.js";

/**
 * msdyn_getAppConfigByContext request message
 *
 * Web API Action: msdyn_getAppConfigByContext
 */
export class msdyn_getAppConfigByContextRequest
  extends OrganizationRequest
  implements Executable<msdyn_getAppConfigByContextResponse>
{
  constructor(
    public appUniqueName: string,
    public userId: string,
    public roles: string,
    public formFactor: number
  ) {
    super("msdyn_getAppConfigByContext");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getAppConfigByContext`;

    const body: Record<string, unknown> = {
      AppUniqueName: this.appUniqueName,
      UserId: this.userId,
      Roles: this.roles,
      FormFactor: this.formFactor,
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

  async parseResponse(response: Response): Promise<msdyn_getAppConfigByContextResponse> {
    const data = await response.json();
    return msdyn_getAppConfigByContextResponse.fromResponse(data);
  }
}

/**
 * msdyn_getAppConfigByContext response message
 */
export class msdyn_getAppConfigByContextResponse extends OrganizationResponse {
  constructor(public result: msdyn_getAppConfigByContextResponseData) {
    super("msdyn_getAppConfigByContext");
  }

  static fromResponse(data: unknown): msdyn_getAppConfigByContextResponse {
    return new msdyn_getAppConfigByContextResponse(
      responseObject<msdyn_getAppConfigByContextResponseData>(data)
    );
  }
}
