import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SetSharePointDocumentStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetSharePointDocumentStatusRequestParameters {
  Enable: boolean;
  LogicalEntityNames: string;
}

/**
 * msdyn_SetSharePointDocumentStatus request message
 *
 * Web API Action: msdyn_SetSharePointDocumentStatus
 */
export class msdyn_SetSharePointDocumentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetSharePointDocumentStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SetSharePointDocumentStatusRequestParameters>;

  constructor(parameters: msdyn_SetSharePointDocumentStatusRequestParameters) {
    super("msdyn_SetSharePointDocumentStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetSharePointDocumentStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_SetSharePointDocumentStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SetSharePointDocumentStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SetSharePointDocumentStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SetSharePointDocumentStatusResult {
  "@odata.context"?: string;
  FailedLogicalEntityNames: string;
  OperationResult: boolean;
  PassedLogicalEntityNames: string;
}

/**
 * msdyn_SetSharePointDocumentStatus response message
 *
 * `result` is the value the msdyn_SetSharePointDocumentStatus action returns (see {@link msdyn_SetSharePointDocumentStatusResult}).
 */
export class msdyn_SetSharePointDocumentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SetSharePointDocumentStatusResult) {
    super("msdyn_SetSharePointDocumentStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SetSharePointDocumentStatusResponse {
    return new msdyn_SetSharePointDocumentStatusResponse(
      data as msdyn_SetSharePointDocumentStatusResult
    );
  }
}
