import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_CSCopilotResolveCase message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CSCopilotResolveCaseRequestParameters {
  ResolutionReason: number;
  StatusReason: number;
  Incident: EntityReference | AnyEntityPayload;
  CallerIdentifier: string;
  PredictedValues?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CSCopilotResolveCase request message
 *
 * Web API Action: msdyn_CSCopilotResolveCase
 */
export class msdyn_CSCopilotResolveCaseRequest
  extends OrganizationRequest
  implements Executable<msdyn_CSCopilotResolveCaseResponse>
{
  declare readonly Parameters: Readonly<msdyn_CSCopilotResolveCaseRequestParameters>;

  constructor(parameters: msdyn_CSCopilotResolveCaseRequestParameters) {
    super("msdyn_CSCopilotResolveCase", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCopilotResolveCase`;

    const body = requestBody({
      ResolutionReason: this.Parameters.ResolutionReason,
      StatusReason: this.Parameters.StatusReason,
      Incident: this.Parameters.Incident,
      CallerIdentifier: this.Parameters.CallerIdentifier,
      PredictedValues: this.Parameters.PredictedValues,
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

  async parseResponse(response: Response): Promise<msdyn_CSCopilotResolveCaseResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CSCopilotResolveCaseResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CSCopilotResolveCase action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CSCopilotResolveCaseResult {
  "@odata.context"?: string;
  CaseStatusReason: number;
  Message: string;
  StatusCode: number;
}

/**
 * msdyn_CSCopilotResolveCase response message
 *
 * `result` is the value the msdyn_CSCopilotResolveCase action returns (see {@link msdyn_CSCopilotResolveCaseResult}).
 */
export class msdyn_CSCopilotResolveCaseResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSCopilotResolveCaseResult) {
    super("msdyn_CSCopilotResolveCase");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CSCopilotResolveCaseResponse {
    return new msdyn_CSCopilotResolveCaseResponse(data as msdyn_CSCopilotResolveCaseResult);
  }
}
