import {React, shallow} from './testSetup'

import FeatureForm from '../../../src/components/FeatureForm'

describe('FeatureForm component', () => {
  const props = {
    onSubmit: () => {},
    onChange: () => {}
  }
  const wrapper = shallow(<FeatureForm {...props} />)

  it('renders name input with onChange prop', () => {
    const input = wrapper.find('.feature-name')

    expect(input.exists()).toEqual(true)
    expect(input.prop('onChange')).toEqual(expect.any(Function))
  })

  it('renders form with onSubmit prop', () => {
    expect(wrapper.prop('onSubmit')).toEqual(expect.any(Function))
  })

  it('renders a submit button', () => {
    expect(wrapper.find('.btn-submit').exists()).toEqual(true)
  })
})
