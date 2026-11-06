import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { PropagationOwnershipOptions, bulkoperation, queue, template } from "./types/index.js";

/**
 * DistributeCampaignActivity request message
 *
 * Web API Action: DistributeCampaignActivity
 */
export class DistributeCampaignActivityRequest
  extends OrganizationRequest
  implements Executable<DistributeCampaignActivityResponse>
{
  constructor(
    public campaignactivityId: string,
    public propagate: boolean,
    public activity: EntityReference,
    public template: template,
    public ownershipOptions: PropagationOwnershipOptions,
    public owner: EntityReference,
    public sendEmail: boolean,
    public queue: queue,
    public postWorkflowEvent: boolean
  ) {
    super("DistributeCampaignActivity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaignactivities(${this.campaignactivityId})/Microsoft.Dynamics.CRM.DistributeCampaignActivity`;

    const body: Record<string, unknown> = {
      Propagate: this.propagate,
      Activity: this.activity,
      Template: this.template,
      OwnershipOptions: this.ownershipOptions,
      Owner: this.owner,
      SendEmail: this.sendEmail,
      Queue: this.queue,
      PostWorkflowEvent: this.postWorkflowEvent,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<DistributeCampaignActivityResponse> {
    const data = await response.json();
    return DistributeCampaignActivityResponse.fromResponse(data);
  }
}

/**
 * DistributeCampaignActivity response message
 */
export class DistributeCampaignActivityResponse extends OrganizationResponse {
  constructor(public result: bulkoperation) {
    super("DistributeCampaignActivity");
  }

  static fromResponse(data: unknown): DistributeCampaignActivityResponse {
    return new DistributeCampaignActivityResponse(responseObject<bulkoperation>(data));
  }
}
