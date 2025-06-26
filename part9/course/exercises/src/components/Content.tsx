
import Part from "./Part"
import type { CoursePart} from "../App"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// Define the props type
interface ContentProps {
  courseParts: CoursePart[];
}


const Content = ({ courseParts }: ContentProps) => {
    return (
        <div>
            {courseParts.map(part => {
                switch (part.kind) {
                    case "basic":
                        return <Part key={part.name} {...part} />
                    case "group":
                        return <Part key={part.name} {...part} />
                    case "background":
                        return <Part key={part.name} {...part} />
                    case "special":
                        return <Part key={part.name} {...part} />
                    default:
                        return assertNever(part);
                }
            })}
        </div>
    )
}

export default Content