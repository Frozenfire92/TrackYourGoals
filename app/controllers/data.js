import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import moment from 'moment';

export default class DataController extends Controller {
  @tracked importUnderstood = false;

  @action importData(name, data, type) {
    if (type === 'application/json') {
      localStorage.clear();
      let parsedData = JSON.parse(data);
      Object.keys(parsedData).forEach(key =>
        localStorage.setItem(key, parsedData[key])
      );
      this.importUnderstood = false;
    }
    else {
      alert(`Cant process file of type: ${type}`);
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
    let confirmed = window.confirm('Delete all data, are you sure?');

    if (confirmed) {
      localStorage.clear();
    }
  }
}
