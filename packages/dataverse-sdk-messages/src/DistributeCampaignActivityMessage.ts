import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { PropagationOwnershipOptions, bulkoperation, queue, template } from "./types/index.js";

/**
 * Parameters of the DistributeCampaignActivity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DistributeCampaignActivityRequestParameters {
  Propagate: boolean;
  Activity?: EntityReference | AnyEntityPayload;
  Template: EntityReference | EntityPayload<template>;
  OwnershipOptions: PropagationOwnershipOptions;
  Owner: EntityReference | AnyEntityPayload;
  SendEmail: boolean;
  Queue?: EntityReference | EntityPayload<queue>;
  PostWorkflowEvent: boolean;
  ExtendedActivityParameters?: string;
}

/**
 * DistributeCampaignActivity request message
 *
 * Web API Action: DistributeCampaignActivity
 *
 * The first argument is the id of the campaignactivity record to call it on.
 */
export class DistributeCampaignActivityRequest
  extends OrganizationRequest
  implements Executable<DistributeCampaignActivityResponse>
{
  declare readonly Parameters: Readonly<DistributeCampaignActivityRequestParameters>;

  constructor(
    public campaignactivityId: string,
    parameters: DistributeCampaignActivityRequestParameters
  ) {
    super("DistributeCampaignActivity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaignactivities(${this.campaignactivityId})/Microsoft.Dynamics.CRM.DistributeCampaignActivity`;

    const body = requestBody({
      Propagate: this.Parameters.Propagate,
      Activity: this.Parameters.Activity,
      Template: this.Parameters.Template,
      OwnershipOptions: enumBody(this.Parameters.OwnershipOptions, "PropagationOwnershipOptions"),
      Owner: this.Parameters.Owner,
      SendEmail: this.Parameters.SendEmail,
      Queue: this.Parameters.Queue,
      PostWorkflowEvent: this.Parameters.PostWorkflowEvent,
      ExtendedActivityParameters: this.Parameters.ExtendedActivityParameters,
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

  async parseResponse(response: Response): Promise<DistributeCampaignActivityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return DistributeCampaignActivityResponse.fromResponse({});
    return DistributeCampaignActivityResponse.fromResponse(await response.json());
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
