import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SetTeamsDocumentStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetTeamsDocumentStatusRequestParameters {
  Enable: boolean;
  LogicalEntityNames: string;
}

/**
 * msdyn_SetTeamsDocumentStatus request message
 *
 * Web API Action: msdyn_SetTeamsDocumentStatus
 */
export class msdyn_SetTeamsDocumentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetTeamsDocumentStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SetTeamsDocumentStatusRequestParameters>;

  constructor(parameters: msdyn_SetTeamsDocumentStatusRequestParameters) {
    super("msdyn_SetTeamsDocumentStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetTeamsDocumentStatus`;

    const body = requestBody({
      Enable: this.Parameters.Enable,
      LogicalEntityNames: this.Parameters.LogicalEntityNames,
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

  async parseResponse(response: Response): Promise<msdyn_SetTeamsDocumentStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SetTeamsDocumentStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SetTeamsDocumentStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SetTeamsDocumentStatusResult {
  "@odata.context"?: string;
  FailedLogicalEntityNames: string;
  OperationResult: boolean;
  PassedLogicalEntityNames: string;
}

/**
 * msdyn_SetTeamsDocumentStatus response message
 *
 * `result` is the value the msdyn_SetTeamsDocumentStatus action returns (see {@link msdyn_SetTeamsDocumentStatusResult}).
 */
export class msdyn_SetTeamsDocumentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SetTeamsDocumentStatusResult) {
    super("msdyn_SetTeamsDocumentStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SetTeamsDocumentStatusResponse {
    return new msdyn_SetTeamsDocumentStatusResponse(data as msdyn_SetTeamsDocumentStatusResult);
  }
}
