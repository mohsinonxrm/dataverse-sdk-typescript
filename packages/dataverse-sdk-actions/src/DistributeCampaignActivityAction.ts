import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
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
 * Parameters of the DistributeCampaignActivity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DistributeCampaignActivityActionParameters {
  Propagate: boolean;
  Activity?: EntityReference | AnyEntityPayload;
  Template: EntityReference | EntityPayload<template>;
  OwnershipOptions: PropagationOwnershipOptions;
  Owner: EntityReference | AnyEntityPayload;
  SendEmail: boolean;
  Queue?: EntityReference | EntityPayload<queue>;
  PostWorkflowEvent: boolean;
}

/**
 * DistributeCampaignActivity action
 *
 * Bound action
 * Binding parameter: entity (mscrm.campaignactivity)
 *
 * The first argument is the id of the campaignactivity record to call it on.
 */
export class DistributeCampaignActivityAction implements Executable<DistributeCampaignActivityResponse> {
  constructor(
    public readonly campaignactivityId: string,
    public readonly parameters: DistributeCampaignActivityActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaignactivities(${this.campaignactivityId})/Microsoft.Dynamics.CRM.DistributeCampaignActivity`;

    const body = requestBody({
      Propagate: this.parameters.Propagate,
      Activity: this.parameters.Activity,
      Template: this.parameters.Template,
      OwnershipOptions: enumBody(this.parameters.OwnershipOptions, "PropagationOwnershipOptions"),
      Owner: this.parameters.Owner,
      SendEmail: this.parameters.SendEmail,
      Queue: this.parameters.Queue,
      PostWorkflowEvent: this.parameters.PostWorkflowEvent,
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
    if (response.status === 204) return {} as DistributeCampaignActivityResponse;
    return (await response.json()) as DistributeCampaignActivityResponse;
  }
}
