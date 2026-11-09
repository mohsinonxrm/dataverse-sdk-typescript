import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_calculatecasesentiment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_calculatecasesentimentRequestParameters {
  CaseId: string;
}

/**
 * msdyn_calculatecasesentiment request message
 *
 * Web API Action: msdyn_calculatecasesentiment
 */
export class msdyn_calculatecasesentimentRequest
  extends OrganizationRequest
  implements Executable<msdyn_calculatecasesentimentResponse>
{
  declare readonly Parameters: Readonly<msdyn_calculatecasesentimentRequestParameters>;

  constructor(parameters: msdyn_calculatecasesentimentRequestParameters) {
    super("msdyn_calculatecasesentiment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_calculatecasesentiment`;

    const body = requestBody({
      CaseId: this.Parameters.CaseId,
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

  async parseResponse(response: Response): Promise<msdyn_calculatecasesentimentResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_calculatecasesentimentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_calculatecasesentiment action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_calculatecasesentimentResult {
  "@odata.context"?: string;
  SentimentLabel: number;
}

/**
 * msdyn_calculatecasesentiment response message
 *
 * `result` is the value the msdyn_calculatecasesentiment action returns (see {@link msdyn_calculatecasesentimentResult}).
 */
export class msdyn_calculatecasesentimentResponse extends OrganizationResponse {
  constructor(public result: msdyn_calculatecasesentimentResult) {
    super("msdyn_calculatecasesentiment");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_calculatecasesentimentResponse {
    return new msdyn_calculatecasesentimentResponse(data as msdyn_calculatecasesentimentResult);
  }
}
