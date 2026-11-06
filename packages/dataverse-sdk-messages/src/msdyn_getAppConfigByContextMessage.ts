import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_getAppConfigByContextResponse as msdyn_getAppConfigByContextResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_getAppConfigByContext message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getAppConfigByContextRequestParameters {
  AppUniqueName: string;
  UserId?: string;
  Roles?: string;
  FormFactor?: number;
}

/**
 * msdyn_getAppConfigByContext request message
 *
 * Web API Action: msdyn_getAppConfigByContext
 */
export class msdyn_getAppConfigByContextRequest
  extends OrganizationRequest
  implements Executable<msdyn_getAppConfigByContextResponse>
{
  declare readonly Parameters: Readonly<msdyn_getAppConfigByContextRequestParameters>;

  constructor(parameters: msdyn_getAppConfigByContextRequestParameters) {
    super("msdyn_getAppConfigByContext", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getAppConfigByContext`;

    const body = requestBody({
      AppUniqueName: this.Parameters.AppUniqueName,
      UserId: this.Parameters.UserId,
      Roles: this.Parameters.Roles,
      FormFactor: this.Parameters.FormFactor,
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

  async parseResponse(response: Response): Promise<msdyn_getAppConfigByContextResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_getAppConfigByContextResponse.fromResponse(text ? JSON.parse(text) : {});
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
