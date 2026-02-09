import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * InstantiateTemplateGeneric request message
 *
 * Web API Action: InstantiateTemplateGeneric
 */
export class InstantiateTemplateGenericRequest
  extends OrganizationRequest
  implements Executable<InstantiateTemplateGenericResponse>
{
  constructor(
    public templateId: string,
    public objectType: string,
    public objectId: string,
    public entityLogicalName: string
  ) {
    super("InstantiateTemplateGeneric");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateTemplateGeneric`;

    const body: Record<string, unknown> = {
      TemplateId: this.templateId,
      ObjectType: this.objectType,
      ObjectId: this.objectId,
      EntityLogicalName: this.entityLogicalName,
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

  async parseResponse(response: Response): Promise<InstantiateTemplateGenericResponse> {
    const data = await response.json();
    return InstantiateTemplateGenericResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      TemplateId: this.templateId,
      ObjectType: this.objectType,
      ObjectId: this.objectId,
      EntityLogicalName: this.entityLogicalName,
    };
  }
}

/**
 * InstantiateTemplateGeneric response message
 */
export class InstantiateTemplateGenericResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("InstantiateTemplateGeneric");
  }

  static fromResponse(data: unknown): InstantiateTemplateGenericResponse {
    return new InstantiateTemplateGenericResponse((data as any).value);
  }
}
