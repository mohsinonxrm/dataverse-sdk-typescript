import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { DeleteAndPromoteResponse as DeleteAndPromoteResponseData } from "./types/index.js";

/**
 * DeleteAndPromote request message
 *
 * Web API Action: DeleteAndPromote
 */
export class DeleteAndPromoteRequest
  extends OrganizationRequest
  implements Executable<DeleteAndPromoteResponse>
{
  constructor(public uniqueName: string) {
    super("DeleteAndPromote");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAndPromote`;

    const body: Record<string, unknown> = {
      UniqueName: this.uniqueName,
    };

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
    const data = await response.json();
    return DeleteAndPromoteResponse.fromResponse(data);
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
