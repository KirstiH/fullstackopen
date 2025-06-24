interface coursePartProps {
    name: string
    exerciseCount: number
}

interface coursePartsProps {
    courseParts: coursePartProps[]
}

const Content = (props: coursePartsProps) => {
    return (
        <div>
            {props.courseParts.map(part => 
                <p key={part.name}>{part.name} {part.exerciseCount}</p>
            )}
        </div>
    )
}

export default Content