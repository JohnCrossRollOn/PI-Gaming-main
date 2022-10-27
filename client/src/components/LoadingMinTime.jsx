import React, { useEffect, useState } from "react";

const LoadingMinTime = (props)=>{
    const [action, setAction] = useState(<div className="loading_screen">
        <p className="loading_element">{props.message}</p>
    </div>)
    useEffect(()=>{
        setTimeout(()=>setAction(props.children), props.minTime)
    })
    return <>{action}</>
}

export default LoadingMinTime