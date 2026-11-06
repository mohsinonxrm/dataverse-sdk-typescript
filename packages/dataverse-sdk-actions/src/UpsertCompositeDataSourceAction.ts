import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UpsertCompositeDataSource action
 */
export interface UpsertCompositeDataSourceResponse {
  // No content returned
}

/**
 * Parameters of the UpsertCompositeDataSource action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpsertCompositeDataSourceActionParameters {
  ParentDisplayName?: string;
  ParentSchemaName: string;
  ParentParameterKey: string;
  ParentApiId?: string;
  ParentValue?: string;
  ChildDisplayName?: string;
  ChildSchemaName?: string;
  ChildParameterKey?: string;
  ChildValue?: string;
}

/**
 * UpsertCompositeDataSource action
 *
 * Unbound action
 */
export class UpsertCompositeDataSourceAction implements Executable<UpsertCompositeDataSourceResponse> {
  constructor(public readonly parameters: UpsertCompositeDataSourceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpsertCompositeDataSource`;

    const body = requestBody({
      ParentDisplayName: this.parameters.ParentDisplayName,
      ParentSchemaName: this.parameters.ParentSchemaName,
      ParentParameterKey: this.parameters.ParentParameterKey,
      ParentApiId: this.parameters.ParentApiId,
      ParentValue: this.parameters.ParentValue,
      ChildDisplayName: this.parameters.ChildDisplayName,
      ChildSchemaName: this.parameters.ChildSchemaName,
      ChildParameterKey: this.parameters.ChildParameterKey,
      ChildValue: this.parameters.ChildValue,
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

  async parseResponse(response: Response): Promise<UpsertCompositeDataSourceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as UpsertCompositeDataSourceResponse;
  }
}
