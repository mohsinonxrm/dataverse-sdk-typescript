import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse as msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfWorkstreamHasDeletedSessionTemplates request message
 *
 * Web API Action: msdyn_CheckIfWorkstreamHasDeletedSessionTemplates
 */
export class msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse>
{
  constructor() {
    super("msdyn_CheckIfWorkstreamHasDeletedSessionTemplates");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfWorkstreamHasDeletedSessionTemplates`;

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
  ): Promise<msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse.fromResponse({});
    return msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_CheckIfWorkstreamHasDeletedSessionTemplates response message
 */
export class msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponseData) {
    super("msdyn_CheckIfWorkstreamHasDeletedSessionTemplates");
  }

  static fromResponse(data: unknown): msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse {
    return new msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse(
      responseObject<msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponseData>(data)
    );
  }
}
