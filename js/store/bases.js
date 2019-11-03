import { action } from 'mobx'
import {ManipStore, ListStore} from 'react-mobx-admin'

class BaseManipStore extends ManipStore {
  //
  constructor(store) {
    super()
    this.store = store
  }

  loadEntry (id) {
    const entityname = this.store.router.params.entityname
    return this.store.requester.getEntry(entityname, id)
  }
  saveEntry (data) {
    const entityname = this.store.router.params.entityname
    return this.store.requester.saveEntry(entityname, data, data.id)
  }

  lengthValidator (val, max) {
    if (!val || val.length === 0) {
      return 'value must be provided'
    }
    if (max && val.length > max) {
      return 'value too long'
    }
  }
}
export {BaseManipStore}


class BaseTableStore extends ListStore {
  constructor(store) {
    super(store.router)
    this.store = store
  }
  perPage = 3

  @action updateQPars (newQPars) {
    const r = this.store.router
    r.goTo(r.currentView, r.params, this.store, newQPars)
  }

  deleteData (rows) {
    rows.map(i => this.items.remove(i))
  }
}
export {BaseTableStore}
