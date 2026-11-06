import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_ExecuteARC message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteARCRequestParameters {
  CreatedEntityReference: EntityReference | AnyEntityPayload;
  RuleId?: string;
}

/**
 * msdyn_ExecuteARC request message
 *
 * Web API Action: msdyn_ExecuteARC
 */
export class msdyn_ExecuteARCRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteARCResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteARCRequestParameters>;

  constructor(parameters: msdyn_ExecuteARCRequestParameters) {
    super("msdyn_ExecuteARC", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteARC`;

    const body = requestBody({
      CreatedEntityReference: this.Parameters.CreatedEntityReference,
      RuleId: this.Parameters.RuleId,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteARCResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ExecuteARCResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExecuteARC action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteARCResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  FlowName: string;
}

/**
 * msdyn_ExecuteARC response message
 *
 * `result` is the value the msdyn_ExecuteARC action returns (see {@link msdyn_ExecuteARCResult}).
 */
export class msdyn_ExecuteARCResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteARCResult) {
    super("msdyn_ExecuteARC");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExecuteARCResponse {
    return new msdyn_ExecuteARCResponse(data as msdyn_ExecuteARCResult);
  }
}
