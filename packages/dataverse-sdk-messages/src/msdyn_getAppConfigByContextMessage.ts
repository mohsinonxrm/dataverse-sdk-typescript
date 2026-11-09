import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_getAppConfigByContextResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_getAppConfigByContext action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getAppConfigByContextResult {
  "@odata.context"?: string;
  AppConfigurationAssignment: string;
  AppConfigurations: string;
}

/**
 * msdyn_getAppConfigByContext response message
 *
 * `result` is the value the msdyn_getAppConfigByContext action returns (see {@link msdyn_getAppConfigByContextResult}).
 */
export class msdyn_getAppConfigByContextResponse extends OrganizationResponse {
  constructor(public result: msdyn_getAppConfigByContextResult) {
    super("msdyn_getAppConfigByContext");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_getAppConfigByContextResponse {
    return new msdyn_getAppConfigByContextResponse(data as msdyn_getAppConfigByContextResult);
  }
}
