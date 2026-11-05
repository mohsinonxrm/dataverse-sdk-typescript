import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_getCTandEACdisabledEntities request message
 *
 * Web API Action: msdyn_getCTandEACdisabledEntities
 */
export class msdyn_getCTandEACdisabledEntitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_getCTandEACdisabledEntitiesResponse>
{
  constructor(
    public msdyn_entityName: string,
    public msdyn_entityList: string
  ) {
    super("msdyn_getCTandEACdisabledEntities");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getCTandEACdisabledEntities`;

    const body: Record<string, unknown> = {
      msdyn_entityName: this.msdyn_entityName,
      msdyn_entityList: this.msdyn_entityList,
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

  async parseResponse(response: Response): Promise<msdyn_getCTandEACdisabledEntitiesResponse> {
    const data = await response.json();
    return msdyn_getCTandEACdisabledEntitiesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_entityName: this.msdyn_entityName,
      msdyn_entityList: this.msdyn_entityList,
    };
  }
}

/**
 * msdyn_getCTandEACdisabledEntities response message
 */
export class msdyn_getCTandEACdisabledEntitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_getCTandEACdisabledEntitiesResponse) {
    super("msdyn_getCTandEACdisabledEntities");
  }

  static fromResponse(data: unknown): msdyn_getCTandEACdisabledEntitiesResponse {
    return new msdyn_getCTandEACdisabledEntitiesResponse((data as any).value);
  }
}
