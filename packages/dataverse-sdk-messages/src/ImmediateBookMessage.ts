import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
    public target: EntityReference,
    public attachmentIds: string[],
    public eWSUrl: string,
    public attachmentToken: string
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

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      AttachmentIds: this.attachmentIds,
      EWSUrl: this.eWSUrl,
      AttachmentToken: this.attachmentToken,
    };
  }
}

/**
 * ImmediateBook response message
 */
export class ImmediateBookResponse extends OrganizationResponse {
  constructor(public result: ImmediateBookResponse) {
    super("ImmediateBook");
  }

  static fromResponse(data: unknown): ImmediateBookResponse {
    return new ImmediateBookResponse((data as any).value);
  }
}
