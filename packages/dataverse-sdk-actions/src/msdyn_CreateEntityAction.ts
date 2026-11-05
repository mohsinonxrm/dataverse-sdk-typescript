import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateEntity action
 */
export interface msdyn_CreateEntityResponse {
  SampleDataIngestionErrors: string;
  EntityId: string;
}

/**
 * msdyn_CreateEntity action
 *
 * Unbound action
 */
export class msdyn_CreateEntityAction implements Executable<msdyn_CreateEntityResponse> {
  constructor(
    public readonly useUserSettings: boolean,
    public readonly connectionInfo: string,
    public readonly fileInfo: string,
    public readonly previewData: string,
    public readonly isToExistingTable: boolean,
    public readonly sampleData: string,
    public readonly entityDefinition: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateEntity`;

    const body: Record<string, unknown> = {
      UseUserSettings: this.useUserSettings,
      ConnectionInfo: this.connectionInfo,
      FileInfo: this.fileInfo,
      PreviewData: this.previewData,
      IsToExistingTable: this.isToExistingTable,
      SampleData: this.sampleData,
      EntityDefinition: this.entityDefinition,
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

  async parseResponse(response: Response): Promise<msdyn_CreateEntityResponse> {
    const data = await response.json();
    return data as msdyn_CreateEntityResponse;
  }
}
