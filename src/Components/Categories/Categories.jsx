import React from 'react'
import './Categories.scss'
import Data from './Data'
import { useNavigate } from 'react-router-dom'
const Categories = () => {

  const navigate = useNavigate();
  return (
    <div className='cats'>
      <h2>Categories</h2>

      <div className="datas">
        {
          Data.map((item ) => (
            <div className='item'  >
              <div className='btn-head'>
              <h2 onClick={() => navigate(`/category/${item.title}`) }> {item.title} </h2>
              <button onClick={() => navigate(`/category/${item.title}`) }>Shop now &#x2192; </button>

              </div>
              <img src={item.path} alt="" />
            </div>

          ))

        }
      </div>


    </div>
  )
}

export default Categories
