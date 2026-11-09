import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfAppProfileHasGenericTemplatesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfAppProfileHasGenericTemplates action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfAppProfileHasGenericTemplatesResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfAppProfileHasGenericTemplates response message
 *
 * `result` is the value the msdyn_CheckIfAppProfileHasGenericTemplates action returns (see {@link msdyn_CheckIfAppProfileHasGenericTemplatesResult}).
 */
export class msdyn_CheckIfAppProfileHasGenericTemplatesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfAppProfileHasGenericTemplatesResult) {
    super("msdyn_CheckIfAppProfileHasGenericTemplates");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfAppProfileHasGenericTemplatesResponse {
    return new msdyn_CheckIfAppProfileHasGenericTemplatesResponse(
      data as msdyn_CheckIfAppProfileHasGenericTemplatesResult
    );
  }
}
