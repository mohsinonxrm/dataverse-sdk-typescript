import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { StageSolutionResults } from "./types/index.js";

/**
 * Parameters of the StageSolution message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface StageSolutionRequestParameters {
  CustomizationFile: string;
  StageSolutionUploadId?: string;
}

/**
 * StageSolution request message
 *
 * Web API Action: StageSolution
 */
export class StageSolutionRequest
  extends OrganizationRequest
  implements Executable<StageSolutionResponse>
{
  declare readonly Parameters: Readonly<StageSolutionRequestParameters>;

  constructor(parameters: StageSolutionRequestParameters) {
    super("StageSolution", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/StageSolution`;

    const body = requestBody({
      CustomizationFile: this.Parameters.CustomizationFile,
      StageSolutionUploadId: this.Parameters.StageSolutionUploadId,
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

  async parseResponse(response: Response): Promise<StageSolutionResponse> {
    // The body is the complex value, with its @odata.context
    return StageSolutionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the StageSolution action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface StageSolutionResult {
  "@odata.context"?: string;
  StageSolutionResults: StageSolutionResults;
}

/**
 * StageSolution response message
 *
 * `result` is the value the StageSolution action returns (see {@link StageSolutionResult}).
 */
export class StageSolutionResponse extends OrganizationResponse {
  constructor(public result: StageSolutionResult) {
    super("StageSolution");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): StageSolutionResponse {
    return new StageSolutionResponse(data as StageSolutionResult);
  }
}
