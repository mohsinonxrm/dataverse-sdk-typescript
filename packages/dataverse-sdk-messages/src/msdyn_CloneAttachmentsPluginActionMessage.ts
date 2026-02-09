import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CloneAttachmentsPluginAction request message
 *
 * Web API Action: msdyn_CloneAttachmentsPluginAction
 */
export class msdyn_CloneAttachmentsPluginActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CloneAttachmentsPluginActionResponse>
{
  constructor(
    public sourceArticle: string,
    public resultArticle: string
  ) {
    super("msdyn_CloneAttachmentsPluginAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CloneAttachmentsPluginAction`;

    const body: Record<string, unknown> = {
      SourceArticle: this.sourceArticle,
      ResultArticle: this.resultArticle,
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

  async parseResponse(response: Response): Promise<msdyn_CloneAttachmentsPluginActionResponse> {
    // No return value (204 No Content)
    return new msdyn_CloneAttachmentsPluginActionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SourceArticle: this.sourceArticle,
      ResultArticle: this.resultArticle,
    };
  }
}

/**
 * msdyn_CloneAttachmentsPluginAction response message
 */
export class msdyn_CloneAttachmentsPluginActionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CloneAttachmentsPluginAction");
  }

  static fromResponse(_data: unknown): msdyn_CloneAttachmentsPluginActionResponse {
    return new msdyn_CloneAttachmentsPluginActionResponse();
  }
}
