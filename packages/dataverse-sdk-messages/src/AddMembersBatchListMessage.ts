import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * AddMembersBatchList request message
 *
 * Web API Action: AddMembersBatchList
 */
export class AddMembersBatchListRequest
  extends OrganizationRequest
  implements Executable<AddMembersBatchListResponse>
{
  constructor(
    public listId: string,
    public fetchXml: string,
    public skipCount: number
  ) {
    super("AddMembersBatchList");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddMembersBatchList`;

    const body: Record<string, unknown> = {
      ListId: this.listId,
      FetchXml: this.fetchXml,
      SkipCount: this.skipCount,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AddMembersBatchListResponse> {
    const data = await response.json();
    return AddMembersBatchListResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ListId: this.listId,
      FetchXml: this.fetchXml,
      SkipCount: this.skipCount,
    };
  }
}

/**
 * AddMembersBatchList response message
 */
export class AddMembersBatchListResponse extends OrganizationResponse {
  constructor(public result: AddMembersBatchListResponse) {
    super("AddMembersBatchList");
  }

  static fromResponse(data: unknown): AddMembersBatchListResponse {
    return new AddMembersBatchListResponse((data as any).value);
  }
}
