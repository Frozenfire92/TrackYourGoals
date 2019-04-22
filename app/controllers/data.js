import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import moment from 'moment';

export default class DataController extends Controller {
  @service modal;

  @tracked importUnderstood = false;

  @action importData(name, data, type) {
    if (type === 'application/json') {
      let parsedData;
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
      this.modal.open({
        title: 'Import successful',
        message: 'data deleted and file loaded'
      });
      Object.keys(parsedData).forEach(key =>
        localStorage.setItem(key, parsedData[key])
      );
      this.importUnderstood = false;
    }
    else {
      this.modal.open({
        title: 'Import failed',
        message: `Cant process file of type: ${type}`
      });
    }
  }

  @action exportData() {
    let textData = JSON.stringify(localStorage);

    // Generate and download file
    let fileName = `track-your-goals-backup-${moment().format('YYYY-MM-DD-HH-mm-ss')}.json`;
    let fileType = 'application/json;charset=utf-8';
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
