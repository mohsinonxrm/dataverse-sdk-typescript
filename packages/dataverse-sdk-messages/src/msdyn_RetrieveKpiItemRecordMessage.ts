import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_RetrieveKpiItemRecordResponse as msdyn_RetrieveKpiItemRecordResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveKpiItemRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKpiItemRecordRequestParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_RetrieveKpiItemRecord request message
 *
 * Web API Action: msdyn_RetrieveKpiItemRecord
 */
export class msdyn_RetrieveKpiItemRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKpiItemRecordResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveKpiItemRecordRequestParameters>;

  constructor(parameters: msdyn_RetrieveKpiItemRecordRequestParameters) {
    super("msdyn_RetrieveKpiItemRecord", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKpiItemRecord`;

    const body = requestBody({
      CrmRecord: this.Parameters.CrmRecord,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKpiItemRecordResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RetrieveKpiItemRecordResponse.fromResponse({});
    return msdyn_RetrieveKpiItemRecordResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RetrieveKpiItemRecord response message
 */
export class msdyn_RetrieveKpiItemRecordResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKpiItemRecordResponseData) {
    super("msdyn_RetrieveKpiItemRecord");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKpiItemRecordResponse {
    return new msdyn_RetrieveKpiItemRecordResponse(
      responseObject<msdyn_RetrieveKpiItemRecordResponseData>(data)
    );
  }
}
