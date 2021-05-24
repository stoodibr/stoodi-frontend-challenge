import react from "react";
import {
  render,
  cleanup,
  screen,
  fireEvent,
  WaitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AnswerBox from "../components/AnswerBox";
import "jest-styled-components";
import { indigo } from "@material-ui/core/colors";
import { renderHook } from "@testing-library/react-hooks";

afterEach(cleanup);

const hardMock = {
  props: {
    alternativa: "b",
    cb: jest.fn(),
    id: 3473,
  },
};

test("AnswerBox styled-components", async () => {
  render(<AnswerBox dados={hardMock} />);

  // Container styled component
  expect(screen.getByTestId("answer-container")).toHaveStyle({
    padding: "1rem 0rem",
    marginTop: "1rem",
    backgroundColor: "white",
  });
  // BasicButton styled component
  expect(screen.getByTestId("basic-button")).toHaveStyle({
    padding: "0.6rem 0",
    width: "200px",
    border: "none",
    borderRadius: "2rem",
    fontWeight: "bold",
    cursor: "pointer",
    margin: "1rem",
    backgroundColor: "lightgray",
    color: "#999",
  });
  // Divider styled component
  expect(screen.getByTestId("answer-divider")).toHaveStyle({
    border: "1px solid #f2f2f2",
    margin: "0px",
  });

  // TODO test this after trigger hook to updade state.

  // renderHook(() => AnswerBox.setAnswer("b"));

  // // AnswerBox.handleSubmit();
  // fireEvent.click(screen.getByTestId("basic-button"));

  // await WaitFor(screen.getByTestId("answer-fb-title"));

  // expect(screen.getByTestId("answer-fb-title")).toHaveStyle({
  //   margin: "0px 0px 0px 1.5rem",
  //   fontWeight: "bold",
  // });

  // expect(screen.getByTestId("answer-fb-text")).toHaveStyle({
  //   margin: "0px 0px 0px 1.5rem",
  // });
  // expect(screen.getByTestId("answer-fb-button")).toHaveStyle({
  //   backgroundColor: indigo["500"],
  //   color: "white",
  // });
  expect(AnswerBox).toMatchSnapshot();
});
