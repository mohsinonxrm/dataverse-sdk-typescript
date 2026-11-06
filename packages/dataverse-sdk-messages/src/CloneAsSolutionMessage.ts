import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CloneAsSolution message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloneAsSolutionRequestParameters {
  ParentSolutionUniqueName: string;
  DisplayName: string;
  VersionNumber: string;
}

/**
 * CloneAsSolution request message
 *
 * Web API Action: CloneAsSolution
 */
export class CloneAsSolutionRequest
  extends OrganizationRequest
  implements Executable<CloneAsSolutionResponse>
{
  declare readonly Parameters: Readonly<CloneAsSolutionRequestParameters>;

  constructor(parameters: CloneAsSolutionRequestParameters) {
    super("CloneAsSolution", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloneAsSolution`;

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

  async parseResponse(response: Response): Promise<CloneAsSolutionResponse> {
    // The body is the complex value, with its @odata.context
    return CloneAsSolutionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CloneAsSolution action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CloneAsSolutionResult {
  "@odata.context"?: string;
  SolutionId: string;
}

/**
 * CloneAsSolution response message
 *
 * `result` is the value the CloneAsSolution action returns (see {@link CloneAsSolutionResult}).
 */
export class CloneAsSolutionResponse extends OrganizationResponse {
  constructor(public result: CloneAsSolutionResult) {
    super("CloneAsSolution");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CloneAsSolutionResponse {
    return new CloneAsSolutionResponse(data as CloneAsSolutionResult);
  }
}
