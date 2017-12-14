import {React, shallow} from './testSetup'

import App from '../../../src/components/App'

describe('App component', () => {
  const wrapper = shallow(<App />)

  it('adds applications list', () => {
    const route = wrapper.find('Switch').childAt(0)

    expect(route.prop('path')).toEqual('/')
    expect(route.prop('component').name).toEqual('Applications')
  })

  it('adds application page route', () => {
    const route = wrapper.find('Switch').childAt(1)

    expect(route.prop('path')).toEqual('/applications/:applicationId')
    expect(route.prop('component').name).toEqual('Application')
  })

  it('adds feature page route', () => {
    const route = wrapper.find('Switch').childAt(2)

    expect(route.prop('path')).toEqual('/features/:featureId')
    expect(route.prop('component').name).toEqual('Feature')
  })

  it('adds parameter form route', () => {
    const route = wrapper.find('Switch').childAt(3)

    expect(route.prop('path')).toEqual('/features/:featureId/parameters/new')
    expect(route.prop('component').name).toEqual('ParameterForm')
  })
})
