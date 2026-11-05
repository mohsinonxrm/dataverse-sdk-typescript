import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UpsertCompositeDataSource action
 */
export interface UpsertCompositeDataSourceResponse {
  // No content returned
}

/**
 * UpsertCompositeDataSource action
 *
 * Unbound action
 */
export class UpsertCompositeDataSourceAction implements Executable<UpsertCompositeDataSourceResponse> {
  constructor(
    public readonly parentDisplayName: string,
    public readonly parentSchemaName: string,
    public readonly parentParameterKey: string,
    public readonly parentApiId: string,
    public readonly parentValue: string,
    public readonly childDisplayName: string,
    public readonly childSchemaName: string,
    public readonly childParameterKey: string,
    public readonly childValue: string
  ) {}

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
    return {};
  }
}
