import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IoTCheckIfRecordExistsInEntity request message
 *
 * Web API Action: msdyn_IoTCheckIfRecordExistsInEntity
 */
export class msdyn_IoTCheckIfRecordExistsInEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTCheckIfRecordExistsInEntityResponse>
{
  constructor(public entitiesLogicalNames: string) {
    super("msdyn_IoTCheckIfRecordExistsInEntity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTCheckIfRecordExistsInEntity`;

    const body: Record<string, unknown> = {
      EntitiesLogicalNames: this.entitiesLogicalNames,
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

  async parseResponse(response: Response): Promise<msdyn_IoTCheckIfRecordExistsInEntityResponse> {
    const data = await response.json();
    return msdyn_IoTCheckIfRecordExistsInEntityResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntitiesLogicalNames: this.entitiesLogicalNames,
    };
  }
}

/**
 * msdyn_IoTCheckIfRecordExistsInEntity response message
 */
export class msdyn_IoTCheckIfRecordExistsInEntityResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTCheckIfRecordExistsInEntityResponse) {
    super("msdyn_IoTCheckIfRecordExistsInEntity");
  }

  static fromResponse(data: unknown): msdyn_IoTCheckIfRecordExistsInEntityResponse {
    return new msdyn_IoTCheckIfRecordExistsInEntityResponse((data as any).value);
  }
}
