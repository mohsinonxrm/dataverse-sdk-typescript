import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AddOrUpdatePlaybookInstructions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AddOrUpdatePlaybookInstructionsRequestParameters {
  msdyn_Instructions: string;
}

/**
 * msdyn_AddOrUpdatePlaybookInstructions request message
 *
 * Web API Action: msdyn_AddOrUpdatePlaybookInstructions
 */
export class msdyn_AddOrUpdatePlaybookInstructionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AddOrUpdatePlaybookInstructionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_AddOrUpdatePlaybookInstructionsRequestParameters>;

  constructor(parameters: msdyn_AddOrUpdatePlaybookInstructionsRequestParameters) {
    super("msdyn_AddOrUpdatePlaybookInstructions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddOrUpdatePlaybookInstructions`;

    const body = requestBody({
      msdyn_Instructions: this.Parameters.msdyn_Instructions,
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

  async parseResponse(response: Response): Promise<msdyn_AddOrUpdatePlaybookInstructionsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_AddOrUpdatePlaybookInstructionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_AddOrUpdatePlaybookInstructions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AddOrUpdatePlaybookInstructionsResult {
  "@odata.context"?: string;
  msdyn_ErrorResult: string;
  msdyn_SuccessResult: boolean;
}

/**
 * msdyn_AddOrUpdatePlaybookInstructions response message
 *
 * `result` is the value the msdyn_AddOrUpdatePlaybookInstructions action returns (see {@link msdyn_AddOrUpdatePlaybookInstructionsResult}).
 */
export class msdyn_AddOrUpdatePlaybookInstructionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_AddOrUpdatePlaybookInstructionsResult) {
    super("msdyn_AddOrUpdatePlaybookInstructions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AddOrUpdatePlaybookInstructionsResponse {
    return new msdyn_AddOrUpdatePlaybookInstructionsResponse(
      data as msdyn_AddOrUpdatePlaybookInstructionsResult
    );
  }
}
