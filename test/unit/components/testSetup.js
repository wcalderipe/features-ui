import React from 'react'
import {shallow, mount} from 'enzyme'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const waitThenUpdate = async (promise, wrapper) => {
  await promise
  wrapper.update()
}

export {
  React,
  shallow,
  mount,
  waitThenUpdate
}

