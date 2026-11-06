import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateEntityResponse as msdyn_CreateEntityResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateEntity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateEntityRequestParameters {
  PreviewData?: string;
  IsToExistingTable?: boolean;
  UseUserSettings?: boolean;
  ConnectionInfo?: string;
  EntityDefinition: string;
  SampleData?: string;
  FileInfo?: string;
}

/**
 * msdyn_CreateEntity request message
 *
 * Web API Action: msdyn_CreateEntity
 */
export class msdyn_CreateEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateEntityResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateEntityRequestParameters>;

  constructor(parameters: msdyn_CreateEntityRequestParameters) {
    super("msdyn_CreateEntity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateEntity`;

    const body = requestBody({
      PreviewData: this.Parameters.PreviewData,
      IsToExistingTable: this.Parameters.IsToExistingTable,
      UseUserSettings: this.Parameters.UseUserSettings,
      ConnectionInfo: this.Parameters.ConnectionInfo,
      EntityDefinition: this.Parameters.EntityDefinition,
      SampleData: this.Parameters.SampleData,
      FileInfo: this.Parameters.FileInfo,
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
    if (response.status === 204) return msdyn_CreateEntityResponse.fromResponse({});
    return msdyn_CreateEntityResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateEntity response message
 */
export class msdyn_CreateEntityResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateEntityResponseData) {
    super("msdyn_CreateEntity");
  }

  static fromResponse(data: unknown): msdyn_CreateEntityResponse {
    return new msdyn_CreateEntityResponse(responseObject<msdyn_CreateEntityResponseData>(data));
  }
}
