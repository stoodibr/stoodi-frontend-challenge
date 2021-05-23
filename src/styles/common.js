import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Button = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border: 0;
	background-color: #084bfa;
	color: #ffffff;
	border-radius: 48px;
	padding: 12px 20px;
	min-width: 164px;
	height: 38px;
	box-sizing: border-box;
	font-size: 12px;
	text-transform: uppercase;
	font-weight: 700;
	cursor: pointer;
	transition: opacity 350ms ease;

	&:hover {
		opacity: 0.8;
	}

	&:disabled {
		background-color: #ebebeb;
		color: #9b9b9b;
		cursor: not-allowed;

		&:hover {
			opacity: 1;
		}
	}

	.loader {
		width: 12px;
		height: 12px;
	}
`;

export const Container = styled.div`
	margin-left: 24px;
	margin-right: 24px;

	@media (min-width: 768px) {
		margin-left: 48px;
		margin-right: 48px;
	}
	@media (min-width: 1200px) {
		margin-left: 96px;
		margin-right: 96px;
	}
	@media (min-width: 1440px) {
		margin-left: calc((100% - 1200px) / 2);
		margin-right: calc((100% - 1200px) / 2);
	}
`;

export const Loader = styled.div`
	border: 4px solid #ebebeb;
	border-top: 4px solid #084bfa;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	margin: 0 auto;
	animation: ${spin} 2s ease infinite;
`;
