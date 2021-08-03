/**
 * Copyright 2020 Vyasaka Technologies
 */

 import * as uuid from "uuid";

 import moment from "moment";
import { Team } from "./team.model";
import { TeamConstant } from "./team-constant";
import { AppConfigStore } from "../../services/app-config.store";
import { SessionStore } from "../../services/session.store";
import { DateUtil } from "../../utils/date-util";

 
 export class TeamObjectBuilder {
   constructor() {}
   static create(data: any): Team {
     const referenceId = uuid.v4();
     const team: Team = new Team();
     const partitioned = window.atob(
       AppConfigStore.getValue("dbConfig", "partitioned")
     );
     team._id = partitioned
       ?TeamConstant.DOC_TYPE.replace(/::/g, "-") + "::" + referenceId
       : referenceId;
     team.docType = TeamConstant.DOC_TYPE;
    team.docId = referenceId;
    team.id=data.id;
    team.image= data.image;
    team.name = data.name;
    team.designation = data.designation;
    team.description = data.description;
    team.profileLink = data.profileLink;
     
    team.createdBy = // @ts-ignore TS7053
       SessionStore.getUserProfile()["profile"]["firstName"] +
       " " +
       SessionStore.getUserProfile()["profile"]["lastName"];
     team.createdOn = DateUtil.toJsonFormat(moment().format());
   team.modifiedBy = // @ts-ignore TS7053
       SessionStore.getUserProfile()["profile"]["firstName"] +
       " " +
       SessionStore.getUserProfile()["profile"]["lastName"];
    team.modifiedOn = DateUtil.toJsonFormat(moment().format());
     team.source = location.hostname;
 
     return team;
   }
 }
 