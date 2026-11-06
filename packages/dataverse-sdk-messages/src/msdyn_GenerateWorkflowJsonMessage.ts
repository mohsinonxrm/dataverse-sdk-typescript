import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GenerateWorkflowJson message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GenerateWorkflowJsonRequestParameters {
  ContextVariables?: string;
  msdyn_ccuserpromptid: string;
  EntityIds?: string;
  Channel: string;
  OperationType: string;
  EntityType: string;
  SelectionMode: number;
}

/**
 * msdyn_GenerateWorkflowJson request message
 *
 * Web API Action: msdyn_GenerateWorkflowJson
 */
export class msdyn_GenerateWorkflowJsonRequest
  extends OrganizationRequest
  implements Executable<msdyn_GenerateWorkflowJsonResponse>
{
  declare readonly Parameters: Readonly<msdyn_GenerateWorkflowJsonRequestParameters>;

  constructor(parameters: msdyn_GenerateWorkflowJsonRequestParameters) {
    super("msdyn_GenerateWorkflowJson", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GenerateWorkflowJson`;

    const body = requestBody({
      ContextVariables: this.Parameters.ContextVariables,
      msdyn_ccuserpromptid: this.Parameters.msdyn_ccuserpromptid,
      EntityIds: this.Parameters.EntityIds,
      Channel: this.Parameters.Channel,
      OperationType: this.Parameters.OperationType,
      EntityType: this.Parameters.EntityType,
      SelectionMode: this.Parameters.SelectionMode,
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

  async parseResponse(response: Response): Promise<msdyn_GenerateWorkflowJsonResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GenerateWorkflowJsonResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GenerateWorkflowJson action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GenerateWorkflowJsonResult {
  "@odata.context"?: string;
  conflicts: string;
  msdyn_errormessage: string;
  msdyn_promptstatus: number;
}

/**
 * msdyn_GenerateWorkflowJson response message
 *
 * `result` is the value the msdyn_GenerateWorkflowJson action returns (see {@link msdyn_GenerateWorkflowJsonResult}).
 */
export class msdyn_GenerateWorkflowJsonResponse extends OrganizationResponse {
  constructor(public result: msdyn_GenerateWorkflowJsonResult) {
    super("msdyn_GenerateWorkflowJson");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GenerateWorkflowJsonResponse {
    return new msdyn_GenerateWorkflowJsonResponse(data as msdyn_GenerateWorkflowJsonResult);
  }
}
