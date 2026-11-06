import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InstantiateTemplateResponse> {
    const data = await response.json();
    return InstantiateTemplateResponse.fromResponse(data);
  }
}

/**
 * InstantiateTemplate response message
 */
export class InstantiateTemplateResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("InstantiateTemplate");
  }

  static fromResponse(data: unknown): InstantiateTemplateResponse {
    return new InstantiateTemplateResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
