import React from 'react';
import { API } from '../../config'

const ShowImage = ({ item, url, cssClassName = "" }) => {
    let cls = cssClassName.length > 0 ? `${cssClassName}` : "product-img";
    return (
        <img className="square-grid-item__img" style={{ backgroundImage: `url(${API}/${url}/photo/${item._id})` }} />
    )
}

export default ShowImage;

{/*
    
     <div className={cls}>
            <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="mb-1" ></img>
        </div>
    */}
