import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetODOSMetadata request message
 *
 * Web API Action: msdyn_GetODOSMetadata
 */
export class msdyn_GetODOSMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetODOSMetadataResponse>
{
  constructor() {
    super("msdyn_GetODOSMetadata");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetODOSMetadata`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetODOSMetadataResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetODOSMetadataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetODOSMetadata action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetODOSMetadataResult {
  "@odata.context"?: string;
  Metadata: string;
}

/**
 * msdyn_GetODOSMetadata response message
 *
 * `result` is the value the msdyn_GetODOSMetadata action returns (see {@link msdyn_GetODOSMetadataResult}).
 */
export class msdyn_GetODOSMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetODOSMetadataResult) {
    super("msdyn_GetODOSMetadata");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetODOSMetadataResponse {
    return new msdyn_GetODOSMetadataResponse(data as msdyn_GetODOSMetadataResult);
  }
}
