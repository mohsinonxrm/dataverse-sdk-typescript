import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_InvokeIntelligenceAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeIntelligenceActionRequestParameters {
  Context?: string;
  ScenarioType: string;
  entityReference?: EntityReference | AnyEntityPayload;
  RequestPayload: string;
}

/**
 * msdyn_InvokeIntelligenceAction request message
 *
 * Web API Action: msdyn_InvokeIntelligenceAction
 */
export class msdyn_InvokeIntelligenceActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeIntelligenceActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeIntelligenceActionRequestParameters>;

  constructor(parameters: msdyn_InvokeIntelligenceActionRequestParameters) {
    super("msdyn_InvokeIntelligenceAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeIntelligenceAction`;

    const body = requestBody({
      Context: this.Parameters.Context,
      ScenarioType: this.Parameters.ScenarioType,
      entityReference: this.Parameters.entityReference,
      RequestPayload: this.Parameters.RequestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeIntelligenceActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_InvokeIntelligenceActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InvokeIntelligenceAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeIntelligenceActionResult {
  "@odata.context"?: string;
  Metadata: string;
  Result: string;
}

/**
 * msdyn_InvokeIntelligenceAction response message
 *
 * `result` is the value the msdyn_InvokeIntelligenceAction action returns (see {@link msdyn_InvokeIntelligenceActionResult}).
 */
export class msdyn_InvokeIntelligenceActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeIntelligenceActionResult) {
    super("msdyn_InvokeIntelligenceAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InvokeIntelligenceActionResponse {
    return new msdyn_InvokeIntelligenceActionResponse(data as msdyn_InvokeIntelligenceActionResult);
  }
}
