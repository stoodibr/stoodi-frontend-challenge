import react from "react";
import { render, cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Question from "../components/Question";
import "jest-styled-components";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
// TODO fix mocked API call
// const server = setupServer(
//   rest.get("/mockedReq", (req, res, ctx) => {
//     return res(
//       ctx.json({ exercise: { alternatives: [], institution: "Stoodi" } })
//     );
//   })
// );
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
// test("loads and displays data", async () => {
//   await render(<Question dados="/mockedReq" />);
// expect(screen.getByTestId("question-title")).toHaveTextContent(
//   "Stoodi"
// );
// });
afterEach(cleanup);

const hardMock = {
  exercise: {
    exercise_id: 3473,
    exercise_text:
      "<p>Assinale a alternativa que apresenta a raiz da equação abaixo: <i>2x - 7 = 9</i></p>",
    institution: "Stoodi",
    alternatives: [
      { letter: "a", label: "-8" },
      { letter: "b", label: "8" },
      { letter: "c", label: "10" },
      { letter: "d", label: "-10" },
    ],
  },
};

test("Question styled-components", async () => {
  render(<Question dados={hardMock} />);

  // Container styled component
  expect(screen.getByTestId("question-container")).toHaveStyle({
    padding: "1rem",
    maxWidth: "768px",
  });

  // Title styled component
  expect(screen.getByTestId("question-title")).toHaveTextContent("Stoodi");
  expect(screen.getByTestId("question-title")).toHaveStyle("margin: 0px");

  // QuestionForm styled component
  expect(screen.getByTestId("question-form")).toHaveStyle({
    marginTop: "1.5rem",
  });

  // QuestionForm styled component // ERROR due map generating elements with same ID
  // expect(screen.getByTestId("question-alternatives")).toHaveStyle({
  //   padding: "0.5rem 0rem",
  //   backgroundColor: "white",
  // });]
  expect(Question).toMatchSnapshot();
});
