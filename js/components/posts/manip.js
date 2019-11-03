/* global marked */
import React from 'react'
import {observer} from 'mobx-react'
import {
  DateInput, TextInput, TypeAheadInput, EditView
} from 'bstrap-react-mobx-admin'

const MDPreview = observer(({state}) => {
  const value = state.record.content
  return value ? <div dangerouslySetInnerHTML={{__html: marked(value)}} /> : null
})

const PostEditForm = ({store, options, __}) => {
  const record = store.record
  const errors = store.errors
  const updateField = store.updateData.bind(store)
  const disabled = Number(record.id) % 2 === 0
  const typeAheadMenuRender = (option, props) => (
    <span key={option.value}>{option.label}</span>
  )
  return (
    <div className='row'>
      <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
        <TextInput label={__('title')} attr={'title'} record={record}
          onChange={updateField} errors={errors} disabled={disabled}
          showError={false} />
        <TypeAheadInput label={__('Category')} attr={'category'} record={record}
          options={options.categories()}
          onChange={updateField}
          errors={errors} disabled={disabled} emptyLabel='Nic nenalezeno'
          renderMenuItemChildren={typeAheadMenuRender} />
        <DateInput label={__('published')} attr={'published_at'} record={record}
          onChange={updateField} errors={errors} disabled={disabled} />
        <DateInput label={__('unpublished')} attr={'unpublished_at'} record={record}
          onChange={updateField} errors={errors} disabled={disabled} />
        <TextInput componentClass='textarea'
          label={__('content')} attr={'content'} record={record}
          onChange={updateField} errors={errors} disabled={disabled} />
        <TypeAheadInput label={__('Tags')} attr={'tags'} record={record}
          options={options.tags.map(i => ({value: i.id.toString(), label: i.name}))}
          onChange={updateField} multiple
          errors={errors} disabled={disabled} emptyLabel='Nic nenalezeno'
          renderMenuItemChildren={typeAheadMenuRender} />
      </div>
      <div className='col-xs-12 col-md-6 col-lg-6'>
        <MDPreview state={store} />
      </div>
    </div>
  )
}

const PostEditView = ({store}) => (
  <EditView store={store.cv} onReturn2list={store.onReturn2list.bind(store)}>
    <PostEditForm store={store.cv}
      __={store.__.bind(store)} options={store.options} />
  </EditView>
)
export default PostEditView
