import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_EditSequence message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EditSequenceRequestParameters {
  SequenceId?: string;
  DiscardChanges?: boolean;
}

/**
 * msdyn_EditSequence request message
 *
 * Web API Action: msdyn_EditSequence
 */
export class msdyn_EditSequenceRequest
  extends OrganizationRequest
  implements Executable<msdyn_EditSequenceResponse>
{
  declare readonly Parameters: Readonly<msdyn_EditSequenceRequestParameters>;

  constructor(parameters: msdyn_EditSequenceRequestParameters = {}) {
    super("msdyn_EditSequence", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EditSequence`;

    const body = requestBody({
      SequenceId: this.Parameters.SequenceId,
      DiscardChanges: this.Parameters.DiscardChanges,
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

  async parseResponse(response: Response): Promise<msdyn_EditSequenceResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_EditSequenceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_EditSequence action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EditSequenceResult {
  "@odata.context"?: string;
  DefinitionSequenceId: string;
}

/**
 * msdyn_EditSequence response message
 *
 * `result` is the value the msdyn_EditSequence action returns (see {@link msdyn_EditSequenceResult}).
 */
export class msdyn_EditSequenceResponse extends OrganizationResponse {
  constructor(public result: msdyn_EditSequenceResult) {
    super("msdyn_EditSequence");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_EditSequenceResponse {
    return new msdyn_EditSequenceResponse(data as msdyn_EditSequenceResult);
  }
}
