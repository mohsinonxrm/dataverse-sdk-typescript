import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForRemovedFormLibrariesResponse as msdyn_CheckForRemovedFormLibrariesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForRemovedFormLibraries message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForRemovedFormLibrariesRequestParameters {
  SolutionId: string;
  ExcludeFormIds: string;
}

/**
 * msdyn_CheckForRemovedFormLibraries request message
 *
 * Web API Action: msdyn_CheckForRemovedFormLibraries
 */
export class msdyn_CheckForRemovedFormLibrariesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForRemovedFormLibrariesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForRemovedFormLibrariesRequestParameters>;

  constructor(parameters: msdyn_CheckForRemovedFormLibrariesRequestParameters) {
    super("msdyn_CheckForRemovedFormLibraries", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRemovedFormLibraries`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
      ExcludeFormIds: this.Parameters.ExcludeFormIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForRemovedFormLibrariesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckForRemovedFormLibrariesResponse.fromResponse({});
    return msdyn_CheckForRemovedFormLibrariesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckForRemovedFormLibraries response message
 */
export class msdyn_CheckForRemovedFormLibrariesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForRemovedFormLibrariesResponseData) {
    super("msdyn_CheckForRemovedFormLibraries");
  }

  static fromResponse(data: unknown): msdyn_CheckForRemovedFormLibrariesResponse {
    return new msdyn_CheckForRemovedFormLibrariesResponse(
      responseObject<msdyn_CheckForRemovedFormLibrariesResponseData>(data)
    );
  }
}
