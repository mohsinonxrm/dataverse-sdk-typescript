import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_RetrieveKPIvaluesfromDCIResponse as msdyn_RetrieveKPIvaluesfromDCIResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveKPIvaluesfromDCI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKPIvaluesfromDCIRequestParameters {
  CrmRecord?: EntityReference | AnyEntityPayload;
  KPINameFilterMap?: string;
  SimilarEntities?: string;
}

/**
 * msdyn_RetrieveKPIvaluesfromDCI request message
 *
 * Web API Action: msdyn_RetrieveKPIvaluesfromDCI
 */
export class msdyn_RetrieveKPIvaluesfromDCIRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKPIvaluesfromDCIResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveKPIvaluesfromDCIRequestParameters>;

  constructor(parameters: msdyn_RetrieveKPIvaluesfromDCIRequestParameters = {}) {
    super("msdyn_RetrieveKPIvaluesfromDCI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKPIvaluesfromDCI`;

    const body = requestBody({
      CrmRecord: this.Parameters.CrmRecord,
      KPINameFilterMap: this.Parameters.KPINameFilterMap,
      SimilarEntities: this.Parameters.SimilarEntities,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKPIvaluesfromDCIResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_RetrieveKPIvaluesfromDCIResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_RetrieveKPIvaluesfromDCI response message
 */
export class msdyn_RetrieveKPIvaluesfromDCIResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKPIvaluesfromDCIResponseData) {
    super("msdyn_RetrieveKPIvaluesfromDCI");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKPIvaluesfromDCIResponse {
    return new msdyn_RetrieveKPIvaluesfromDCIResponse(
      responseObject<msdyn_RetrieveKPIvaluesfromDCIResponseData>(data)
    );
  }
}
