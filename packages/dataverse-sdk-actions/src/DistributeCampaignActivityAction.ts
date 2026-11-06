import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { PropagationOwnershipOptions, bulkoperation, queue, template } from "./types/index.js";

/**
 * Response from DistributeCampaignActivity action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface DistributeCampaignActivityResponse extends bulkoperation {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * DistributeCampaignActivity action
 *
 * Bound action
 * Binding parameter: entity (mscrm.campaignactivity)
 */
export class DistributeCampaignActivityAction implements Executable<DistributeCampaignActivityResponse> {
  constructor(
    public readonly campaignactivityId: string,
    public readonly propagate: boolean,
    public readonly activity: EntityReference | AnyEntityPayload | undefined,
    public readonly template: EntityReference | EntityPayload<template>,
    public readonly ownershipOptions: PropagationOwnershipOptions,
    public readonly owner: EntityReference | AnyEntityPayload,
    public readonly sendEmail: boolean,
    public readonly queue: EntityReference | EntityPayload<queue> | undefined,
    public readonly postWorkflowEvent: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaignactivities(${this.campaignactivityId})/Microsoft.Dynamics.CRM.DistributeCampaignActivity`;

    const body: Record<string, unknown> = {
      Propagate: this.propagate,
      Activity: this.activity,
      Template: this.template,
      OwnershipOptions: enumBody(this.ownershipOptions, "PropagationOwnershipOptions"),
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
    return data as DistributeCampaignActivityResponse;
  }
}
