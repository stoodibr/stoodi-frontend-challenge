import { useEffect, useState } from "react";
import api from "../../config/services/api";

export const useExercise = () => {
	const [exercise, setExercise] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const response = await api.exercise.getOne();
			setExercise(response.data.exercise);
		};

		fetchData().then(() => {
			setIsLoading(false);
		});
	}, []);

	const checkAnswer = async (choice, exerciseID) => {
		const payload = {
			exercise_id: exerciseID,
			choice: choice,
		};

		setIsCheckingAnswer(true);
		const response = await api.exercise.checkAnswer(payload);
		setIsCheckingAnswer(false);

		return response.data.is_correct;
	};

	return { exercise, isLoading, checkAnswer, isCheckingAnswer };
};
