import React from 'react'
import './Gallery.scss'
import img1 from '../../Assets/Gallrey/img (1).png'
import img2 from '../../Assets/Gallrey/img (2).png'
import img3 from '../../Assets/Gallrey/img (3).png'
import img4 from '../../Assets/Gallrey/img (4).png'
import img5 from '../../Assets/Gallrey/img (5).png'
import img6 from '../../Assets/Gallrey/img (6).png'
import img7 from '../../Assets/Gallrey/img (7).png'
import img8 from '../../Assets/Gallrey/img (8).png'
import img9 from '../../Assets/Gallrey/img (9).png'
import { useNavigate } from 'react-router-dom'

const Gallery = () => {

  const navigate = useNavigate();

  return (
    <div className='gallery-main'>

      <h2> Design inspiration and modern home ideas</h2>
      <div className="btns">
        <button className="btn" onClick={() => navigate(`/all`)}>All</button>
        <button className="btn" onClick={() => navigate(`/category/Bedroom`)}>Bedroom</button>
        <button className="btn" onClick={() => navigate(`/category/Kitchen`)}>Kitchen</button>
        <button className="btn" onClick={() => navigate(`/category/Accessories`)}>Livin groom</button>
        <button className="btn" >Workplace</button>
        <button className="btn">Outdoor</button>
        <button className="btn">Bathroom</button>
        <button className="btn">Home office</button>
        <button className="btn">Dining</button>
      </div>
      <div className="imgs">
        <img src={img8} alt="" />
        <img src={img1} alt="" />
        <img src={img9} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
        <img src={img4} alt="" />
        <img src={img5} alt="" />
        <img src={img6} alt="" />
        <img src={img7} alt="" />
      </div>

      <div className="slider">
        <p>Showing 9 of 16 results</p>
        <input type="range" name="range" id="range"  />
        <button>
          Show more
        </button>
      </div>
    </div>
  )
}

export default Gallery
