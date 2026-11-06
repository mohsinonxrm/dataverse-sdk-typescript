import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CloneAttachmentsPluginAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CloneAttachmentsPluginActionRequestParameters {
  SourceArticle: string;
  ResultArticle: string;
}

/**
 * msdyn_CloneAttachmentsPluginAction request message
 *
 * Web API Action: msdyn_CloneAttachmentsPluginAction
 */
export class msdyn_CloneAttachmentsPluginActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CloneAttachmentsPluginActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_CloneAttachmentsPluginActionRequestParameters>;

  constructor(parameters: msdyn_CloneAttachmentsPluginActionRequestParameters) {
    super("msdyn_CloneAttachmentsPluginAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CloneAttachmentsPluginAction`;

    const body = requestBody({
      SourceArticle: this.Parameters.SourceArticle,
      ResultArticle: this.Parameters.ResultArticle,
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

  async parseResponse(response: Response): Promise<msdyn_CloneAttachmentsPluginActionResponse> {
    // No return value (204 No Content)
    return new msdyn_CloneAttachmentsPluginActionResponse();
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
