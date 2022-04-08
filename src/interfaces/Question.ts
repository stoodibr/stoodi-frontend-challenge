export interface QuestionProps {
    exercise: {
        exercise_id: number,
        exercise_text: any,
        institution?: string,
        alternatives: [{
            letter: string,
            label: string
        }]
    }
}