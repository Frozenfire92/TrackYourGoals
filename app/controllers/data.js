import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DataController extends Controller {
  @service store;

  @action importData(name, data, type) {
    if (type === 'application/json') {
      this.store.importData(data)
    }
    else {
      alert(`Cant process file of type: ${type}`);
    }
  }

  @action exportData() {
    // Export data from store (ember-local-storage)
    let { _result: textData } = this.store.exportData(['goals', 'settings']);

    // Generate and download file
    let fileName = 'track-your-goals-backup.json';
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
      this.store.unloadAll();
    }
  }
}
