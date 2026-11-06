import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetRecordUsers message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRecordUsersRequestParameters {
  RecordType: number;
  RecordId: string;
  RecordTypeName: string;
}

/**
 * msdyn_GetRecordUsers request message
 *
 * Web API Action: msdyn_GetRecordUsers
 */
export class msdyn_GetRecordUsersRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRecordUsersResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRecordUsersRequestParameters>;

  constructor(parameters: msdyn_GetRecordUsersRequestParameters) {
    super("msdyn_GetRecordUsers", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRecordUsers`;

    const body = requestBody({
      RecordType: this.Parameters.RecordType,
      RecordId: this.Parameters.RecordId,
      RecordTypeName: this.Parameters.RecordTypeName,
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

  async parseResponse(response: Response): Promise<msdyn_GetRecordUsersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetRecordUsersResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetRecordUsers response message
 */
export class msdyn_GetRecordUsersResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_GetRecordUsers");
  }

  static fromResponse(data: unknown): msdyn_GetRecordUsersResponse {
    return new msdyn_GetRecordUsersResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
