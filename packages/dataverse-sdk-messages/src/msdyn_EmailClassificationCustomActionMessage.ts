import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_EmailClassificationCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailClassificationCustomActionRequestParameters {
  emailId: string;
  additionalInfo?: string;
  doRuleEvaluation: boolean;
  isSimulationMode?: boolean;
}

/**
 * msdyn_EmailClassificationCustomAction request message
 *
 * Web API Action: msdyn_EmailClassificationCustomAction
 */
export class msdyn_EmailClassificationCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_EmailClassificationCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_EmailClassificationCustomActionRequestParameters>;

  constructor(parameters: msdyn_EmailClassificationCustomActionRequestParameters) {
    super("msdyn_EmailClassificationCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailClassificationCustomAction`;

    const body = requestBody({
      emailId: this.Parameters.emailId,
      additionalInfo: this.Parameters.additionalInfo,
      doRuleEvaluation: this.Parameters.doRuleEvaluation,
      isSimulationMode: this.Parameters.isSimulationMode,
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

  async parseResponse(response: Response): Promise<msdyn_EmailClassificationCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_EmailClassificationCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_EmailClassificationCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EmailClassificationCustomActionResult {
  "@odata.context"?: string;
  emailclassificationResponse: string;
  matchedCategoryId: string;
  matchedScopeRuleId: string;
  status: string;
}

/**
 * msdyn_EmailClassificationCustomAction response message
 *
 * `result` is the value the msdyn_EmailClassificationCustomAction action returns (see {@link msdyn_EmailClassificationCustomActionResult}).
 */
export class msdyn_EmailClassificationCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_EmailClassificationCustomActionResult) {
    super("msdyn_EmailClassificationCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_EmailClassificationCustomActionResponse {
    return new msdyn_EmailClassificationCustomActionResponse(
      data as msdyn_EmailClassificationCustomActionResult
    );
  }
}
