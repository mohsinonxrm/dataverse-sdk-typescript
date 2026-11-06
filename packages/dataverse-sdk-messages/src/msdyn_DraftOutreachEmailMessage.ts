import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DraftOutreachEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DraftOutreachEmailRequestParameters {
  LeadId: string;
}

/**
 * msdyn_DraftOutreachEmail request message
 *
 * Web API Action: msdyn_DraftOutreachEmail
 */
export class msdyn_DraftOutreachEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_DraftOutreachEmailResponse>
{
  declare readonly Parameters: Readonly<msdyn_DraftOutreachEmailRequestParameters>;

  constructor(parameters: msdyn_DraftOutreachEmailRequestParameters) {
    super("msdyn_DraftOutreachEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DraftOutreachEmail`;

    const body = requestBody({
      LeadId: this.Parameters.LeadId,
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

  async parseResponse(response: Response): Promise<msdyn_DraftOutreachEmailResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_DraftOutreachEmailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_DraftOutreachEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DraftOutreachEmailResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: string;
  Result: string;
}

/**
 * msdyn_DraftOutreachEmail response message
 *
 * `result` is the value the msdyn_DraftOutreachEmail action returns (see {@link msdyn_DraftOutreachEmailResult}).
 */
export class msdyn_DraftOutreachEmailResponse extends OrganizationResponse {
  constructor(public result: msdyn_DraftOutreachEmailResult) {
    super("msdyn_DraftOutreachEmail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_DraftOutreachEmailResponse {
    return new msdyn_DraftOutreachEmailResponse(data as msdyn_DraftOutreachEmailResult);
  }
}
