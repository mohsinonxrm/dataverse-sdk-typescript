import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CreateEntityResponse as msdyn_CreateEntityResponseData } from "./types/index.js";

/**
 * msdyn_CreateEntity request message
 *
 * Web API Action: msdyn_CreateEntity
 */
export class msdyn_CreateEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateEntityResponse>
{
  constructor(
    public useUserSettings: boolean,
    public connectionInfo: string,
    public fileInfo: string,
    public previewData: string,
    public isToExistingTable: boolean,
    public sampleData: string,
    public entityDefinition: string
  ) {
    super("msdyn_CreateEntity");
  }

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
    return msdyn_CreateEntityResponse.fromResponse(data);
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
