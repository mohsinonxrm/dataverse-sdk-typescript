import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyncrm_GetFileAttributesFromConfiguration request message
 *
 * Web API Action: msdyncrm_GetFileAttributesFromConfiguration
 */
export class msdyncrm_GetFileAttributesFromConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyncrm_GetFileAttributesFromConfigurationResponse>
{
  constructor() {
    super("msdyncrm_GetFileAttributesFromConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyncrm_GetFileAttributesFromConfiguration`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyncrm_GetFileAttributesFromConfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyncrm_GetFileAttributesFromConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyncrm_GetFileAttributesFromConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyncrm_GetFileAttributesFromConfigurationResult {
  "@odata.context"?: string;
  AllowedFileTypesRegularExpression: string;
  MaxAssetSizeInBytesConfig: string;
  MaxFileSizeInBytes: string;
}

/**
 * msdyncrm_GetFileAttributesFromConfiguration response message
 *
 * `result` is the value the msdyncrm_GetFileAttributesFromConfiguration action returns (see {@link msdyncrm_GetFileAttributesFromConfigurationResult}).
 */
export class msdyncrm_GetFileAttributesFromConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyncrm_GetFileAttributesFromConfigurationResult) {
    super("msdyncrm_GetFileAttributesFromConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyncrm_GetFileAttributesFromConfigurationResponse {
    return new msdyncrm_GetFileAttributesFromConfigurationResponse(
      data as msdyncrm_GetFileAttributesFromConfigurationResult
    );
  }
}
