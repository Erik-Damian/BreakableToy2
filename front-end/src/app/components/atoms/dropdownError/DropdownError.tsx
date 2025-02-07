//Component to show when the search returns empty.
const DropdownError = () => {
    return (
      <div className='flex place-content-around items-center border-b-4 border-stone-500/25 duration-100 min-h-10 cursor-pointer hover:bg-stone-500/10'>
        <p className='grow-1 text-gray-500'>No matching results found.</p>
      </div>
    )
}

export default DropdownError