import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

export interface CoursePartDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground

const App = () => {

  const courseName = "Half Stack application development";
  const courseParts : CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
];

// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };

// courseParts.forEach(part => {
//   switch (part.kind) {
//     case "basic":
//       console.log(part.name, part.exerciseCount)
//       break
//     case "group":
//       console.log(part.name, part.exerciseCount, part.groupProjectCount)
//       break
//     case "background":
//       console.log(part.name, part.exerciseCount, part.description, part.backgroundMaterial)
//       break
//     default:
//       return assertNever(part);
//       break
//   }
// })
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  )
};

export default App;
