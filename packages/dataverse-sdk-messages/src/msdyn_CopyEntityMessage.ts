import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CopyEntityResponse as msdyn_CopyEntityResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CopyEntity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CopyEntityRequestParameters {
  EntityName: string;
  TargetRecordId?: string;
  SourceRecordId: string;
  ClientHandledFields?: string;
}

/**
 * msdyn_CopyEntity request message
 *
 * Web API Action: msdyn_CopyEntity
 */
export class msdyn_CopyEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEntityResponse>
{
  declare readonly Parameters: Readonly<msdyn_CopyEntityRequestParameters>;

  constructor(parameters: msdyn_CopyEntityRequestParameters) {
    super("msdyn_CopyEntity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEntity`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
      TargetRecordId: this.Parameters.TargetRecordId,
      SourceRecordId: this.Parameters.SourceRecordId,
      ClientHandledFields: this.Parameters.ClientHandledFields,
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

  async parseResponse(response: Response): Promise<msdyn_CopyEntityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CopyEntityResponse.fromResponse({});
    return msdyn_CopyEntityResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CopyEntity response message
 */
export class msdyn_CopyEntityResponse extends OrganizationResponse {
  constructor(public result: msdyn_CopyEntityResponseData) {
    super("msdyn_CopyEntity");
  }

  static fromResponse(data: unknown): msdyn_CopyEntityResponse {
    return new msdyn_CopyEntityResponse(responseObject<msdyn_CopyEntityResponseData>(data));
  }
}
