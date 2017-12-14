import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

const {shallow, mount} = Enzyme

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
