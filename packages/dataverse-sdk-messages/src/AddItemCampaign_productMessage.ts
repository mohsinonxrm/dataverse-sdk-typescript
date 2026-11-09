import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaign, campaignitem } from "./types/index.js";

/**
 * Parameters of the AddItemCampaign message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddItemCampaign_productRequestParameters {
  Campaign: EntityReference | EntityPayload<campaign>;
}

/**
 * AddItemCampaign request message
 *
 * Web API Action: AddItemCampaign
 *
 * The first argument is the id of the product record to call it on.
 */
export class AddItemCampaign_productRequest
  extends OrganizationRequest
  implements Executable<AddItemCampaign_productResponse>
{
  declare readonly Parameters: Readonly<AddItemCampaign_productRequestParameters>;

  constructor(
    public productId: string,
    parameters: AddItemCampaign_productRequestParameters
  ) {
    super("AddItemCampaign", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/products(${odataLiteral.guid(this.productId)})/Microsoft.Dynamics.CRM.AddItemCampaign`;

    const body = requestBody({
      Campaign: this.Parameters.Campaign,
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

  async parseResponse(response: Response): Promise<AddItemCampaign_productResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return AddItemCampaign_productResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return AddItemCampaign_productResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AddItemCampaign action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type AddItemCampaign_productResult =
  | (campaignitem & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * AddItemCampaign response message
 *
 * `result` is the value the AddItemCampaign action returns (see {@link AddItemCampaign_productResult}).
 */
export class AddItemCampaign_productResponse extends OrganizationResponse {
  constructor(public result: AddItemCampaign_productResult) {
    super("AddItemCampaign");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AddItemCampaign_productResponse {
    return new AddItemCampaign_productResponse((data ?? null) as AddItemCampaign_productResult);
  }
}
