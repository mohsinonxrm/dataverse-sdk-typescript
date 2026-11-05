import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * QuickTest request message
 *
 * Web API Action: QuickTest
 */
export class QuickTestRequest extends OrganizationRequest implements Executable<QuickTestResponse> {
  constructor(
    public msdyn_aiconfigurationId: string,
    public version: string,
    public request: string,
    public requestv2: EntityReference,
    public source: string
  ) {
    super("QuickTest");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.QuickTest`;

    const body: Record<string, unknown> = {
      version: this.version,
      request: this.request,
      requestv2: this.requestv2,
      source: this.source,
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

  async parseResponse(response: Response): Promise<QuickTestResponse> {
    const data = await response.json();
    return QuickTestResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_aiconfigurationId,
      version: this.version,
      request: this.request,
      requestv2: this.requestv2,
      source: this.source,
    };
  }
}

/**
 * QuickTest response message
 */
export class QuickTestResponse extends OrganizationResponse {
  constructor(public result: QuickTestResponse) {
    super("QuickTest");
  }

  static fromResponse(data: unknown): QuickTestResponse {
    return new QuickTestResponse((data as any).value);
  }
}
