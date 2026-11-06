import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetOrCreateLinkedActivity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOrCreateLinkedActivityRequestParameters {
  SequenceStepId: string;
  CreateLinkedActivity: boolean;
}

/**
 * msdyn_GetOrCreateLinkedActivity request message
 *
 * Web API Action: msdyn_GetOrCreateLinkedActivity
 */
export class msdyn_GetOrCreateLinkedActivityRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOrCreateLinkedActivityResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOrCreateLinkedActivityRequestParameters>;

  constructor(parameters: msdyn_GetOrCreateLinkedActivityRequestParameters) {
    super("msdyn_GetOrCreateLinkedActivity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrCreateLinkedActivity`;

    const body = requestBody({
      SequenceStepId: this.Parameters.SequenceStepId,
      CreateLinkedActivity: this.Parameters.CreateLinkedActivity,
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

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateLinkedActivityResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetOrCreateLinkedActivityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetOrCreateLinkedActivity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOrCreateLinkedActivityResult {
  "@odata.context"?: string;
  IsLinkedActivityCreated: boolean;
  LinkedActivityId: string;
}

/**
 * msdyn_GetOrCreateLinkedActivity response message
 *
 * `result` is the value the msdyn_GetOrCreateLinkedActivity action returns (see {@link msdyn_GetOrCreateLinkedActivityResult}).
 */
export class msdyn_GetOrCreateLinkedActivityResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrCreateLinkedActivityResult) {
    super("msdyn_GetOrCreateLinkedActivity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetOrCreateLinkedActivityResponse {
    return new msdyn_GetOrCreateLinkedActivityResponse(
      data as msdyn_GetOrCreateLinkedActivityResult
    );
  }
}
