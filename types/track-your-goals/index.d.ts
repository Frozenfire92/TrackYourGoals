import Ember from 'ember';

import { GoalType } from 'track-your-goals/utils/enums';

declare global {
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}

  type GoalRecordValue = number | boolean;

  interface Goal {
    id: string;
    name: string;
    type: GoalType;
    records: Array<GoalRecord>;
  }

  interface GoalRecord {
    date: string;
    value: GoalRecordValue;
  }

  interface ModalRequest {
    title: string;
    message?: string;
    successAction?: (arguments: IArguments) => any;
    successText?: string;
    cancelAction?: () => any;
    component?: string;
    model?: object;
    options?: object;
  }

  const csvHeader = 'id,name,type,date,value';
}

export {};
