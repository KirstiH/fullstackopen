
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
                <p>
                    {props.name} {props.exerciseCount}
                </p>
            )
        case "group":
            return (
                <p>
                    {props.name} {props.exerciseCount} {props.groupProjectCount}
                </p>
            )
        case "background":
            return (
                <p>
                    {props.name} {props.exerciseCount} {props.description} {props.backgroundMaterial}
                </p>
            )
        default:
            return assertNever(props);
    }
}

export default Part


