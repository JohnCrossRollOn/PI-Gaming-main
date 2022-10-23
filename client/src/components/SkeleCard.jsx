import React from "react";

const SkeleCard = (props)=>{
    return <div key={props.id} className="skeleton">
        <div className="skeleton_image"/>
        <div className="skeleton_content"/>
    </div>
};

export default SkeleCard;