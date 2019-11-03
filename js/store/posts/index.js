import {BaseTableStore, BaseManipStore} from '../bases'

class PostManipStore extends BaseManipStore {
  //
  load(id) {
    return this.store.loadOptions('tags', '/tags').then(() => {
      return super.load(id)
    })
  }

  edittitle = 'edit a nice post'
  createtitle = 'add very interresting post ..'
  validators = {
    'title': (val) => this.lengthValidator(val, 64),
    'content': (val) => this.lengthValidator(val),
    'category': (val) => this.lengthValidator(val),
    'published_at': (val) => this.lengthValidator(val),
    'unpublished_at': (val) => {
      const published_at = this.record.published_at
      if (published_at && val && published_at > val) {
        return 'published must be less than unpublished'
      }
    }
  }

  onSaved (saved) {
    this.store.addMessage('post successfully saved', 'info', 2000)
    super.onSaved(saved)
  }

  onLoaded (entity) {
    super.onLoaded(entity)
    alert('post onLoaded')
  }
}
export {PostManipStore}

class PostTableStore extends BaseTableStore {
  //
  defaultSortField = 'title'
  defaultSortDir = 'ASC'
  attrs = ['id', 'title', 'category', 'published_at', 'unpublished_at', 'tags']
  headertitles (attr) {
    return `title for ${attr}`
  }
  noSort = ['id', 'tags']

  load() {
    return this.store.loadOptions('tags', '/tags').then(() => {
      return super.load()
    })
  }

  getEntries (opts) {
    return this.store.requester.getEntries('posts', opts)
  }
}
export {PostTableStore}
