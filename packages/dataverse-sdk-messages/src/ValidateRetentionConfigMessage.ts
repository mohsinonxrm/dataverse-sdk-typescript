import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * ValidateRetentionConfig request message
 *
 * Web API Action: ValidateRetentionConfig
 */
export class ValidateRetentionConfigRequest
  extends OrganizationRequest
  implements Executable<ValidateRetentionConfigResponse>
{
  constructor(
    public target: EntityReference,
    public entityName: string,
    public fetchXml: string,
    public retentionConfigId: string
  ) {
    super("ValidateRetentionConfig");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateRetentionConfig`;

    const body: Record<string, unknown> = {
      Target: this.target,
      EntityName: this.entityName,
      FetchXml: this.fetchXml,
      RetentionConfigId: this.retentionConfigId,
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

  async parseResponse(response: Response): Promise<ValidateRetentionConfigResponse> {
    const data = await response.json();
    return ValidateRetentionConfigResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      EntityName: this.entityName,
      FetchXml: this.fetchXml,
      RetentionConfigId: this.retentionConfigId,
    };
  }
}

/**
 * ValidateRetentionConfig response message
 */
export class ValidateRetentionConfigResponse extends OrganizationResponse {
  constructor(public result: ValidateRetentionConfigResponse) {
    super("ValidateRetentionConfig");
  }

  static fromResponse(data: unknown): ValidateRetentionConfigResponse {
    return new ValidateRetentionConfigResponse((data as any).value);
  }
}
