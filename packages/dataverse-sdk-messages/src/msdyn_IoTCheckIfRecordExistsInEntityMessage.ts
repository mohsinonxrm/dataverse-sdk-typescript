import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_IoTCheckIfRecordExistsInEntityResponse as msdyn_IoTCheckIfRecordExistsInEntityResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_IoTCheckIfRecordExistsInEntity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTCheckIfRecordExistsInEntityRequestParameters {
  EntitiesLogicalNames?: string;
}

/**
 * msdyn_IoTCheckIfRecordExistsInEntity request message
 *
 * Web API Action: msdyn_IoTCheckIfRecordExistsInEntity
 */
export class msdyn_IoTCheckIfRecordExistsInEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTCheckIfRecordExistsInEntityResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTCheckIfRecordExistsInEntityRequestParameters>;

  constructor(parameters: msdyn_IoTCheckIfRecordExistsInEntityRequestParameters = {}) {
    super("msdyn_IoTCheckIfRecordExistsInEntity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTCheckIfRecordExistsInEntity`;

    const body = requestBody({
      EntitiesLogicalNames: this.Parameters.EntitiesLogicalNames,
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

  async parseResponse(response: Response): Promise<msdyn_IoTCheckIfRecordExistsInEntityResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_IoTCheckIfRecordExistsInEntityResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_IoTCheckIfRecordExistsInEntity response message
 */
export class msdyn_IoTCheckIfRecordExistsInEntityResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTCheckIfRecordExistsInEntityResponseData) {
    super("msdyn_IoTCheckIfRecordExistsInEntity");
  }

  static fromResponse(data: unknown): msdyn_IoTCheckIfRecordExistsInEntityResponse {
    return new msdyn_IoTCheckIfRecordExistsInEntityResponse(
      responseObject<msdyn_IoTCheckIfRecordExistsInEntityResponseData>(data)
    );
  }
}
