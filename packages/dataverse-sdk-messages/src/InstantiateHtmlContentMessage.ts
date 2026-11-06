import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the InstantiateHtmlContent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InstantiateHtmlContentRequestParameters {
  SubjectHTML?: string;
  BodyHTML?: string;
  TemplateId?: string;
  ObjectType: string;
  ObjectId: string;
  Options?: string;
  EntityLogicalName?: string;
}

/**
 * InstantiateHtmlContent request message
 *
 * Web API Action: InstantiateHtmlContent
 */
export class InstantiateHtmlContentRequest
  extends OrganizationRequest
  implements Executable<InstantiateHtmlContentResponse>
{
  declare readonly Parameters: Readonly<InstantiateHtmlContentRequestParameters>;

  constructor(parameters: InstantiateHtmlContentRequestParameters) {
    super("InstantiateHtmlContent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateHtmlContent`;

    const body = requestBody({
      SubjectHTML: this.Parameters.SubjectHTML,
      BodyHTML: this.Parameters.BodyHTML,
      TemplateId: this.Parameters.TemplateId,
      ObjectType: this.Parameters.ObjectType,
      ObjectId: this.Parameters.ObjectId,
      Options: this.Parameters.Options,
      EntityLogicalName: this.Parameters.EntityLogicalName,
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

  async parseResponse(response: Response): Promise<InstantiateHtmlContentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return InstantiateHtmlContentResponse.fromResponse({});
    return InstantiateHtmlContentResponse.fromResponse(await response.json());
  }
}

/**
 * InstantiateHtmlContent response message
 */
export class InstantiateHtmlContentResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("InstantiateHtmlContent");
  }

  static fromResponse(data: unknown): InstantiateHtmlContentResponse {
    return new InstantiateHtmlContentResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
