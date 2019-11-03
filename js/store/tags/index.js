import {BaseTableStore, BaseManipStore} from '../bases'

class TagManipStore extends BaseManipStore {
  //
  initNew() {
    // simulation of loading or time expansive operation
    setTimeout(() => {
      this.onLoaded({
        published: true,
        name: 'default name'
      })
    }, 2000)
  }

  validators = {
    'name': (val) => this.lengthValidator(val, 10)
  }
}
export {TagManipStore}

class TagTableStore extends BaseTableStore {
  attrs = ['id', 'name', 'published']
  headers = {
    id: 'ID', name: 'NaMe', published: 'PUBlished'
  }
  headerCreator (attr) {
    return this.headers[attr]
  }
  defaultSortField = 'name'
  defaultSortDir = 'ASC'
  getEntries (opts) {
    return this.store.requester.getEntries('tags', opts)
  }
}
export {TagTableStore}
