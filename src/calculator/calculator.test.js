// import React from 'react';
// import { Calculator } from './calculator';
// import { shallow } from 'enzyme';
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

// it('renders without crashing', () => {
//     shallow(<Calculator />);
// });

// it('check calculations', () => {
//     const wrapper = shallow(<Calculator/>);

//     const title = 'All Users';

//     console.log(wrapper);
//     const calcLick=wrapper.find('handleCalcClicked');
//     console.log(calcLick);
//     wrapper.instance().handleCalcClicked('2');
//     wrapper.instance().handleCalcClicked('+');
//     wrapper.instance().handleCalcClicked('2');
//     wrapper.instance().handleCalcClicked('=');

//     expect(wrapper.instance().state.expression).toEqual('4');
//     expect(wrapper.instance().state.expression.length).toEqual(1);
// });

// import { renderHook, act } from '@testing-library/react-hooks'
// import { Calculator } from './calculator';

// test('check calculations', () => {
//   const { result }  = renderHook(() => Calculator())
// console.log(result);
//   act(() => {
//     // result.current.handleCalcClicked('2');
//     // result.current.handleCalcClicked('+');
//     // result.current.handleCalcClicked('2');
//     // result.current.handleCalcClicked('=');
//   })

//   expect(result.current.expression).toBe('4');
// })

import React from "react";
import { shallow } from "enzyme";
import { Calculator } from "./calculator";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("Calculator test", () => {
  const container = shallow(<Calculator />);

  //   it('should have an email field', () => {
  //     expect(container.find('input[type="email"]').length).toEqual(1);
  //   });

  it("Check Addition", () => {
    container.find("#button2").simulate("click");
    container.find("#buttonPlus").simulate("click");
    container.find("#button3").simulate("click");
    container.find("#buttonEqual").simulate("click");
    expect(container.find("#calc-header").text()).toEqual("5");
  });

  it("Check Multiplication", () => {
    container.find("#buttonDel").simulate("click");
    container.find("#button2").simulate("click");
    container.find("#buttonMul").simulate("click");
    container.find("#button3").simulate("click");
    container.find("#buttonEqual").simulate("click");
    expect(container.find("#calc-header").text()).toEqual("6");
  });

  it("Check Subtraction", () => {
    
    container.find("#buttonDel").simulate("click");
    container.find("#button2").simulate("click");
    container.find("#buttonMinus").simulate("click");
    container.find("#button3").simulate("click");
    container.find("#buttonEqual").simulate("click");
    expect(container.find("#calc-header").text()).toEqual("-1");
  });

  it("Check Division", () => {
    
    container.find("#buttonDel").simulate("click");
    container.find("#button2").simulate("click");
    container.find("#buttonDivide").simulate("click");
    container.find("#button2").simulate("click");
    container.find("#buttonEqual").simulate("click");
    expect(container.find("#calc-header").text()).toEqual("1");
  });
});
