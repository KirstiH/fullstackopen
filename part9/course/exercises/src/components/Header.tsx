interface nameProps {
    name: string
}

const Header = (props: nameProps) => {
    return (
        <div>
            <h1>{props.name}</h1>
        </div>
    )
}

export default Header