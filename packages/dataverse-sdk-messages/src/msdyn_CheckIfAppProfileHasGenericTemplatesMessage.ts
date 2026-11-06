import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfAppProfileHasGenericTemplatesResponse as msdyn_CheckIfAppProfileHasGenericTemplatesResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfAppProfileHasGenericTemplates request message
 *
 * Web API Action: msdyn_CheckIfAppProfileHasGenericTemplates
 */
export class msdyn_CheckIfAppProfileHasGenericTemplatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfAppProfileHasGenericTemplatesResponse>
{
  constructor() {
    super("msdyn_CheckIfAppProfileHasGenericTemplates");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfAppProfileHasGenericTemplates`;

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
  ): Promise<msdyn_CheckIfAppProfileHasGenericTemplatesResponse> {
    const data = await response.json();
    return msdyn_CheckIfAppProfileHasGenericTemplatesResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckIfAppProfileHasGenericTemplates response message
 */
export class msdyn_CheckIfAppProfileHasGenericTemplatesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfAppProfileHasGenericTemplatesResponseData) {
    super("msdyn_CheckIfAppProfileHasGenericTemplates");
  }

  static fromResponse(data: unknown): msdyn_CheckIfAppProfileHasGenericTemplatesResponse {
    return new msdyn_CheckIfAppProfileHasGenericTemplatesResponse(
      responseObject<msdyn_CheckIfAppProfileHasGenericTemplatesResponseData>(data)
    );
  }
}
