/**
 * Copyright 2020 Vyasaka Technologies
 */

import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Team")
export class Team {
  [x: string]: any;
  @JsonProperty("_id", String, true)
  _id: string | undefined = undefined;

  @JsonProperty("docType", String, true)
  docType: string | undefined = undefined;

  @JsonProperty("docId", String, true)
  docId: string | undefined = undefined;

  @JsonProperty("id", String, true)
  id: string | undefined = undefined;

  @JsonProperty("image", String, true)
  image: string | undefined = undefined;

  @JsonProperty("name", String)
  name: string = "";

  @JsonProperty("designation", String, true)
  designation: string | undefined = undefined;

  @JsonProperty("description", String)
  description: string | undefined = undefined;

  @JsonProperty("profileLink", String, true)
  profileLink: string | undefined = undefined;



  @JsonProperty("createdOn", String)
  createdOn: string | undefined = undefined;

  @JsonProperty("createdBy", String)
  createdBy: string | undefined = undefined;

  @JsonProperty("modifiedOn", String)
  modifiedOn: string | undefined = undefined;

  @JsonProperty("modifiedBy", String)
  modifiedBy: string | undefined = undefined;

  @JsonProperty("source", String)
  source: string | undefined = undefined;
}
