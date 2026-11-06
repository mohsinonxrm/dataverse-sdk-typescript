import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

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
    public entityLogicalName?: string
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InstantiateTemplateGenericResponse> {
    const data = await response.json();
    return InstantiateTemplateGenericResponse.fromResponse(data);
  }
}

/**
 * InstantiateTemplateGeneric response message
 */
export class InstantiateTemplateGenericResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("InstantiateTemplateGeneric");
  }

  static fromResponse(data: unknown): InstantiateTemplateGenericResponse {
    return new InstantiateTemplateGenericResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
