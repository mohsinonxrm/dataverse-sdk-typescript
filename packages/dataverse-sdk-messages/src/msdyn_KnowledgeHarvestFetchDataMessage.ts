import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_KnowledgeHarvestFetchData request message
 *
 * Web API Action: msdyn_KnowledgeHarvestFetchData
 */
export class msdyn_KnowledgeHarvestFetchDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_KnowledgeHarvestFetchDataResponse>
{
  constructor(
    public msdyn_entityId: string,
    public msdyn_entityName: string
  ) {
    super("msdyn_KnowledgeHarvestFetchData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_KnowledgeHarvestFetchData`;

    const body: Record<string, unknown> = {
      msdyn_entityId: this.msdyn_entityId,
      msdyn_entityName: this.msdyn_entityName,
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

  async parseResponse(response: Response): Promise<msdyn_KnowledgeHarvestFetchDataResponse> {
    const data = await response.json();
    return msdyn_KnowledgeHarvestFetchDataResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_entityId: this.msdyn_entityId,
      msdyn_entityName: this.msdyn_entityName,
    };
  }
}

/**
 * msdyn_KnowledgeHarvestFetchData response message
 */
export class msdyn_KnowledgeHarvestFetchDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_KnowledgeHarvestFetchDataResponse) {
    super("msdyn_KnowledgeHarvestFetchData");
  }

  static fromResponse(data: unknown): msdyn_KnowledgeHarvestFetchDataResponse {
    return new msdyn_KnowledgeHarvestFetchDataResponse((data as any).value);
  }
}
