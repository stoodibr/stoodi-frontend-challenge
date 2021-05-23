import axios from "axios";

const api = axios.create({
	baseURL: "https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/",
});

const exercise = {
	getOne() {
		return api.get("/");
	},
	checkAnswer(payload) {
		return api.post("/", payload);
	},
};

const apiSettings = {
	exercise,
};

export default apiSettings;
