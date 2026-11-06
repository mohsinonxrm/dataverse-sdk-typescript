import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_autonomousCaseCreateUpdate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_autonomousCaseCreateUpdateRequestParameters {
  slot__conversation?: string[];
  autonomousCaseRequest: string;
}

/**
 * msdyn_autonomousCaseCreateUpdate request message
 *
 * Web API Action: msdyn_autonomousCaseCreateUpdate
 */
export class msdyn_autonomousCaseCreateUpdateRequest
  extends OrganizationRequest
  implements Executable<msdyn_autonomousCaseCreateUpdateResponse>
{
  declare readonly Parameters: Readonly<msdyn_autonomousCaseCreateUpdateRequestParameters>;

  constructor(parameters: msdyn_autonomousCaseCreateUpdateRequestParameters) {
    super("msdyn_autonomousCaseCreateUpdate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_autonomousCaseCreateUpdate`;

    const body = requestBody({
      slot__conversation: this.Parameters.slot__conversation,
      autonomousCaseRequest: this.Parameters.autonomousCaseRequest,
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

  async parseResponse(response: Response): Promise<msdyn_autonomousCaseCreateUpdateResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_autonomousCaseCreateUpdateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_autonomousCaseCreateUpdate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_autonomousCaseCreateUpdateResult {
  "@odata.context"?: string;
  autonomousCaseResponse: string;
}

/**
 * msdyn_autonomousCaseCreateUpdate response message
 *
 * `result` is the value the msdyn_autonomousCaseCreateUpdate action returns (see {@link msdyn_autonomousCaseCreateUpdateResult}).
 */
export class msdyn_autonomousCaseCreateUpdateResponse extends OrganizationResponse {
  constructor(public result: msdyn_autonomousCaseCreateUpdateResult) {
    super("msdyn_autonomousCaseCreateUpdate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_autonomousCaseCreateUpdateResponse {
    return new msdyn_autonomousCaseCreateUpdateResponse(
      data as msdyn_autonomousCaseCreateUpdateResult
    );
  }
}
