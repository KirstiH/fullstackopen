interface totalProps {
    totalExercises: number
}

const Total = (props: totalProps) => {
    return (
        <div>
            <p>Number of exercises {props.totalExercises}</p>
        </div>
    )
}

export default Total