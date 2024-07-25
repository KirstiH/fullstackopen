const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.course.name}
      </h1>
    </div>
  )
}


const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part part={props.course.parts[0].name} exe={props.course.parts[0].exercises}/>
      <Part part={props.course.parts[1].name} exe={props.course.parts[1].exercises}/>
      <Part part={props.course.parts[2].name} exe={props.course.parts[2].exercises}/>
    </> 
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.part} {props.exe}
    </p>
  )
}

const Total = (props) => {
  const total = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises
  return (
    <div>
      <p>
        Number of exercises {total}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
