import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UpsertCompositeDataSource message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpsertCompositeDataSourceRequestParameters {
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
 * UpsertCompositeDataSource request message
 *
 * Web API Action: UpsertCompositeDataSource
 */
export class UpsertCompositeDataSourceRequest
  extends OrganizationRequest
  implements Executable<UpsertCompositeDataSourceResponse>
{
  declare readonly Parameters: Readonly<UpsertCompositeDataSourceRequestParameters>;

  constructor(parameters: UpsertCompositeDataSourceRequestParameters) {
    super("UpsertCompositeDataSource", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpsertCompositeDataSource`;

    const body = requestBody({
      ParentDisplayName: this.Parameters.ParentDisplayName,
      ParentSchemaName: this.Parameters.ParentSchemaName,
      ParentParameterKey: this.Parameters.ParentParameterKey,
      ParentApiId: this.Parameters.ParentApiId,
      ParentValue: this.Parameters.ParentValue,
      ChildDisplayName: this.Parameters.ChildDisplayName,
      ChildSchemaName: this.Parameters.ChildSchemaName,
      ChildParameterKey: this.Parameters.ChildParameterKey,
      ChildValue: this.Parameters.ChildValue,
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
    // No return value (204 No Content)
    return Promise.resolve(new UpsertCompositeDataSourceResponse());
  }
}

/**
 * UpsertCompositeDataSource response message
 */
export class UpsertCompositeDataSourceResponse extends OrganizationResponse {
  constructor() {
    super("UpsertCompositeDataSource");
  }

  static fromResponse(_data?: unknown): UpsertCompositeDataSourceResponse {
    return new UpsertCompositeDataSourceResponse();
  }
}
