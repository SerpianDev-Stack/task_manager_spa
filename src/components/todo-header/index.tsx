import IconSun from '/images/icon-sun.svg'

export const TodoHeader = () =>{
    return (
        <header className='flex justify-between max-w-[43.75rem] m-auto mb-6 pt-20'>
            <h1 className='text-[2.5rem] font-bold tracking-[1rem] text-white'>TASK LIST</h1>

            <button>
                <img className='w-8 h-8' src={IconSun} alt="Ícone de sol que altera o tema"/>
            </button>
          </header>
    )
}