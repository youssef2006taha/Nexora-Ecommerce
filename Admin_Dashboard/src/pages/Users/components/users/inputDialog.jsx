import React from 'react'

const InputDialog = ({id,label,placeholder,value,onChange }) => {
  return (
    <div className='flex flex-col p-2 gap-2'>
        <label htmlFor={id} className='text-sm font-semibold uppercase text-slate-400 dark:text-slate-300'>
          {label+' :'}
        </label>
        <input 
        className='w-full outline-none rounded-xl border border-slate-300 py-2.5 px-4 bg-slate-50 text-lg focus:ring focus:ring-cyan-600'
        id={id}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
         />
    </div>
  )
}

export default  React.memo(InputDialog)