const Filter = (props) => {
    return (
      <>
        filter shown with <input value={props.filteredSearch}
        onChange={props.handleSearchChange}
        />
      </>
    )
}


export default Filter