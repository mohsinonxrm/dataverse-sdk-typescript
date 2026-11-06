import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckIfEmailResponseTemplateEntityTypeMatch message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckIfEmailResponseTemplateEntityTypeMatch request message
 *
 * Web API Action: msdyn_CheckIfEmailResponseTemplateEntityTypeMatch
 */
export class msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequestParameters>;

  constructor(parameters: msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequestParameters = {}) {
    super("msdyn_CheckIfEmailResponseTemplateEntityTypeMatch", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfEmailResponseTemplateEntityTypeMatch`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CheckIfEmailResponseTemplateEntityTypeMatch action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfEmailResponseTemplateEntityTypeMatch response message
 *
 * `result` is the value the msdyn_CheckIfEmailResponseTemplateEntityTypeMatch action returns (see {@link msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResult}).
 */
export class msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResult) {
    super("msdyn_CheckIfEmailResponseTemplateEntityTypeMatch");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse {
    return new msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse(
      data as msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResult
    );
  }
}
