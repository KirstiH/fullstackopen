const Filter = (props) => {
    return (
      <>
        filter shown with <input
        onChange={props.handleSearchName}
        />
      </>
    )
}

export default Filter