import {React, shallow} from './testSetup'

import App from '../../../src/components/App'

describe('App component', () => {
  const wrapper = shallow(<App />)

  it('adds applications list', () => {
    const route = wrapper.find('Switch').childAt(0)

    expect(route.prop('path')).toEqual('/')
  })

  it('adds application page route', () => {
    const route = wrapper.find('Switch').childAt(1)

    expect(route.prop('path')).toEqual('/applications/:applicationId')
  })

  it('adds feature page route', () => {
    const route = wrapper.find('Switch').childAt(2)

    expect(route.prop('path')).toEqual('/features/:featureId')
  })

  it('adds parameter form route', () => {
    const route = wrapper.find('Switch').childAt(3)

    expect(route.prop('path')).toEqual('/features/:featureId/parameters/new')
  })
})

