import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {
  TextInput,
  BoolInput,
  CheckBoxSelect,
  OptionSelect,
  EditView
} from 'bstrap-react-mobx-admin'
import {ManipStore} from 'react-mobx-admin'

const ValueVisualizer = observer(({record, attr}) => {
  return <span>{JSON.stringify(record.get(attr))}</span>
})

const TagEditForm = ({store, __}) => {
  const record = store.record
  const errors = store.errors
  const updateField = store.updateData.bind(store)
  const disabled = Number(record.get('id')) % 2 === 0
  const opts = [{label: 'Option 1', value: '1'}, {label: 'Option 2', value: '2'}]
  return (
    <div className='row'>
      <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
        <TextInput label={__('name')} attr={'name'} record={record} onChange={updateField}
          errors={errors} disabled={disabled} />
        <BoolInput label={__('Published')} attr={'published'} record={record}
          disabled={disabled} onChange={updateField} />
        <OptionSelect label={__('Test option based selection')}
          attr={'optselect'} record={record}
          disabled={disabled} onChange={updateField} errors={errors}
          options={opts} />
        <CheckBoxSelect label={__('Test comma separated multival')}
          attr={'chbox'} record={record}
          disabled={disabled} onChange={updateField} errors={errors}
          options={opts} />
        <span>
          Current val: <ValueVisualizer record={record} attr='chbox' />
        </span>
      </div>
    </div>
  )
}
TagEditForm.propTypes = {
  store: PropTypes.instanceOf(ManipStore).isRequired,
  __: PropTypes.func.isRequired
}

const TagsEditView = ({store}) => (
  <EditView store={store.cv}
    onReturn2list={store.onReturn2list.bind(store)}
    options={{
      editTitle: () => store.__('edit tag'),
      buttonsOnTop: false,
      saveText: () => (<span><b>DO</b> save</span>)
    }}>
    <TagEditForm store={store.cv} __={store.__.bind(store)} />
  </EditView>
)
export default TagsEditView
