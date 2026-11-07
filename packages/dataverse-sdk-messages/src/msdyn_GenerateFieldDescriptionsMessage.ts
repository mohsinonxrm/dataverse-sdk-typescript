import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GenerateFieldDescriptions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GenerateFieldDescriptionsRequestParameters {
  msdyn_SimulationId?: string;
  msdyn_CandidateValue: string;
  msdyn_Evidence: string;
  msdyn_RunId?: string;
  msdyn_CorrelationId?: string;
}

/**
 * msdyn_GenerateFieldDescriptions request message
 *
 * Web API Action: msdyn_GenerateFieldDescriptions
 */
export class msdyn_GenerateFieldDescriptionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GenerateFieldDescriptionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GenerateFieldDescriptionsRequestParameters>;

  constructor(parameters: msdyn_GenerateFieldDescriptionsRequestParameters) {
    super("msdyn_GenerateFieldDescriptions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GenerateFieldDescriptions`;

    const body = requestBody({
      msdyn_SimulationId: this.Parameters.msdyn_SimulationId,
      msdyn_CandidateValue: this.Parameters.msdyn_CandidateValue,
      msdyn_Evidence: this.Parameters.msdyn_Evidence,
      msdyn_RunId: this.Parameters.msdyn_RunId,
      msdyn_CorrelationId: this.Parameters.msdyn_CorrelationId,
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

  async parseResponse(response: Response): Promise<msdyn_GenerateFieldDescriptionsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GenerateFieldDescriptionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GenerateFieldDescriptions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GenerateFieldDescriptionsResult {
  "@odata.context"?: string;
  msdyn_CandidateValue: string;
  msdyn_Description: string;
  msdyn_Prompt: string;
}

/**
 * msdyn_GenerateFieldDescriptions response message
 *
 * `result` is the value the msdyn_GenerateFieldDescriptions action returns (see {@link msdyn_GenerateFieldDescriptionsResult}).
 */
export class msdyn_GenerateFieldDescriptionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GenerateFieldDescriptionsResult) {
    super("msdyn_GenerateFieldDescriptions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GenerateFieldDescriptionsResponse {
    return new msdyn_GenerateFieldDescriptionsResponse(
      data as msdyn_GenerateFieldDescriptionsResult
    );
  }
}
