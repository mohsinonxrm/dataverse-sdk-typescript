import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CheckIfWorkstreamHasDeletedSessionTemplates action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfWorkstreamHasDeletedSessionTemplates response message
 *
 * `result` is the value the msdyn_CheckIfWorkstreamHasDeletedSessionTemplates action returns (see {@link msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResult}).
 */
export class msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResult) {
    super("msdyn_CheckIfWorkstreamHasDeletedSessionTemplates");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse {
    return new msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse(
      data as msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResult
    );
  }
}
