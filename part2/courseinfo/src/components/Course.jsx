const Header = ({ course }) => <h2>{course}</h2>


const Total = ({ sum }) => {
  let parts = sum.reduce((acc, part) => acc + part.exercises,0)
  return (
    <p><strong>Total of {parts} exercises</strong></p>
  )

}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Course = ({course}) => {
  console.log(course)
  return (
    <>
      <Header course={course.name} />
        {course.parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      <Total sum={course.parts} />
    </>
  )
}

export default Course