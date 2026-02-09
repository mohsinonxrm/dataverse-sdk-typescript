import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * install request message
 *
 * Web API Action: install
 */
export class installRequest extends OrganizationRequest implements Executable<installResponse> {
  constructor(
    public workflowId: string,
    public connectionReferences: string,
    public appIds: string,
    public context: string,
    public expand: string
  ) {
    super("install");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.install`;

    const body: Record<string, unknown> = {
      connectionReferences: this.connectionReferences,
      appIds: this.appIds,
      context: this.context,
      expand: this.expand,
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

  async parseResponse(response: Response): Promise<installResponse> {
    const data = await response.json();
    return installResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.workflowId,
      connectionReferences: this.connectionReferences,
      appIds: this.appIds,
      context: this.context,
      expand: this.expand,
    };
  }
}

/**
 * install response message
 */
export class installResponse extends OrganizationResponse {
  constructor(public result: installResponse) {
    super("install");
  }

  static fromResponse(data: unknown): installResponse {
    return new installResponse((data as any).value);
  }
}
