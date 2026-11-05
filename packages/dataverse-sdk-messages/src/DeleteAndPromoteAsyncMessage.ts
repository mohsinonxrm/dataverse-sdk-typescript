import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DeleteAndPromoteAsync request message
 *
 * Web API Action: DeleteAndPromoteAsync
 */
export class DeleteAndPromoteAsyncRequest
  extends OrganizationRequest
  implements Executable<DeleteAndPromoteAsyncResponse>
{
  constructor(public uniqueName: string) {
    super("DeleteAndPromoteAsync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAndPromoteAsync`;

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

  async parseResponse(response: Response): Promise<DeleteAndPromoteAsyncResponse> {
    const data = await response.json();
    return DeleteAndPromoteAsyncResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      UniqueName: this.uniqueName,
    };
  }
}

/**
 * DeleteAndPromoteAsync response message
 */
export class DeleteAndPromoteAsyncResponse extends OrganizationResponse {
  constructor(public result: DeleteAndPromoteAsyncResponse) {
    super("DeleteAndPromoteAsync");
  }

  static fromResponse(data: unknown): DeleteAndPromoteAsyncResponse {
    return new DeleteAndPromoteAsyncResponse((data as any).value);
  }
}
