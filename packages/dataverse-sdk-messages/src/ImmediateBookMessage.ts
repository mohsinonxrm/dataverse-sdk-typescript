import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { ImmediateBookResponse as ImmediateBookResponseData } from "./types/index.js";

/**
 * ImmediateBook request message
 *
 * Web API Action: ImmediateBook
 */
export class ImmediateBookRequest
  extends OrganizationRequest
  implements Executable<ImmediateBookResponse>
{
  constructor(
    public target: EntityReference | AnyEntityPayload,
    public attachmentIds?: string[],
    public eWSUrl?: string,
    public attachmentToken?: string
  ) {
    super("ImmediateBook");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImmediateBook`;

    const body: Record<string, unknown> = {
      Target: this.target,
      AttachmentIds: this.attachmentIds,
      EWSUrl: this.eWSUrl,
      AttachmentToken: this.attachmentToken,
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

  async parseResponse(response: Response): Promise<ImmediateBookResponse> {
    const data = await response.json();
    return ImmediateBookResponse.fromResponse(data);
  }
}

/**
 * ImmediateBook response message
 */
export class ImmediateBookResponse extends OrganizationResponse {
  constructor(public result: ImmediateBookResponseData) {
    super("ImmediateBook");
  }

  static fromResponse(data: unknown): ImmediateBookResponse {
    return new ImmediateBookResponse(responseObject<ImmediateBookResponseData>(data));
  }
}
