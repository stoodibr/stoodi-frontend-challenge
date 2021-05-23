import styled from "styled-components";

export const Alternative = styled.li`
	position: relative;
	padding: 12px 52px;
	line-height: 21px;
	background-color: ${({ correct }) =>
		correct !== null ? (correct ? "#d4f0e4" : "#fee0d8") : "transparent"};

	.label {
		user-select: none;
		line-height: 21px;
		cursor: pointer;

		.letter {
			margin-right: 10px;
		}

		.input {
			position: absolute;
			width: 0;
			height: 0;
			opacity: 0;
			cursor: pointer;
		}

		.check {
			position: absolute;
			top: 50%;
			left: 20px;
			transform: translateY(-50%);
			width: 20px;
			height: 20px;
			border: 1px solid #b6b6b6;
			border-radius: 50%;
		}

		.input:checked ~ .check:after {
			content: "";
			position: absolute;
			width: 12px;
			height: 12px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			background-color: ${({ correct }) =>
				correct !== null
					? correct
						? "#00bb35"
						: "#ff6b41"
					: "#084bfb"};
		}

		.input:checked ~ .check {
			border-color: ${({ correct }) =>
				correct !== null
					? correct
						? "#00bb35"
						: "#ff6b41"
					: "#084bfb"};
		}
	}
`;

export const AlternativeList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 32px 0;
`;

export const AnswerMessage = styled.p`
	font-size: 14px;
	margin-bottom: 12px;

	strong {
		display: block;
	}

	@media (min-width: 768px) {
		margin-bottom: 0;
	}
`;

export const ButtonWrapper = styled.div`
	padding: 18px;
	border-top: 1px solid #dedede;
	border-bottom: 1px solid #dedede;
	background-color: ${({ correct }) =>
		correct !== null ? (correct ? "#d4f0e4" : "#fee0d8") : "transparent"};
	text-align: center;

	@media (min-width: 768px) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: left;
	}
`;

export const ExerciseWrapper = styled.section`
	padding: 24px 0;
`;

export const Institution = styled.h1`
	font-size: 18px;
	margin-bottom: 12px;
`;

export const Question = styled.div`
	font-weight: 400;
	margin-bottom: 36px;

	i {
		display: block;
		margin-top: 12px;
	}
`;
