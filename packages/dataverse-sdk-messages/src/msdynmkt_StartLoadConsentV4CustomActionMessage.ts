import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_StartLoadConsentV4CustomActionResponse as msdynmkt_StartLoadConsentV4CustomActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_StartLoadConsentV4CustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_StartLoadConsentV4CustomActionRequestParameters {
  CommercialPurposeId?: string;
  CommercialTopicId?: string;
  TransactionalPurposeId?: string;
  TransactionalTopicId?: string;
  TrackingPurposeId?: string;
  SourceEntity?: string;
  OwningBusinessUnit?: string;
  FilterType?: string;
  FilterId?: string;
  ConsentValue?: number;
  UpdateExistingRecords?: boolean;
  ComplianceProfileId?: string;
}

/**
 * msdynmkt_StartLoadConsentV4CustomAction request message
 *
 * Web API Action: msdynmkt_StartLoadConsentV4CustomAction
 */
export class msdynmkt_StartLoadConsentV4CustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_StartLoadConsentV4CustomActionResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_StartLoadConsentV4CustomActionRequestParameters>;

  constructor(parameters: msdynmkt_StartLoadConsentV4CustomActionRequestParameters = {}) {
    super("msdynmkt_StartLoadConsentV4CustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_StartLoadConsentV4CustomAction`;

    const body = requestBody({
      CommercialPurposeId: this.Parameters.CommercialPurposeId,
      CommercialTopicId: this.Parameters.CommercialTopicId,
      TransactionalPurposeId: this.Parameters.TransactionalPurposeId,
      TransactionalTopicId: this.Parameters.TransactionalTopicId,
      TrackingPurposeId: this.Parameters.TrackingPurposeId,
      SourceEntity: this.Parameters.SourceEntity,
      OwningBusinessUnit: this.Parameters.OwningBusinessUnit,
      FilterType: this.Parameters.FilterType,
      FilterId: this.Parameters.FilterId,
      ConsentValue: this.Parameters.ConsentValue,
      UpdateExistingRecords: this.Parameters.UpdateExistingRecords,
      ComplianceProfileId: this.Parameters.ComplianceProfileId,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_StartLoadConsentV4CustomActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_StartLoadConsentV4CustomActionResponse.fromResponse({});
    return msdynmkt_StartLoadConsentV4CustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_StartLoadConsentV4CustomAction response message
 */
export class msdynmkt_StartLoadConsentV4CustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_StartLoadConsentV4CustomActionResponseData) {
    super("msdynmkt_StartLoadConsentV4CustomAction");
  }

  static fromResponse(data: unknown): msdynmkt_StartLoadConsentV4CustomActionResponse {
    return new msdynmkt_StartLoadConsentV4CustomActionResponse(
      responseObject<msdynmkt_StartLoadConsentV4CustomActionResponseData>(data)
    );
  }
}
