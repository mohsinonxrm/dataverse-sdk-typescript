import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return msdyn_GetRecordUsersResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_GetRecordUsersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetRecordUsers action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetRecordUsersResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_GetRecordUsers response message
 *
 * `result` is the value the msdyn_GetRecordUsers action returns (see {@link msdyn_GetRecordUsersResult}).
 */
export class msdyn_GetRecordUsersResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRecordUsersResult) {
    super("msdyn_GetRecordUsers");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetRecordUsersResponse {
    return new msdyn_GetRecordUsersResponse(
      data === undefined ? [] : (data as { value: msdyn_GetRecordUsersResult }).value
    );
  }
}
