import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateEntity action
 */
export interface msdyn_CreateEntityResponse {
  EntityId: string;
  SampleDataIngestionErrors: string;
}

/**
 * Parameters of the msdyn_CreateEntity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateEntityActionParameters {
  PreviewData?: string;
  IsToExistingTable?: boolean;
  UseUserSettings?: boolean;
  ConnectionInfo?: string;
  EntityDefinition: string;
  SampleData?: string;
  FileInfo?: string;
}

/**
 * msdyn_CreateEntity action
 *
 * Unbound action
 */
export class msdyn_CreateEntityAction implements Executable<msdyn_CreateEntityResponse> {
  constructor(public readonly parameters: msdyn_CreateEntityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateEntity`;

    const body = requestBody({
      PreviewData: this.parameters.PreviewData,
      IsToExistingTable: this.parameters.IsToExistingTable,
      UseUserSettings: this.parameters.UseUserSettings,
      ConnectionInfo: this.parameters.ConnectionInfo,
      EntityDefinition: this.parameters.EntityDefinition,
      SampleData: this.parameters.SampleData,
      FileInfo: this.parameters.FileInfo,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateEntityResponse;
    return (await response.json()) as msdyn_CreateEntityResponse;
  }
}
