import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DeleteAndPromoteAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteAndPromoteAsyncRequestParameters {
  UniqueName: string;
}

/**
 * DeleteAndPromoteAsync request message
 *
 * Web API Action: DeleteAndPromoteAsync
 */
export class DeleteAndPromoteAsyncRequest
  extends OrganizationRequest
  implements Executable<DeleteAndPromoteAsyncResponse>
{
  declare readonly Parameters: Readonly<DeleteAndPromoteAsyncRequestParameters>;

  constructor(parameters: DeleteAndPromoteAsyncRequestParameters) {
    super("DeleteAndPromoteAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAndPromoteAsync`;

    const body = requestBody({
      UniqueName: this.Parameters.UniqueName,
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

  async parseResponse(response: Response): Promise<DeleteAndPromoteAsyncResponse> {
    // The body is the complex value, with its @odata.context
    return DeleteAndPromoteAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DeleteAndPromoteAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DeleteAndPromoteAsyncResult {
  "@odata.context"?: string;
  AsyncOperationId: string;
}

/**
 * DeleteAndPromoteAsync response message
 *
 * `result` is the value the DeleteAndPromoteAsync action returns (see {@link DeleteAndPromoteAsyncResult}).
 */
export class DeleteAndPromoteAsyncResponse extends OrganizationResponse {
  constructor(public result: DeleteAndPromoteAsyncResult) {
    super("DeleteAndPromoteAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DeleteAndPromoteAsyncResponse {
    return new DeleteAndPromoteAsyncResponse(data as DeleteAndPromoteAsyncResult);
  }
}
