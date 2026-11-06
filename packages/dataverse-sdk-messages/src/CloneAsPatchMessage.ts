import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CloneAsPatch message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloneAsPatchRequestParameters {
  ParentSolutionUniqueName: string;
  DisplayName: string;
  VersionNumber: string;
}

/**
 * CloneAsPatch request message
 *
 * Web API Action: CloneAsPatch
 */
export class CloneAsPatchRequest
  extends OrganizationRequest
  implements Executable<CloneAsPatchResponse>
{
  declare readonly Parameters: Readonly<CloneAsPatchRequestParameters>;

  constructor(parameters: CloneAsPatchRequestParameters) {
    super("CloneAsPatch", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloneAsPatch`;

    const body = requestBody({
      ParentSolutionUniqueName: this.Parameters.ParentSolutionUniqueName,
      DisplayName: this.Parameters.DisplayName,
      VersionNumber: this.Parameters.VersionNumber,
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

  async parseResponse(response: Response): Promise<CloneAsPatchResponse> {
    // The body is the complex value, with its @odata.context
    return CloneAsPatchResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CloneAsPatch action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CloneAsPatchResult {
  "@odata.context"?: string;
  SolutionId: string;
}

/**
 * CloneAsPatch response message
 *
 * `result` is the value the CloneAsPatch action returns (see {@link CloneAsPatchResult}).
 */
export class CloneAsPatchResponse extends OrganizationResponse {
  constructor(public result: CloneAsPatchResult) {
    super("CloneAsPatch");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CloneAsPatchResponse {
    return new CloneAsPatchResponse(data as CloneAsPatchResult);
  }
}
