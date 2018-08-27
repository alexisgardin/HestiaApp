/**
 * Class that models an issue
 */
import {StateModel} from './StateModel';
import {TypeModel} from './TypeModel';
import {InhabitantModel} from './InhabitantModel';
import * as moment from 'moment';
import {LocationModel} from "./LocationModel";
import {PriorityModel} from "./PriorityModel";
import {ImportanceModel} from "./ImportanceModel";
import {Moment} from "moment";
import {ImageModel} from "./ImageModel";

export interface Issue {
  id: number;
  title: string;
  description: string;
  datetime_declaration: moment.Moment;
  datetime_deadline: moment.Moment;
  datetime_resolution: moment.Moment;
  location: LocationModel;
  priority: PriorityModel;
  importance: ImportanceModel;
  state: StateModel;
  type: TypeModel;
  author: InhabitantModel;
  images: ImageModel[];
  thirdParties: InhabitantModel[];

  locationId: number;
  priorityId: number;
  importanceId: number;
  stateId: number;
  typeId: number;
  authorId: number;
}

export class IssueModel implements Issue {

  id: number;
  title: string;
  description: string;
  datetime_declaration: Moment;
  datetime_deadline: Moment;
  datetime_resolution: Moment;
  location: LocationModel;
  priority: PriorityModel;
  importance: ImportanceModel;
  state: StateModel;
  type: TypeModel;
  author: InhabitantModel;
  images: ImageModel[];
  thirdParties: InhabitantModel[];

  locationId: number;
  priorityId: number;
  importanceId: number;
  stateId: number;
  typeId: number;
  authorId: number;

  constructor(id: number, title: string, description: string, state: StateModel, type: TypeModel,
              author: InhabitantModel, priority: PriorityModel, location: LocationModel,
              importance?: ImportanceModel, images?: ImageModel[], datetime_declaration?: Moment,
              datetime_deadline?: Moment, datetime_resolution?: Moment, thirdParties?: InhabitantModel[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.state = state;
    this.type = type;
    this.author = author;
    this.priority = priority;
    this.location = location;
    this.importance = importance;
    this.datetime_declaration = datetime_declaration;
    this.datetime_deadline = datetime_deadline;
    this.datetime_resolution = datetime_resolution;
    this.images = images;
    this.thirdParties = thirdParties;

    this.locationId = this.location.id;
    this.priorityId = this.priority.id;
    this.importanceId = this.importance.id;
    this.stateId = this.state.id;
    this.typeId = this.type.id;
    this.authorId = this.author.id;
  }
}
