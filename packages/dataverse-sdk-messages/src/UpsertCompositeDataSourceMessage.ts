import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UpsertCompositeDataSource request message
 *
 * Web API Action: UpsertCompositeDataSource
 */
export class UpsertCompositeDataSourceRequest
  extends OrganizationRequest
  implements Executable<UpsertCompositeDataSourceResponse>
{
  constructor(
    public parentDisplayName: string,
    public parentSchemaName: string,
    public parentParameterKey: string,
    public parentApiId: string,
    public parentValue: string,
    public childDisplayName: string,
    public childSchemaName: string,
    public childParameterKey: string,
    public childValue: string
  ) {
    super("UpsertCompositeDataSource");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpsertCompositeDataSource`;

    const body: Record<string, unknown> = {
      ParentDisplayName: this.parentDisplayName,
      ParentSchemaName: this.parentSchemaName,
      ParentParameterKey: this.parentParameterKey,
      ParentApiId: this.parentApiId,
      ParentValue: this.parentValue,
      ChildDisplayName: this.childDisplayName,
      ChildSchemaName: this.childSchemaName,
      ChildParameterKey: this.childParameterKey,
      ChildValue: this.childValue,
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

  async parseResponse(response: Response): Promise<UpsertCompositeDataSourceResponse> {
    // No return value (204 No Content)
    return new UpsertCompositeDataSourceResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ParentDisplayName: this.parentDisplayName,
      ParentSchemaName: this.parentSchemaName,
      ParentParameterKey: this.parentParameterKey,
      ParentApiId: this.parentApiId,
      ParentValue: this.parentValue,
      ChildDisplayName: this.childDisplayName,
      ChildSchemaName: this.childSchemaName,
      ChildParameterKey: this.childParameterKey,
      ChildValue: this.childValue,
    };
  }
}

/**
 * UpsertCompositeDataSource response message
 */
export class UpsertCompositeDataSourceResponse extends OrganizationResponse {
  constructor() {
    super("UpsertCompositeDataSource");
  }

  static fromResponse(_data: unknown): UpsertCompositeDataSourceResponse {
    return new UpsertCompositeDataSourceResponse();
  }
}
