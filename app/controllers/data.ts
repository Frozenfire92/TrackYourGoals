import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import moment from 'moment';
import ModalService from 'track-your-goals/services/modal';
import GoalsService from 'track-your-goals/services/goals';

export default class DataController extends Controller {
  @service modal!: ModalService;
  @service goals!: GoalsService;

  @tracked importUnderstood = false;

  @action importData(_name: string, data: any, type: string) {
    if (type === 'application/json') {
      let parsedData: any;
      try {
        parsedData = JSON.parse(data);
      }
      catch {
        this.modal.open({
          title: 'Import failed',
          message: 'data not deleted as file uploaded could not be read'
        });
        return;
      }
      localStorage.clear();
      Object.keys(parsedData).forEach(key =>
        localStorage.setItem(key, parsedData[key])
      );
      this.importUnderstood = false;
      this.modal.open({
        title: 'Import successful'
      });
    }
    else if (type === 'text/csv') {
      try {
        let parsedData = data.split('\n');

        if (parsedData[0] !== csvHeader) {
          this.modal.open({
            title: 'Import failed',
            message: `Expected csv header of ${csvHeader}`
          });
          return;
        }

        let rows = parsedData.slice(1).map((n: string)=>n.split(','));
        let goals: any = {};
        let denseRows = rows.map((n: any[]) => ({
          id: n[0],
          name: n[1],
          type: n[2],
          date: n[3],
          value: JSON.parse(n[4])
        }));

        denseRows.forEach((goal: any) => {
          if (goals.hasOwnProperty(goal.id)) {
            let existing = goals[goal.id].records.findBy('date', goal.date);
            if (existing) {
              existing.value = goal.value;
            }
            else {
              goals[goal.id].records.push({ date: goal.date, value: goal.value });
            }
          }
          else {
            goals[goal.id] = {
              id: goal.id,
              name: goal.name,
              type: goal.type,
              records: [
                { date: goal.date, value: goal.value }
              ]
            };
          }
        });
        localStorage.clear();
        Object.keys(goals).forEach(id => this.goals.create(
          goals[id].name,
          goals[id].type,
          goals[id].records,
          id
        ));
        this.importUnderstood = false;
        this.modal.open({
          title: 'Import successful'
        });
      }
      catch {
        this.modal.open({
          title: 'Import failed',
          message: 'data not deleted as file uploaded could not be read'
        });
        return;
      }

    }
    else {
      this.modal.open({
        title: 'Import failed',
        message: `Cant process file of type: ${type}`
      });
    }
  }

  @action exportData(type: string) {
    let fileName: string = 'track-your-goals-backup';
    let fileType;
    let textData: any;
    if (type === 'json') {
      fileName = `track-your-goals-backup-${moment().format('YYYY-MM-DD-HH-mm-ss')}.json`;
      fileType = 'application/json;charset=utf-8';
      textData = JSON.stringify(localStorage);
    }
    else if (type === 'csv') {
      fileName = `track-your-goals-backup-${moment().format('YYYY-MM-DD-HH-mm-ss')}.csv`;
      fileType = 'text/csv';
      let rows: any[] = [];
      this.goals.goals.forEach(goal => {
        if (goal.records && goal.records.length) {
          let name = goal.name.replace(/,/g, ' ');
          goal.records.forEach(record => rows.push(`${goal.id},${name},${goal.type},${record.date},${record.value}`));
        }
      })
      textData = `${csvHeader}\n${rows.join('\n')}`;
    }

    // Generate and download file
    let file;
    try {
      file = new File([textData], fileName, { type: fileType });
    } catch (e) {
      file = new Blob([textData], { type: fileType });
    }
    let url = URL.createObjectURL(file);
    let a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    a.setAttribute('target', '_blank');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  @action resetData() {
    this.modal.open({
      title: 'Delete all data',
      message: 'Are you sure? This action can\'t be reversed.',
      successAction: () => localStorage.clear(),
      successText: 'delete'
    });
  }
}
