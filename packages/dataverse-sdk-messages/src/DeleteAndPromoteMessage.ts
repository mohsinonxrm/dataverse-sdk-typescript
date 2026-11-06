import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DeleteAndPromote message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteAndPromoteRequestParameters {
  UniqueName: string;
}

/**
 * DeleteAndPromote request message
 *
 * Web API Action: DeleteAndPromote
 */
export class DeleteAndPromoteRequest
  extends OrganizationRequest
  implements Executable<DeleteAndPromoteResponse>
{
  declare readonly Parameters: Readonly<DeleteAndPromoteRequestParameters>;

  constructor(parameters: DeleteAndPromoteRequestParameters) {
    super("DeleteAndPromote", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAndPromote`;

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

  async parseResponse(response: Response): Promise<DeleteAndPromoteResponse> {
    // The body is the complex value, with its @odata.context
    return DeleteAndPromoteResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DeleteAndPromote action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DeleteAndPromoteResult {
  "@odata.context"?: string;
  SolutionId: string;
}

/**
 * DeleteAndPromote response message
 *
 * `result` is the value the DeleteAndPromote action returns (see {@link DeleteAndPromoteResult}).
 */
export class DeleteAndPromoteResponse extends OrganizationResponse {
  constructor(public result: DeleteAndPromoteResult) {
    super("DeleteAndPromote");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DeleteAndPromoteResponse {
    return new DeleteAndPromoteResponse(data as DeleteAndPromoteResult);
  }
}
