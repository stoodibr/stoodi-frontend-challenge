import { useState } from "react";
import { useExercise } from "../../config/hooks/useExercise";

import {
	Alternative,
	AlternativeList,
	AnswerMessage,
	ButtonWrapper,
	ExerciseWrapper,
	Institution,
	Question,
} from "./style";
import { Button, Loader } from "../../styles/common";

const Exercise = () => {
	const { exercise, isLoading, checkAnswer, isCheckingAnswer } =
		useExercise();
	const [button, setButton] = useState({
		text: "Verificar Resposta",
		disabled: true,
		step: "check",
	});
	const [selectedLetter, setSelectedLetter] = useState("");
	const [answer, setAnswer] = useState(null);
	const [showAnswer, setShowAnswer] = useState(false);

	const selectAlternative = (event) => {
		setSelectedLetter(event.target.value);
		setButton({ ...button, disabled: false });
	};

	const handleClick = async () => {
		switch (button.step) {
			case "check":
				setButton({ text: "", disabled: true });
				const response = await checkAnswer(
					selectedLetter,
					exercise.exercise_id
				);
				if (response === true) {
					setButton({
						text: "Próximo",
						disabled: false,
						step: "next",
					});
				} else {
					setButton({
						text: "Refazer",
						disabled: false,
						step: "restart",
					});
				}
				setAnswer(response);
				setShowAnswer(true);
				break;
			case "restart":
				setButton({
					text: "Verificar Resposta",
					disabled: true,
					step: "check",
				});
				setAnswer(null);
				setSelectedLetter("");
				setShowAnswer(false);
				break;
			default:
				break;
		}
	};

	const createAlternatives = () =>
		exercise.alternatives.map((alternative, index) => (
			<Alternative
				key={index}
				correct={
					selectedLetter === alternative.letter &&
					showAnswer &&
					!isCheckingAnswer
						? answer
							? true
							: false
						: null
				}
			>
				<label className="label">
					<input
						className="input"
						type="radio"
						name="letter"
						value={alternative.letter}
						onChange={selectAlternative}
						checked={selectedLetter === alternative.letter}
						disabled={button.step !== "check"}
					/>
					<span className="check"></span>
					<span className="letter">{alternative.letter}.</span>
					{alternative.label}
				</label>
			</Alternative>
		));

	return (
		<ExerciseWrapper>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Institution>{exercise.institution}</Institution>
					<Question
						dangerouslySetInnerHTML={{
							__html: exercise.exercise_text,
						}}
					/>
					<AlternativeList>{createAlternatives()}</AlternativeList>
					<ButtonWrapper correct={showAnswer ? answer : null}>
						{showAnswer ? (
							answer ? (
								<AnswerMessage>
									<strong>Resposta correta</strong> Boa!
									Acertou em cheio
								</AnswerMessage>
							) : (
								<AnswerMessage>
									<strong>Resposta incorreta</strong> Que tal
									tentar novamente?
								</AnswerMessage>
							)
						) : (
							<AnswerMessage></AnswerMessage>
						)}
						<Button
							disabled={button.disabled}
							onClick={handleClick}
						>
							{button.text}
							{isCheckingAnswer && <Loader className="loader" />}
						</Button>
					</ButtonWrapper>
				</>
			)}
		</ExerciseWrapper>
	);
};

export default Exercise;
