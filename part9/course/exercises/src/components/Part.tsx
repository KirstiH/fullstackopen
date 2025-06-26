
import type { CoursePart } from "../App"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Part = (props: CoursePart) => {
    switch (props.kind) {
        case "basic":
            return (
                <div>
                    <strong>{props.name} {props.exerciseCount}</strong>
                    <p><em>Course description: {props.description}</em></p>
                </div>
            )
        case "group":
            return (
                <div>
                    <strong>{props.name} {props.exerciseCount}</strong>
                    <p><em>Group project count: {props.groupProjectCount}</em></p>
                </div>
            )
        case "background":
            return (
                <div>
                    <strong>{props.name} {props.exerciseCount}</strong>
                    <p><em>Course description: {props.description}</em></p>
                    <p><em>Background material: {props.backgroundMaterial}</em></p>
                </div>
            )
        case "special":
            return (
                <div>
                    <strong>{props.name} {props.exerciseCount}</strong>
                    <p><em>Course description: {props.description}</em></p>
                    <p>Required skills: {props.requirements.join(', ')}</p>
                </div>
        )
        default:
            return assertNever(props);
    }
}

export default Part


