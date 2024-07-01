import Link from 'next/link'
import { useState } from 'react';
import { motion } from 'framer-motion';

const Chip = ({ text, selected, setSelected, }) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${selected
        ? "text-white"
        : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
        } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      <span className="relative z-10 m-4">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

const tabs = ["Home", "Search", "About", "FAQ"];



const Products = () => {
  const [selected, setSelected] = useState(tabs[0]);
  return (
    <>
      <main className='min-h-screen -mt-10'>
        <div className="px-4 mb-4 flex items-center flex-wrap gap-2">
          {tabs.map((tab) => (
            <Chip
              text={tab}
              selected={selected === tab}
              setSelected={setSelected}
              key={tab}
            />
          ))}
        </div>
        <div>Products</div>
        <div>

          <Link href="/products/mosaicra-ui" className='h-40 w-80 flex items-center justify-center border-2 border-[#313131] hover:border-[#505050] transition-all duration-300 ease-in-out rounded-2xl my-4'>
            <span>Mosaicra UI</span>
          </Link>
        </div>
        <div className='gap-4 flex flex-col'>

        </div>
      </main>

    </>
  )
}

export default Products