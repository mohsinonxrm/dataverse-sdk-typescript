import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { campaignactivity } from "./types/index.js";

/**
 * Parameters of the AddItemCampaignActivity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddItemCampaignActivityRequestParameters {
  CampaignActivity: EntityReference | EntityPayload<campaignactivity>;
  Item: EntityReference | AnyEntityPayload;
}

/**
 * AddItemCampaignActivity request message
 *
 * Web API Action: AddItemCampaignActivity
 */
export class AddItemCampaignActivityRequest
  extends OrganizationRequest
  implements Executable<AddItemCampaignActivityResponse>
{
  declare readonly Parameters: Readonly<AddItemCampaignActivityRequestParameters>;

  constructor(parameters: AddItemCampaignActivityRequestParameters) {
    super("AddItemCampaignActivity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddItemCampaignActivity`;

    const body = requestBody({
      CampaignActivity: this.Parameters.CampaignActivity,
      Item: this.Parameters.Item,
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

  async parseResponse(response: Response): Promise<AddItemCampaignActivityResponse> {
    // The body is the complex value, with its @odata.context
    return AddItemCampaignActivityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AddItemCampaignActivity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AddItemCampaignActivityResult {
  "@odata.context"?: string;
  CampaignActivityItemId: string;
}

/**
 * AddItemCampaignActivity response message
 *
 * `result` is the value the AddItemCampaignActivity action returns (see {@link AddItemCampaignActivityResult}).
 */
export class AddItemCampaignActivityResponse extends OrganizationResponse {
  constructor(public result: AddItemCampaignActivityResult) {
    super("AddItemCampaignActivity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AddItemCampaignActivityResponse {
    return new AddItemCampaignActivityResponse(data as AddItemCampaignActivityResult);
  }
}
