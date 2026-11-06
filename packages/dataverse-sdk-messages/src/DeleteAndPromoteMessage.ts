import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { DeleteAndPromoteResponse as DeleteAndPromoteResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return DeleteAndPromoteResponse.fromResponse({});
    return DeleteAndPromoteResponse.fromResponse(await response.json());
  }
}

/**
 * DeleteAndPromote response message
 */
export class DeleteAndPromoteResponse extends OrganizationResponse {
  constructor(public result: DeleteAndPromoteResponseData) {
    super("DeleteAndPromote");
  }

  static fromResponse(data: unknown): DeleteAndPromoteResponse {
    return new DeleteAndPromoteResponse(responseObject<DeleteAndPromoteResponseData>(data));
  }
}
