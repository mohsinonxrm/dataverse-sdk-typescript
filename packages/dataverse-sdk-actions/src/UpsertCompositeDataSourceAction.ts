import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UpsertCompositeDataSource action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpsertCompositeDataSourceResponse = void;

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

  parseResponse(_response: Response): Promise<UpsertCompositeDataSourceResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
