import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_GetRecordUsers request message
 *
 * Web API Action: msdyn_GetRecordUsers
 */
export class msdyn_GetRecordUsersRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRecordUsersResponse>
{
  constructor(
    public recordType: number,
    public recordId: string,
    public recordTypeName: string
  ) {
    super("msdyn_GetRecordUsers");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRecordUsers`;

    const body: Record<string, unknown> = {
      RecordType: this.recordType,
      RecordId: this.recordId,
      RecordTypeName: this.recordTypeName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetRecordUsersResponse> {
    const data = await response.json();
    return msdyn_GetRecordUsersResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RecordType: this.recordType,
      RecordId: this.recordId,
      RecordTypeName: this.recordTypeName,
    };
  }
}

/**
 * msdyn_GetRecordUsers response message
 */
export class msdyn_GetRecordUsersResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("msdyn_GetRecordUsers");
  }

  static fromResponse(data: unknown): msdyn_GetRecordUsersResponse {
    return new msdyn_GetRecordUsersResponse((data as any).value);
  }
}
