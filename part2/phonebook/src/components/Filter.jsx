const Filter = (props) => {
    return (
      <>
        filter shown with <input value={props.filteredSearch}
        onChange={props.handleSearchChange}
        />
      </>
    )
}
/*
const Filter = ({filter, handleFilterChange}) => {
  <div>filter shown with <input value={filter} onChange={handleFilterChange}/></div>
}
  */

export default Filter