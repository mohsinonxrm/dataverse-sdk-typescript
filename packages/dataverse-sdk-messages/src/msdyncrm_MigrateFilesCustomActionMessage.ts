import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyncrm_MigrateFilesCustomAction request message
 *
 * Web API Action: msdyncrm_MigrateFilesCustomAction
 */
export class msdyncrm_MigrateFilesCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyncrm_MigrateFilesCustomActionResponse>
{
  constructor() {
    super("msdyncrm_MigrateFilesCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyncrm_MigrateFilesCustomAction`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyncrm_MigrateFilesCustomActionResponse> {
    // No return value (204 No Content)
    return new msdyncrm_MigrateFilesCustomActionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyncrm_MigrateFilesCustomAction response message
 */
export class msdyncrm_MigrateFilesCustomActionResponse extends OrganizationResponse {
  constructor() {
    super("msdyncrm_MigrateFilesCustomAction");
  }

  static fromResponse(_data: unknown): msdyncrm_MigrateFilesCustomActionResponse {
    return new msdyncrm_MigrateFilesCustomActionResponse();
  }
}
