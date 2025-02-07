interface Item {
    item: {name: string, iataCode: string},
    onMouseDown: () => void;
}

//Component to show when the dropdown is dropped.
const DropdownCard = (props : Item) => {

    const {item, onMouseDown} = props;
    return (
      <div className='grid grid-cols-4  border-b-2 border-stone-500/25 duration-100 min-h-10 cursor-pointer hover:bg-stone-500/10' onMouseDown={onMouseDown}>
        <p className='col-span-2 inline-block text-black font-bold text-center align-middle'>{item.iataCode}</p>
        <p className='col-span-2 inline-block text-gray-400 align-middle'>{item.name}</p>
      </div>
    )
}

export default DropdownCard