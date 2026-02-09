import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * InstantiateTemplate request message
 *
 * Web API Action: InstantiateTemplate
 */
export class InstantiateTemplateRequest
  extends OrganizationRequest
  implements Executable<InstantiateTemplateResponse>
{
  constructor(
    public templateId: string,
    public objectType: string,
    public objectId: string
  ) {
    super("InstantiateTemplate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateTemplate`;

    const body: Record<string, unknown> = {
      TemplateId: this.templateId,
      ObjectType: this.objectType,
      ObjectId: this.objectId,
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

  async parseResponse(response: Response): Promise<InstantiateTemplateResponse> {
    const data = await response.json();
    return InstantiateTemplateResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      TemplateId: this.templateId,
      ObjectType: this.objectType,
      ObjectId: this.objectId,
    };
  }
}

/**
 * InstantiateTemplate response message
 */
export class InstantiateTemplateResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("InstantiateTemplate");
  }

  static fromResponse(data: unknown): InstantiateTemplateResponse {
    return new InstantiateTemplateResponse((data as any).value);
  }
}
