import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_PerformChecksForEnrichRecordResponse as msdyn_PerformChecksForEnrichRecordResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_PerformChecksForEnrichRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PerformChecksForEnrichRecordRequestParameters {
  msdyn_Target: EntityReference | AnyEntityPayload;
  msdyn_IncludeShadowRule?: boolean;
}

/**
 * msdyn_PerformChecksForEnrichRecord request message
 *
 * Web API Action: msdyn_PerformChecksForEnrichRecord
 */
export class msdyn_PerformChecksForEnrichRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_PerformChecksForEnrichRecordResponse>
{
  declare readonly Parameters: Readonly<msdyn_PerformChecksForEnrichRecordRequestParameters>;

  constructor(parameters: msdyn_PerformChecksForEnrichRecordRequestParameters) {
    super("msdyn_PerformChecksForEnrichRecord", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PerformChecksForEnrichRecord`;

    const body = requestBody({
      msdyn_Target: this.Parameters.msdyn_Target,
      msdyn_IncludeShadowRule: this.Parameters.msdyn_IncludeShadowRule,
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

  async parseResponse(response: Response): Promise<msdyn_PerformChecksForEnrichRecordResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_PerformChecksForEnrichRecordResponse.fromResponse({});
    return msdyn_PerformChecksForEnrichRecordResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_PerformChecksForEnrichRecord response message
 */
export class msdyn_PerformChecksForEnrichRecordResponse extends OrganizationResponse {
  constructor(public result: msdyn_PerformChecksForEnrichRecordResponseData) {
    super("msdyn_PerformChecksForEnrichRecord");
  }

  static fromResponse(data: unknown): msdyn_PerformChecksForEnrichRecordResponse {
    return new msdyn_PerformChecksForEnrichRecordResponse(
      responseObject<msdyn_PerformChecksForEnrichRecordResponseData>(data)
    );
  }
}
